require("dotenv").config();
const Airtable = require("airtable");
const fs = require("fs");
const { promisify } = require("util");
const writeFile = promisify(fs.writeFile);
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  "appICdALWiTou766D"
);

async function fetchTable(table, view) {
  let allRecords = [];

  await base(table)
    .select({
      view,
    })
    .eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.

      allRecords = allRecords.concat(records);

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
    });

  return allRecords;
}

async function fetchSenateCandidates() {
  const senateRecords = await fetchTable("Senate", "Full View");

  return senateRecords.map((record) => {
    return {
      state: record.get("State"),
      district: null,
      party: record.get("Party"),
      stateFips: record.get("State FIPS"),
      name: record.get("Candidate Name"),
      incumbent: record.get("Incumbent or New Candidate") === "Incumbent",
      campaignUrl: record.get("Camp URL"),
      facebookUrl: record.get("Facebook URL"),
      twitterHandle: record.get("Twitter Handle"),
      instagramHandle: record.get("Instagram Handle"),
      image: record.get("URL Image"),
      campaignPriorities: record.get("Campaign Priorities"),
      battleground: record.get("Swing State") === "yes",
      woman: record.get("Woman") === "yes",
      bipoc: record.get("BIPOC") === "yes",
    };
  });
}

async function fetchHouseCandidates() {
  const houseRecords = await fetchTable(
    "Districts (All) FORMATTED",
    "For Collecting Candidates"
  );

  console.log(houseRecords[0].fields);

  return houseRecords.map((record) => {
    return {
      state: record.get("State Name"),
      district: record.get("District"),
      party: record.get("Party"),
      stateFips: record.get("State FIPS"),
      name: record.get("Candidate Name"),
      incumbent: record.get("Incumbent or New Candidate") === "Incumbent",
      campaignUrl: record.get("Camp URL"),
      facebookUrl: record.get("Facebook URL"),
      twitterHandle: record.get("Twitter Handle"),
      instagramHandle: record.get("Instagram Handle"),
      image: record.get("URL Image"),
      campaignPriorities: record.get("KVI"),
      battleground: record.get("Battleground District") === "yes",
      woman: record.get("Woman") === "yes",
      bipoc: record.get("BIPOC") === "yes",
    };
  });
}

(async function run() {
  try {
    const senateCandidates = await fetchSenateCandidates();
    const houseCandidates = await fetchHouseCandidates();
    await writeFile(
      "./public/candidates.json",
      JSON.stringify(
        { senate: senateCandidates, house: houseCandidates },
        null,
        2
      )
    );
  } catch (e) {
    console.error(e);
  }
})();
