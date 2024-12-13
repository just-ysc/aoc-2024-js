const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

const getInput = async filePath => (await readFile(filePath)).toString();

const getLocationPairs = input => {
  const NEW_LINE_CHAR = '\n';
  const lines = input.split(NEW_LINE_CHAR);

  const leftLocationIds = [];
  const rightLocationIds = [];
  lines.forEach(line => {
    const [leftLocationId, rightLocationId] = line.split(/\s+/).map(e => +e);
    leftLocationIds.push(leftLocationId);
    rightLocationIds.push(rightLocationId);
  })

  leftLocationIds.sort((a, b) => a - b);
  rightLocationIds.sort((a, b) => a - b);

  const pairs = [];
  for (let i = 0; i < leftLocationIds.length; i++) {
    pairs.push({ left: leftLocationIds[i], right: rightLocationIds[i] });
  }
  return pairs;
};

const getTotalDistances = locationPairs => locationPairs.reduce((acc, cur) => acc + Math.abs(cur.left - cur.right), 0);

const printAnswer = answer => console.log(`The answer is : ${answer}`);


(async () => {
  const input = await getInput(path.join(__dirname, '/input.txt'));
  const locationPairs = getLocationPairs(input);
  printAnswer(getTotalDistances(locationPairs));
})();