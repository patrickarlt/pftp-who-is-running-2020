require("isomorphic-fetch");
require("isomorphic-form-data");
require("dotenv").config();
const Airtable = require("airtable");
const { queryFeatures } = require("@esri/arcgis-rest-feature-layer");
const { outputJSON } = require("fs-extra");
const { groupBy } = require("lodash");
const slug = require("slug");
const polylabel = require("polylabel");
const centroid = require("@turf/centroid").default;
const stateBoundriesService =
  "https://services9.arcgis.com/q5uyFfTZo3LFL04P/arcgis/rest/services/State_Boundries_(Census)/FeatureServer/0";
const districtBoundriesService =
  "https://services9.arcgis.com/q5uyFfTZo3LFL04P/arcgis/rest/services/Congressional_District_Boundries_(Census)/FeatureServer/0";

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

let popperInstance = null;

function create(marker, tooltip) {
  popperInstance = createPopper(button, tooltip, {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
    ],
  });
}

function destroy() {
  if (popperInstance) {
    popperInstance.destroy();
    popperInstance = null;
  }
}

function show() {
  tooltip.setAttribute("data-show", "");
  create();
}

function hide() {
  tooltip.removeAttribute("data-show");
  destroy();
}

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
    const district = record.get("District");

    return {
      state: record.get("State"),
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
function padWithZeros(num, size) {
  num = Number.isNaN(parseInt(num)) ? 0 : num;
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

async function queryStateLabelPoint(stateId) {
  return queryFeatures({
    url: stateBoundriesService,
    where: `STUSPS = '${stateId.toUpperCase()}'`,
    outFields: ["FID"],
    f: "geojson",
    geometryPrecision: 5,
    maxAllowableOffset: 0.02102783203125,
  })
    .then((result) => {
      const [x, y] = polylabel(result.features[0].geometry.coordinates);
      const point = centroid(result.features[0]).geometry.coordinates;
      // console.log({
      //   state: stateId,
      //   x: x || point[0],
      //   y: y || point[1],
      // });
      return {
        state: stateId,
        x: x || point[0],
        y: y || point[1],
      };
    })
    .catch((e) => {
      console.log({ e, stateId });
    });
}

async function queryDistrictLabelPoint(stateId, districtId) {
  const district = parseInt(districtId)
    ? `(CD116FP = '${padWithZeros(districtId, 2)}') AND `
    : "";
  return queryFeatures({
    url: districtBoundriesService,
    where: `${district}(STATEUSPS = '${stateId.toUpperCase()}')`,
    outFields: ["FID"],
    f: "geojson",
    geometryPrecision: 5,
    maxAllowableOffset: 0.02102783203125,
  })
    .then((result) => {
      const [x, y] = polylabel(result.features[0].geometry.coordinates);
      const point = centroid(result.features[0]).geometry.coordinates;

      // console.log({
      //   state: stateId,
      //   district: districtId,
      //   x: x || point[0],
      //   y: y || point[1],
      // });

      return {
        state: stateId,
        district: districtId,
        x: x || point[0],
        y: y || point[1],
      };
    })
    .catch((e) => {
      console.log({ e, stateId, districtId });
    });
}

async function generateLabelPoints({ senate, house }) {
  const abbrs = senate.map((s) => s.stateAbbr);
  const states = abbrs.filter((item, index) => abbrs.indexOf(item) === index);
  const districts = Object.keys(house).reduce((districts, stateAbbr) => {
    const candidates = house[stateAbbr];
    const stateDistricts = candidates.map((s) => s.district);
    stateDistricts
      .filter((item, index) => stateDistricts.indexOf(item) === index)
      .forEach((district) => {
        districts.push({
          state: stateAbbr,
          district: padWithZeros(district, 2),
        });
      });
    return districts;
  }, []);
  console.log(districts);

  const stateRequests = new Promise((resolve) => {
    let results = [];

    function sendReq(itemsList, iterate) {
      setTimeout(() => {
        // slice itemsList to send request according to the api limit
        let slicedArray = itemsList.slice(iterate * 5, iterate * 5 + 5);
        const result = slicedArray.map((item) => queryStateLabelPoint(item));
        results = [...results, ...result];

        // This will resolve the promise when reaches to the last iteration
        if (iterate === Math.ceil(itemsList.length / 5) - 1) {
          resolve(results);
        }
      }, 1000 * iterate); // every 1000ms runs (api limit of one second)
    }

    // This will make iteration to split array (requests) to chunks of five items
    for (let i = 0; i < Math.ceil(states.length / 5); i++) {
      sendReq(states, i);
    }
  }).then(Promise.all.bind(Promise));
  // .then(console.log);

  const districtRequests = new Promise((resolve) => {
    let results = [];

    function sendReq(itemsList, iterate) {
      setTimeout(() => {
        // slice itemsList to send request according to the api limit
        let slicedArray = itemsList.slice(iterate * 3, iterate * 3 + 3);
        const result = slicedArray.map((item) =>
          queryDistrictLabelPoint(item.state, item.district)
        );
        results = [...results, ...result];

        // This will resolve the promise when reaches to the last iteration
        if (iterate === Math.ceil(itemsList.length / 3) - 1) {
          resolve(results);
        }
      }, 1000 * iterate); // every 1000ms runs (api limit of one second)
    }

    // This will make iteration to split array (requests) to chunks of five items
    for (let i = 0; i < Math.ceil(districts.length / 3); i++) {
      sendReq(districts, i);
    }
  }).then(Promise.all.bind(Promise));
  // .then(console.log);
  // Use Promise.all to wait for all requests to resolve
  // To use it this way binding is required

  return Promise.all([stateRequests, districtRequests]).then(
    ([stateRequests, districtRequests]) => {
      return { states: stateRequests, districts: districtRequests };
    }
  );
}

(async function run() {
  try {
    const senateCandidates = await fetchSenateCandidates();
    const houseCandidates = await fetchHouseCandidates();
    const senateByState = groupBy(senateCandidates, "stateAbbr");
    const houseByState = groupBy(houseCandidates, "stateAbbr");

    const labelPoints = await generateLabelPoints({
      senate: senateCandidates,
      house: houseByState,
    });
    console.log({ labelPoints });

    const stateWrites = stateAbbrs.map((abbr) => {
      return outputJSON(`./public/data/${abbr}.json`, {
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
                  console.log(district, p.district);
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
                  })
                ),
              };
            });
          }),
        ].flat(),
      },
      { spaces: 2 }
    );
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
    await Promise.all([
      ...stateWrites,
      summaryWrite,
      sitemapWrite,
      // syncBattlegroundStates({
      //   senate: senateCandidates,
      //   house: houseCandidates,
      // }),
    ]);
  } catch (e) {
    console.error(e);
  }
})();
