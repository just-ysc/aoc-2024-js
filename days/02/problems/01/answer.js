const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

const getInput = async filePath => (await readFile(filePath)).toString();

const getReports = input => {
  const NEW_LINE_CHAR = '\n';
  const SPACE_CHAR = ' ';
  return input.split(NEW_LINE_CHAR).map(line => line.split(SPACE_CHAR).map(level => +level));
}

const isSafe = report => {
  const INCREASING = 1;
  const DECREASING = -1;
  let graduation;
  for (let i = 1; i < report.length; i++) {
    const prevLevel = report[i - 1];
    const curLevel = report[i];
    if (prevLevel === curLevel) return false;

    const curGraduation = prevLevel < curLevel ? INCREASING : DECREASING;
    if (!graduation) {
      graduation = curGraduation;
    } else if (graduation !== curGraduation) {
      return false;
    }

    if (Math.abs(prevLevel - curLevel) > 3) return false;
  }
  return true;
}

const printAnswer = answer => console.log(`The answer is : ${answer}`);


(async () => {
  const input = await getInput(path.join(__dirname, '/../../input.txt'));
  const reports = getReports(input);
  const answer = reports.reduce((safeCount, report) => safeCount + (isSafe(report) ? 1 : 0), 0);
  printAnswer(answer);
})();