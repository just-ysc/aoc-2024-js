const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

const getInput = async filePath => (await readFile(filePath)).toString();

const globPattern = /(mul\((\d+),(\d+)\))|(do(n't)?\(\))/g;

const getBlocks = input => input.match(globPattern);

let mulEnabled = true;
const mulPattern = /mul\((\d+),(\d+)\)/;

const calcMulBlock = block => {
  if (block === "do()") {
    mulEnabled = true;
    return 0;
  } else if (block === "don't()") {
    mulEnabled = false;
    return 0;
  } else if (!mulEnabled) {
    return 0;
  }

  const [, num1, num2] = block.match(mulPattern);

  return Number(num1) * Number(num2);
}

const getAnswer = mulBlocks =>  mulBlocks.reduce((acc, cur) => acc + calcMulBlock(cur) , 0);

const printAnswer = answer => console.log(`The answer is : ${answer}`);


(async () => {
  const input = await getInput(path.join(__dirname, '/../../input.txt'));

  const blocks = getBlocks(input);

  printAnswer(getAnswer(blocks));
})();