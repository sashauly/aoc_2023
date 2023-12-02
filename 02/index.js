import readLineByLine from '../utils/readLineByLine.js';

const bag = {
  red: 12,
  green: 13,
  blue: 14,
};

const processGames = async (filePath) => {
  let sum = 0;

  try {
    const games = await readLineByLine(filePath);

    const parsedGames = games.map((game) => {
      const [gameId, sets] = game.split(': ');
      return {
        id: parseInt(gameId.split(' ')[1], 10),
        sets: sets.split('; ').map((set) => {
          const cubes = set.split(', ').map((cube) => {
            const [count, color] = cube.split(' ');
            return { [color]: parseInt(count, 10) };
          });

          return {
            red: cubes.reduce((total, cube) => total + (cube.red || 0), 0),
            green: cubes.reduce((total, cube) => total + (cube.green || 0), 0),
            blue: cubes.reduce((total, cube) => total + (cube.blue || 0), 0),
          };
        }),
      };
    });

    parsedGames.forEach((game) => {
      const isValidGame = game.sets.every(
        (set) =>
          set.red <= bag.red && set.green <= bag.green && set.blue <= bag.blue,
      );

      if (isValidGame) {
        sum += game.id;
      }
    });

    console.log(sum);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const filePath = '02/input.txt';
processGames(filePath);
