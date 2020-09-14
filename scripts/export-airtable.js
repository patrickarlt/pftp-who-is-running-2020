require("dotenv").config();
const Airtable = require("airtable");
const { outputJSON } = require("fs-extra");
const { groupBy } = require("lodash");
const slug = require("slug");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  "appICdALWiTou766D"
);

const statesByAbbr = {
  AZ: "Arizona",
  AL: "Alabama",
  AK: "Alaska",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DC: "District of Columbia",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

const abbrByState = {
  arizona: "AZ",
  alabama: "AL",
  alaska: "AK",
  arkansas: "AR",
  california: "CA",
  colorado: "CO",
  connecticut: "CT",
  districtofcolumbia: "DC",
  delaware: "DE",
  florida: "FL",
  georgia: "GA",
  hawaii: "HI",
  idaho: "ID",
  illinois: "IL",
  indiana: "IN",
  iowa: "IA",
  kansas: "KS",
  kentucky: "KY",
  louisiana: "LA",
  maine: "ME",
  maryland: "MD",
  massachusetts: "MA",
  michigan: "MI",
  minnesota: "MN",
  mississippi: "MS",
  missouri: "MO",
  montana: "MT",
  nebraska: "NE",
  nevada: "NV",
  newhampshire: "NH",
  newjersey: "NJ",
  newmexico: "NM",
  newyork: "NY",
  northcarolina: "NC",
  northdakota: "ND",
  ohio: "OH",
  oklahoma: "OK",
  oregon: "OR",
  pennsylvania: "PA",
  rhodeisland: "RI",
  southcarolina: "SC",
  southdakota: "SD",
  tennessee: "TN",
  texas: "TX",
  utah: "UT",
  vermont: "VT",
  virginia: "VA",
  washington: "WA",
  westvirginia: "WV",
  wisconsin: "WI",
  wyoming: "WY",
};

const stateAbbrs = Object.keys(statesByAbbr).map((abbr) => abbr.toLowerCase());

function convertStateToAbbr(input) {
  if (input === undefined) return input;
  var strInput = input.trim();
  if (strInput.length === 2) {
    // already abbr, check if it's valid
    var upStrInput = strInput.toUpperCase();
    return statesByAbbr[upStrInput] ? upStrInput : undefined;
  }
  var strStateToFind = strInput.toLowerCase().replace(/\ /g, "");
  var foundAbbr = abbrByState[strStateToFind];
  return foundAbbr;
}

function convertAbbrToState(input) {
  if (input === undefined) return input;
  var strInput = input.trim();
  if (strInput.length !== 2) {
    // already full name, return formatted fullname
    return statesByAbbr[convertStateToAbbr(strInput)];
  }
  var strStateToFind = strInput.toUpperCase().replace(/\ /g, "");
  var foundFullName = statesByAbbr[strStateToFind];
  return foundFullName;
}

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
      stateAbbr: convertStateToAbbr(record.get("State")).toLowerCase(),
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
      type: "senate",
      slug: slug(record.get("Candidate Name")),
    };
  });
}

async function fetchHouseCandidates() {
  const houseRecords = await fetchTable(
    "Districts (All) FORMATTED",
    "For Collecting Candidates"
  );

  return houseRecords.map((record) => {
    return {
      state: record.get("State"),
      stateAbbr: convertStateToAbbr(record.get("State")).toLowerCase(),
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
      type: "house",
      slug: slug(record.get("Candidate Name")),
    };
  });
}

(async function run() {
  try {
    const senateCandidates = await fetchSenateCandidates();
    const houseCandidates = await fetchHouseCandidates();
    const senateByState = groupBy(senateCandidates, "stateAbbr");
    const houseByState = groupBy(houseCandidates, "stateAbbr");
    const stateWrites = stateAbbrs.map((abbr) => {
      return outputJSON(`./public/data/${abbr}.json`, {
        abbr,
        name: convertAbbrToState(abbr),
        senate: senateByState[abbr],
        house: houseByState[abbr],
      });
    });
    const summaryWrite = outputJSON("./public/data/summary.json", {
      senate: senateCandidates.map((candidate) => ({
        stateAbbr: candidate.stateAbbr,
        district: candidate.district,
        party: candidate.party,
        name: candidate.name,
        image: candidate.image,
        slug: candidate.slug,
      })),
      house: houseCandidates.map((candidate) => ({
        stateAbbr: candidate.stateAbbr,
        district: candidate.district,
        party: candidate.party,
        name: candidate.name,
        image: candidate.image,
        slug: candidate.slug,
      })),
    });
    const sitemapWrite = outputJSON("./public/data/sitemap.json", {
      states: senateCandidates.map((candidate) => ({
        stateAbbr: candidate.stateAbbr,
      })),
      house: houseCandidates.map((candidate) => ({
        stateAbbr: candidate.stateAbbr,
        district: candidate.district,
        party: candidate.party,
        name: candidate.name,
        image: candidate.image,
        slug: candidate.slug,
      })),
    });
    await Promise.all([...stateWrites, summaryWrite]);
  } catch (e) {
    console.error(e);
  }
})();
