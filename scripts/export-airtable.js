require("isomorphic-fetch");
require("isomorphic-form-data");
require("dotenv").config();
const Airtable = require("airtable");
const {
  queryFeatures,
  updateFeatures,
} = require("@esri/arcgis-rest-feature-layer");
const { UserSession } = require("@esri/arcgis-rest-auth");
const { outputJSON, pathExists } = require("fs-extra");
const { groupBy } = require("lodash");
const slug = require("slug");
const path = require("path");
const url = require("url");
const Axios = require("axios");
const sharp = require("sharp");
const stateBoundriesService =
  "https://services9.arcgis.com/q5uyFfTZo3LFL04P/arcgis/rest/services/State_Boundries_(Census)/FeatureServer/0";
const districtBoundriesService =
  "https://services9.arcgis.com/q5uyFfTZo3LFL04P/arcgis/rest/services/Congressional_District_Boundries_(Census)/FeatureServer/0";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  "appICdALWiTou766D"
);

const session = new UserSession({
  token: process.env.AGOL_TOKEN,
});

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

async function syncBattlegroundStates({ senate, house }) {
  return Promise.all([fetchAllStates(), fetchAllDistricts()]).then(
    ([states, districts]) => {
      const updatedStateFeatures = states.features.map((feature) => {
        const state = senate.find(
          (senate) =>
            senate.stateAbbr === feature.attributes.STUSPS.toLowerCase()
        );
        return {
          attributes: {
            FID: feature.attributes.FID,
            BATTLEGROUND: state && state.battleground ? 1 : 0,
          },
        };
      });

      const updatedDistrictFeatures = districts.features.map((feature) => {
        const district = house.find((house) => {
          const matcheddistrict =
            house.stateAbbr === feature.attributes.STATEUSPS.toLowerCase() &&
            parseInt(house.district) === parseInt(feature.attributes.CD116FP);
          return matcheddistrict;
        });
        if (!district) {
          return undefined;
        }
        return {
          attributes: {
            FID: feature.attributes.FID,
            BATTLEGROUND: district && district.battleground ? 1 : 0,
          },
        };
      });
      return Promise.all([
        updateFeatures({
          url: stateBoundriesService,
          features: updatedStateFeatures,
          authentication: session,
        })
          .then((response) => {
            return response;
          })
          .catch((e) => {
            console.log(e.response);
          }),
        updateFeatures({
          url: districtBoundriesService,
          features: updatedDistrictFeatures.filter((f) => !!f),
          authentication: session,
        })
          .then((response) => {
            return response;
          })
          .catch((e) => {
            console.log(e.response);
          }),
      ]);
    }
  );
}

async function fetchSenateCandidates() {
  const senateRecords = await fetchTable("Senate", "Full View");

  return senateRecords.map((record) => {
    return {
      state: record.get("State").trim(),
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
    const district = record.get("District");

    return {
      state: record.get("State").trim(),
      stateAbbr: convertStateToAbbr(record.get("State")).toLowerCase(),
      district: Number.isNaN(parseInt(district)) ? 0 : parseInt(district),
      party: record.get("Party"),
      stateFips: record.get("State FIPS"),
      name: record.get("Candidate Name"),
      incumbent: record.get("Incumbent or New Candidate") === "Incumbent",
      campaignUrl: record.get("Camp URL"),
      facebookUrl: record.get("Facebook URL"),
      twitterHandle: record.get("Twitter Handle"),
      instagramHandle: record.get("Instagram Handle"),
      image: record.get("URL nlImage"),
      campaignPriorities: record.get("KVI"),
      battleground: record.get("Battleground District") === "yes",
      woman: record.get("Woman") === "yes",
      bipoc: record.get("BIPOC") === "yes",
      type: "house",
      slug: slug(record.get("Candidate Name")),
    };
  });
}

async function fetchAllStates() {
  return queryFeatures({
    url: stateBoundriesService,
    outFields: ["STUSPS", "FID", "BATTLEGROUND"],
    returnCentroid: true,
    returnGeometry: false,
    outSR: 4236,
  });
}

async function getStateLabelPoints() {
  return fetchAllStates()
    .then((result) => {
      return result.features.map((feature) => {
        return {
          state: feature.attributes.STUSPS.toLowerCase(),
          x: feature.centroid.x,
          y: feature.centroid.y,
        };
      });
    })
    .catch((e) => {
      console.log({ e });
    });
}
async function fetchAllDistricts() {
  return queryFeatures({
    url: districtBoundriesService,
    outFields: ["FID", "STATEUSPS", "CD116FP", "BATTLEGROUND"],
    returnCentroid: true,
    returnGeometry: false,
    outSR: 4236,
  }).then((result) => {
    result.features.map((feature) => {
      feature.attributes.CD116FP =
        parseInt(feature.attributes.CD116FP) === 98
          ? 0
          : feature.attributes.CD116FP;
      return feature;
    });
    return result;
  });
}

async function getDistrictLabelPoints() {
  return fetchAllDistricts()
    .then((result) => {
      return result.features.map((feature) => {
        return {
          state: feature.attributes.STATEUSPS.toLowerCase(),
          district: parseInt(feature.attributes.CD116FP, 10),
          x: feature.centroid.x,
          y: feature.centroid.y,
        };
      });
    })
    .catch((e) => {
      console.log({ e });
    });
}

async function generateLabelPoints() {
  return Promise.all([getStateLabelPoints(), getDistrictLabelPoints()]).then(
    ([stateRequests, districtRequests]) => {
      return { states: stateRequests, districts: districtRequests };
    }
  );
}

function stripQuery(inUrl) {
  const parsedUrl = url.parse(inUrl);
  parsedUrl.query = null;
  parsedUrl.search = null;
  return url.format(parsedUrl);
}

function getExt(inUrl) {
  const parsedUrl = url.parse(inUrl);
  if (parsedUrl.path) {
    return path.extname(parsedUrl.path);
  }
  return ".jpg";
}

async function downloadImage(candidate) {
  if (!candidate.image) {
    return Promise.resolve(candidate);
  }
  const imageUrl = stripQuery(candidate.image);
  if (!imageUrl) {
    return Promise.resolve(candidate);
  }
  const ext = getExt(imageUrl);
  if (!ext) {
    return Promise.resolve(candidate);
  }

  const filename = `${slug(candidate.state.toLowerCase())}-${
    candidate.district ? candidate.district + "-" : ""
  }${candidate.slug}.jpg`;

  const imagePath = path.resolve(
    __dirname,
    "../",
    "public",
    "images",
    filename
  );

  const exists = await pathExists(imagePath);

  if (exists) {
    candidate.image = `/images/${filename}`;
    return candidate;
  }

  try {
    const imageData = await Axios({
      url: imageUrl,
      method: "GET",
      responseType: "arraybuffer",
      headers: {
        origin: "https://github.com",
      },
    });

    const result = await sharp(imageData.data)
      .resize(300, 300, {
        fit: "cover",
      })
      .toFormat("jpeg")
      .toFile(imagePath);
    console.log(`new image ${filename}`);
    candidate.image = `/images/${filename}`;
    return candidate;
  } catch (e) {
    console.log({ candidate, error: e.message });

    return candidate;
  }
}

function isPrimaryParty(candidate) {
  return candidate.party === "Democrat" || candidate.party === "Republican";
}

const candidateCompare = (a, b) => {
  if ((a.incumbent && b.incumbent) || (!a.incumbent && !b.incumbent)) {
    if (isPrimaryParty(a) && !isPrimaryParty(b)) {
      return -1;
    }

    if (!isPrimaryParty(a) && isPrimaryParty(b)) {
      return 1;
    }
    const aLastName = a.name.split(" ").pop();
    const bLastName = b.name.split(" ").pop();

    return aLastName.localeCompare(bLastName);
  }

  if (!a.incumbent && b.incumbent) {
    return 1;
  }

  if (a.incumbent && !b.incumbent) {
    return -1;
  }
};

(async function run() {
  try {
    console.log("fetching senate candidates and images");
    const senateCandidates = await fetchSenateCandidates().then(
      (candidates) => {
        return Promise.all(
          candidates.map((candidate) => downloadImage(candidate))
        );
      }
    );
    console.log("fetching house candidates and images");
    const houseCandidates = await fetchHouseCandidates().then((candidates) => {
      return Promise.all(
        candidates.map((candidate) => downloadImage(candidate))
      );
    });

    const senateByState = groupBy(
      senateCandidates.sort(candidateCompare),
      "stateAbbr"
    );
    const houseByState = groupBy(
      houseCandidates.sort(candidateCompare),
      "stateAbbr"
    );
    console.log("generate label points");

    const labelPoints = await generateLabelPoints({
      senate: senateCandidates,
      house: houseByState,
    });

    const stateWrites = stateAbbrs.map((abbr) => {
      return outputJSON(`./public/data/${abbr}-data.json`, {
        abbr,
        name: convertAbbrToState(abbr),
        senate: senateByState[abbr],
        house: houseByState[abbr],
        battleground: senateByState[abbr]
          ? senateByState[abbr].some((c) => c.battleground)
          : false,
        battlegroundDistricts: houseByState[abbr].reduce(
          (battlegrounds, candidate) => {
            if (candidate.battleground) {
              battlegrounds.push(candidate.district);
            }
            return battlegrounds;
          },
          []
        ),
      });
    });

    const summaryWrite = outputJSON(
      "./public/data/summary.json",
      {
        senate: Object.keys(senateByState).map((abbr) => {
          return {
            labelPoint: labelPoints.states.find((p) => p.state === abbr),
            candidates: senateByState[abbr].map((candidate) => ({
              stateAbbr: candidate.stateAbbr,
              district: candidate.district,
              party: candidate.party,
              name: candidate.name,
              image: candidate.image,
              slug: candidate.slug,
              woman: candidate.woman,
              bipoc: candidate.bipoc,
            })),
          };
        }),
        house: [
          ...Object.keys(houseByState).map((abbr) => {
            const houseCandidatesByDistrict = groupBy(
              houseByState[abbr],
              "district"
            );
            return Object.keys(houseCandidatesByDistrict).map((district) => {
              return {
                labelPoint: labelPoints.districts.find((p) => {
                  return (
                    p.state === abbr &&
                    parseInt(p.district) === parseInt(district)
                  );
                }),
                candidates: houseCandidatesByDistrict[district].map(
                  (candidate) => ({
                    stateAbbr: candidate.stateAbbr,
                    district: candidate.district,
                    party: candidate.party,
                    name: candidate.name,
                    image: candidate.image,
                    slug: candidate.slug,
                    woman: candidate.woman,
                    bipoc: candidate.bipoc,
                  })
                ),
              };
            });
          }),
        ].flat(),
      },
      { spaces: 2 }
    );

    console.log("write data");

    await Promise.all([...stateWrites, summaryWrite]);

    console.log("sync battleground states and districts");
    await syncBattlegroundStates({
      senate: senateCandidates,
      house: houseCandidates,
    });
  } catch (e) {
    console.error(e);
  }
})();
