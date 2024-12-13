const axios = require('axios');

exports.fetchPopulationData = async (year) => {
  try {
    const url = `https://lustat.statec.lu/rest/data/LU1,DF_B1100,1.0/.A?lastNObservations=5&dimensionAtObservation=AllDimensions`;
    const response = await axios.get(url);

    const observations = response.data.dataSets[0].observations;
    const observationDimensions = response.data.structure.dimensions.observation;

    console.log("Observation Dimensions:", observationDimensions);
    console.log("Observations:", observations);

    const availableYears = getAvailableYears(observationDimensions, observations);

    if (availableYears.includes(year)) {
      const populationData = parseObservations(observations, observationDimensions, year);
      return populationData;
    } else {
      const closestBefore = availableYears.filter(y => y < year).pop();
      const closestAfter = availableYears.find(y => y > year);

      return {
        message: `Exact data for year ${year} not found. Showing closest available years.`,
        closestBefore: closestBefore ? parseObservations(observations, observationDimensions, closestBefore) : null,
        closestAfter: closestAfter ? parseObservations(observations, observationDimensions, closestAfter) : null
      };
    }
  } catch (error) {
    throw new Error(`Error fetching data from Statec API: ${error.message}`);
  }
};

function getAvailableYears(observationDimensions, observations) {
  const timePeriodIndex = observationDimensions.findIndex(dimension => dimension.name === "Time period");
  const years = Object.keys(observations)
    .map(key => parseInt(observationDimensions[timePeriodIndex].values[key.split(":")[timePeriodIndex]].name))
    .sort((a, b) => a - b);
  return Array.from(new Set(years));
}

function parseObservations(observations, observationDimensions, targetYear) {
  let specificationIndex, timePeriodIndex;

  observationDimensions.forEach((dimension, index) => {
    if (dimension.name === "Specification") {
      specificationIndex = index;
    } else if (dimension.name === "Time period") {
      timePeriodIndex = index;
    }
  });

  console.log(`Indices - Specification: ${specificationIndex}, Time Period: ${timePeriodIndex}`);

  const result = {
    totalPopulation: null,
    males: {
      luxembourgish: null,
      foreign: null
    },
    females: {
      luxembourgish: null,
      foreign: null
    }
  };

  for (const [key, data] of Object.entries(observations)) {
    const keyParts = key.split(":").map(Number);

    const observationYear = parseInt(observationDimensions[timePeriodIndex].values[keyParts[timePeriodIndex]].name);
    const specificationType = keyParts[specificationIndex];
    const specificationName = observationDimensions[specificationIndex].values[specificationType].name;

    if (observationYear !== targetYear) continue;

    console.log(`Specification Type: ${specificationType}, Specification Name: ${specificationName}, Data: ${data[0]}`);

    if (specificationName === "Population per km²") continue;

    if (specificationName === "Total population") {
      result.totalPopulation = data[0];
      console.log("Assigned to totalPopulation:", data[0]);
    } else if (specificationName === "Luxembourgish males") {
      result.males.luxembourgish = data[0];
      console.log("Assigned to males.luxembourgish:", data[0]);
    } else if (specificationName === "Foreign males") {
      result.males.foreign = data[0];
      console.log("Assigned to males.foreign:", data[0]);
    } else if (specificationName === "Luxembourgish females") {
      result.females.luxembourgish = data[0];
      console.log("Assigned to females.luxembourgish:", data[0]);
    } else if (specificationName === "Femmes étrangères") { 
      result.females.foreign = data[0];
      console.log("Assigned to females.foreign:", data[0]);
    }
  }

  console.log("Final Parsed Result:", result);

  return result;
}