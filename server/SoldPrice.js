const fs = require('fs');
const path = require('path');

const SOLD_PRICE_GROUPS = {
  '0_5': '0% - 5%',
  '5_25': '5% - 25%',
  '25_75': '25% - 75%',
  '75_95': '75% - 95%',
  '95_100': '95% - 100%'
};

class SoldPrice {

  getDataSet(fileName, callback = () => {}) {
    this.readSoldPriceDataFromFile(fileName, (fileData) => {
      const parsedData = this.parseSoldPriceData(fileData);
      const filteredData = this.filterRelevantData(parsedData);
      const groupSortedData = this.sortDataIntoGroups(filteredData);
      callback(groupSortedData);
    });
  }

  getPercentile(data, q) {
    data = this.arraySortNumbers(data);
    const pos = ((data.length) - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    if ((data[base + 1] !== undefined)) {
      return data[base] + rest * (data[base + 1] - data[base]);
    } else {
      return data[base];
    }
  }

  /**
   * The "range" of a list a numbers is the difference between the largest and
   * smallest values.
   *
   * For example, the "range" of [3, 5, 4, 4, 1, 1, 2, 3] is [1, 5].
   *
   * @param {Array} numbers An array of numbers.
   * @return {object} The range of the specified numbers.
   */
  getRange(numbers) {
    return {
      lowest: Math.min(...numbers),
      highest: Math.max(...numbers)
    };
  }

  arraySortNumbers(inputArray) {
    return inputArray.sort((a, b) => {
      return a - b;
    });
  }

  sortDataIntoGroups(soldPriceData) {
    const priceDataSet = this.getPriceDataSet(soldPriceData);

    const range = this.getRange(priceDataSet);
    const highestPrice = range.highest;
    const lowestPrice = range.lowest;
    const fifthPercentile = this.getPercentile(priceDataSet, 0.05);
    const twentyFifthPercentile = this.getPercentile(priceDataSet, 0.25);
    const seventyFifthPercentile = this.getPercentile(priceDataSet, 0.75);
    const ninetyFifthPercentile = this.getPercentile(priceDataSet, 0.95);

    let soldPriceDataInGroups = {
      [SOLD_PRICE_GROUPS['0_5']]: [],
      [SOLD_PRICE_GROUPS['5_25']]: [],
      [SOLD_PRICE_GROUPS['25_75']]: [],
      [SOLD_PRICE_GROUPS['75_95']]: [],
      [SOLD_PRICE_GROUPS['95_100']]: [],
    };

    soldPriceData.forEach((soldPriceDatum) => {
      const price = soldPriceDatum.p;
      if (
        price >= lowestPrice &&
        price <= fifthPercentile
      ) {
        soldPriceDataInGroups[SOLD_PRICE_GROUPS['0_5']].push(soldPriceDatum);
      } else if (
        price >= fifthPercentile &&
        price <= twentyFifthPercentile
      ) {
        soldPriceDataInGroups[SOLD_PRICE_GROUPS['5_25']].push(soldPriceDatum);
      } else if (
        price >= twentyFifthPercentile
        && price <= seventyFifthPercentile
      ) {
        soldPriceDataInGroups[SOLD_PRICE_GROUPS['25_75']].push(soldPriceDatum);
      } else if
      (
        price >= seventyFifthPercentile
        && price <= ninetyFifthPercentile
      ) {
        soldPriceDataInGroups[SOLD_PRICE_GROUPS['75_95']].push(soldPriceDatum);
      } else if (
        price >= ninetyFifthPercentile
        && price <= highestPrice
      ) {
        soldPriceDataInGroups[SOLD_PRICE_GROUPS['95_100']].push(soldPriceDatum);
      }
    });

    return soldPriceDataInGroups;
  }

  getPriceDataSet(soldPriceData) {
    return soldPriceData.map((soldPriceDatum) => {
      return soldPriceDatum.p;
    })
  }

  readSoldPriceDataFromFile(fileName, callback = () => {
  }) {
    const filePath = path.join(__dirname, fileName);
    fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
      if (!err) {
        callback(data);
      } else {
        console.log(err);
      }
    });
  }

  parseSoldPriceData(data) {
    let returnDataSet = [];
    data
      // Split on new line
      .split(/\r?\n/)
      .forEach((dataItem) => {
        // Split on spaces
        const soldPriceDatum = dataItem.split(" ");
        const x = parseInt(soldPriceDatum[0]);
        const y = parseInt(soldPriceDatum[1]);
        const price = parseInt(soldPriceDatum[2]);
        if(
          !isNaN(x) &&
          !isNaN(y) &&
          !isNaN(price)
        ) {
          returnDataSet.push({
            x: x,
            y: y,
            p: price
          });
        }
      });
    return returnDataSet;
  }

  filterRelevantData(soldPriceData) {
    return soldPriceData.filter((soldPriceDatum) => {
      return 0 <= soldPriceDatum.x < 100 &&
        0 <= soldPriceDatum.y < 100 &&
        10000 < soldPriceDatum.p < 10000000;
    });
  }
}

module.exports = SoldPrice;


