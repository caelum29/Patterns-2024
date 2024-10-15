'use strict';

class City {
  constructor (name, population, area, density, country) {
    this.name = name;
    this.population = population;
    this.area = area;
    this.density = parseFloat(density);
    this.country = country;
    this.densityPercentage = 0;
  }

  calculateDensityPercentage (maxDensity) {
    this.densityPercentage = Math.round((this.density * 100) / maxDensity);
  }

  formatRow () {
    return (
      this.name.padEnd(18) +
      this.population.padStart(10) +
      this.area.padStart(8) +
      this.density.toString().padStart(8) +
      this.country.padStart(18) +
      this.densityPercentage.toString().padStart(6)
    );
  }
}

class CityTable {
  constructor (data) {
    this.cities = this.parseData(data);
    this.maxDensity = this.findMaxDensity();
    this.calculateDensityPercentages();
    this.sortCitiesByDensityPercentage();
  }

  parseData (data) {
    const lines = data.trim().split('\n');
    lines.shift(); // Remove header
    return lines.map((line) => {
      const [name, population, area, density, country] = line.split(',');
      return new City(name, population, area, density, country);
    });
  }

  findMaxDensity () {
    return Math.max(...this.cities.map((city) => city.density));
  }

  calculateDensityPercentages () {
    this.cities.forEach(
      (city) => city.calculateDensityPercentage(this.maxDensity));
  }

  sortCitiesByDensityPercentage () {
    this.cities.sort((a, b) => b.densityPercentage - a.densityPercentage);
  }

  printTable () {
    this.cities.forEach((city) => console.log(city.formatRow()));
  }
}

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

if (data) {
  const cityTable = new CityTable(data);
  cityTable.printTable();
}

function testCityClass (data) {
  const testData = data || ['TestCity', '1000', '10', '100', 'TestCountry']
  const city = new City(...testData);
  city.calculateDensityPercentage(200);
  console.assert(city.densityPercentage === 50,
    'City density percentage calculation failed');
}

function testCityTableClass (data) {
  const testData = data || `city,population,area,density,country
TestCity1,1000,10,100,TestCountry
TestCity2,2000,20,200,TestCountry`;
  const cityTable = new CityTable(testData);
  console.assert(cityTable.maxDensity === 200,
    'Max density calculation failed');
  console.assert(cityTable.cities[0].densityPercentage === 100,
    'Density percentage sorting failed');
}

testCityClass();
testCityTableClass();
