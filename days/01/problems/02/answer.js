const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

const IDX_LEFT = 0;
const IDX_RIGHT = 1;

const getInput = async filePath => (await readFile(filePath)).toString();

const getLocationIds = (input, indexSide) => {
  const NEW_LINE_CHAR = '\n';
  const lines = input.split(NEW_LINE_CHAR);

  return lines.map(line => line.split(/\s+/).map(e => +e)[indexSide]);
};

const getLocationIdCountMap = locationIds => {
  const countMap = new Map();
  locationIds.forEach(locationId => {
    if (!countMap.has(locationId)) countMap.set(locationId, 0);
    countMap.set(locationId, countMap.get(locationId) + 1);
  });
  return countMap;
};

const getSimilarityScore = (locationIds, locationIdCountMap) => locationIds.reduce((acc, cur) => {
  const currentScore = cur * (locationIdCountMap.get(cur) ?? 0);
  return acc + currentScore;
}, 0);

const printAnswer = answer => console.log(`The answer is : ${answer}`);


(async () => {
  const input = await getInput(path.join(__dirname, '/../../input.txt'));
  const leftLocationIds = getLocationIds(input, IDX_LEFT);
  const rightLocationIdCountMap = getLocationIdCountMap(getLocationIds(input, IDX_RIGHT));
  const similarityScore = getSimilarityScore(leftLocationIds, rightLocationIdCountMap);
  printAnswer(similarityScore);
})();