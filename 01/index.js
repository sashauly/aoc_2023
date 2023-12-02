import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';

const readLineByLine = async (filePath) => {
  try {
    const fileStream = createReadStream(filePath);

    const rl = createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    const lines = [];
    for await (const line of rl) {
      lines.push(line);
    }

    return lines;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const numberAsStrings = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

const calculateSumOfCalibrations = async (filePath) => {
  let sum = 0;

  try {
    await readLineByLine(filePath).then((lines) => {
      lines.forEach((line) => {
        Object.keys(numberAsStrings).forEach((word) => {
          line.replace(new RegExp(word, 'g'), numberAsStrings[word]);
        });
        const firstDigit = line.match(/\d/)[0];
        const lastDigit = line.match(/\d/g).pop();
        const calibrationValue = parseInt(firstDigit + lastDigit, 10);

        sum += calibrationValue;
      });
    });
    return sum;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const filePath = '01/input.txt';

const sum = await calculateSumOfCalibrations(filePath);
console.log(sum);
