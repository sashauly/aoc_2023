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

export default readLineByLine;
