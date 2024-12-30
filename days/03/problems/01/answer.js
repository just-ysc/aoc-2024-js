const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

const getInput = async filePath => (await readFile(filePath)).toString();

const mulPattern = /mul\((\d+),(\d+)\)/;

const mulGlobPattern = /(mul\((\d+),(\d+)\))/g;

const getMulBlocks = input => input.match(mulGlobPattern);

const calcMulBlock = mulBlock => {
  const [, num1, num2] = mulBlock.match(mulPattern);
  return Number(num1) * Number(num2);
}

const getAnswer = mulBlocks =>  mulBlocks.reduce((acc, cur) => acc + calcMulBlock(cur) , 0);

const printAnswer = answer => console.log(`The answer is : ${answer}`);


(async () => {
  const input = await getInput(path.join(__dirname, '/../../input.txt'));

  const mulBlocks = getMulBlocks(input);

  printAnswer(getAnswer(mulBlocks));
})();