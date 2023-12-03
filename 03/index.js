import { readFile } from 'fs/promises';

const ROW_OFFSET_LIMIT = 1;
const COLUMN_OFFSET_LIMIT = 1;

async function readData(filePath) {
  const data = await readFile(filePath, 'utf8');
  return data.split('\n').map((line) => [...line]);
}

function processGrid(grid) {
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;

  let sumOfPartNumbers = 0;
  const partNumbersByGear = {};

  for (let rowIndex = 0; rowIndex < gridHeight; rowIndex++) {
    let gears = new Set();
    let currentNumber = 0;
    let isPartNumber = false;

    for (let columnIndex = 0; columnIndex < gridWidth + 1; columnIndex++) {
      if (columnIndex < gridWidth && !isNaN(grid[rowIndex][columnIndex])) {
        currentNumber =
          currentNumber * 10 + parseInt(grid[rowIndex][columnIndex]);
        for (
          let rowOffset = -ROW_OFFSET_LIMIT;
          rowOffset <= ROW_OFFSET_LIMIT;
          rowOffset++
        ) {
          for (
            let columnOffset = -COLUMN_OFFSET_LIMIT;
            columnOffset <= COLUMN_OFFSET_LIMIT;
            columnOffset++
          ) {
            if (
              rowIndex + rowOffset >= 0 &&
              rowIndex + rowOffset < gridHeight &&
              columnIndex + columnOffset >= 0 &&
              columnIndex + columnOffset < gridWidth
            ) {
              const neighborCell =
                grid[rowIndex + rowOffset][columnIndex + columnOffset];
              if (isNaN(neighborCell) && neighborCell !== '.') {
                isPartNumber = true;
                if (neighborCell === '*') {
                  gears.add(
                    `${rowIndex + rowOffset},${columnIndex + columnOffset}`,
                  );
                }
              }
            }
          }
        }
      } else if (currentNumber > 0) {
        for (const gear of gears) {
          if (!partNumbersByGear[gear]) {
            partNumbersByGear[gear] = [];
          }
          partNumbersByGear[gear].push(currentNumber);
        }
        if (isPartNumber) {
          sumOfPartNumbers += currentNumber;
        }
        currentNumber = 0;
        isPartNumber = false;
        gears = new Set();
      }
    }
  }

  return { sumOfPartNumbers, partNumbersByGear };
}

function calculateSumAndProduct(partNumbersByGear) {
  let productOfPairs = 0;

  for (const gear in partNumbersByGear) {
    if (partNumbersByGear[gear].length === 2) {
      productOfPairs += partNumbersByGear[gear][0] * partNumbersByGear[gear][1];
    }
  }

  return productOfPairs;
}

async function processFile(filePath) {
  const grid = await readData(filePath);
  const { sumOfPartNumbers, partNumbersByGear } = processGrid(grid);
  const productOfPairs = calculateSumAndProduct(partNumbersByGear);

  console.log(sumOfPartNumbers);
  console.log(productOfPairs);
}

const filePath = './03/input.txt';

processFile(filePath);
