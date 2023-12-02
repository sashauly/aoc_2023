import readLineByLine from '../utils/readLineByLine.js';

// const numberAsStrings = {
//   one: '1',
//   two: '2',
//   three: '3',
//   four: '4',
//   five: '5',
//   six: '6',
//   seven: '7',
//   eight: '8',
//   nine: '9',
// };

const calculateSumOfCalibrations = async (filePath) => {
  let sum = 0;

  try {
    await readLineByLine(filePath).then((lines) => {
      lines.forEach((line) => {
        // Object.keys(numberAsStrings).forEach((word) => {
        //   line = line.replace(new RegExp(word, 'g'), numberAsStrings[word]);
        // });

        const firstDigit = line.match(/\d/)[0];
        const lastDigit = line.match(/\d/g).pop();
        const calibrationValue = parseInt(firstDigit + lastDigit, 10);

        sum += calibrationValue;
      });
    });
    console.log(sum);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const filePath = '01/input.txt';
calculateSumOfCalibrations(filePath);
