'use strict';

const data = `city,population,area,density,country
Shanghai,24256800,6340,3826,China
Delhi,16787941,1484,11313,India
Lagos,16060303,1171,13712,Nigeria
Istanbul,14160467,5461,2593,Turkey
Tokyo,13513734,2191,6168,Japan
Sao Paulo,12038175,1521,7914,Brazil
Mexico City,8874724,1486,5974,Mexico
London,8673713,1572,5431,United Kingdom
New York City,8537673,784,10892,United States
Bangkok,8280925,1569,5279,Thailand`;

function parseData(data) {
  const lines = data.trim().split('\n');
  const headers = lines.shift().split(',');
  return lines.map((line) => {
    const cells = line.split(',');
    return headers.reduce((obj, header, index) => {
      obj[header] = cells[index];
      return obj;
    }, {});
  });
}

function findMaxDensity(cities) {
  return Math.max(...cities.map((city) => parseFloat(city.density)));
}

function calculateDensityPercentages(cities, maxDensity) {
  return cities.map((city) => ({
    ...city,
    densityPercentage: Math.round((parseFloat(city.density) * 100) / maxDensity),
  }));
}

function sortCitiesByDensityPercentage(cities) {
  return [...cities].sort((a, b) => b.densityPercentage - a.densityPercentage);
}

function formatCityRow(city) {
  return (
    city.city.padEnd(18) +
    city.population.padStart(10) +
    city.area.padStart(8) +
    city.density.padStart(8) +
    city.country.padStart(18) +
    city.densityPercentage.toString().padStart(6)
  );
}

function printTable(cities) {
  cities.forEach((city) => console.log(formatCityRow(city)));
}

if (data) {
  const cities = parseData(data);
  const maxDensity = findMaxDensity(cities);
  const citiesWithPercentages = calculateDensityPercentages(cities, maxDensity);
  const sortedCities = sortCitiesByDensityPercentage(citiesWithPercentages);
  printTable(sortedCities);
}

function testParseData() {
  const testData = `city,population,area,density,country
TestCity,1000,10,100,TestCountry`;
  const expected = [
    {
      city: 'TestCity',
      population: '1000',
      area: '10',
      density: '100',
      country: 'TestCountry',
    },
  ];
  const result = parseData(testData);
  console.assert(JSON.stringify(result) === JSON.stringify(expected), 'Data parsing failed');
}

function testCalculateDensityPercentages() {
  const cities = [
    { city: 'TestCity', density: '100' },
    { city: 'TestCity2', density: '200' },
  ];
  const maxDensity = 200;
  const expected = [
    { city: 'TestCity', density: '100', densityPercentage: 50 },
    { city: 'TestCity2', density: '200', densityPercentage: 100 },
  ];
  const result = calculateDensityPercentages(cities, maxDensity);
  console.assert(JSON.stringify(result) === JSON.stringify(expected), 'Density percentage calculation failed');
}

testParseData();
testCalculateDensityPercentages();
