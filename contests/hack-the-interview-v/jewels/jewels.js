'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function() {
  inputString = inputString.split('\n');

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'getMaxScore' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING jewels as parameter.
 */

function getMaxScore(jewels) {
  if(jewels == null) {
    return;
  } else if(jewels.length === 1) {
    return 0;
  } else if (jewels.length === 2) {
    return jewels[0] === jewels[1];
  }
  let score = 0;
  const stack = [];
  for(let i = 0; i < jewels.length; i++) {
    if(stack[stack.length - 1] === jewels[i]) {
      stack.pop();
      score++;
    } else {
      stack.push(jewels[i]);
    }
  }
  console.log(score);

  return score;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const t = parseInt(readLine().trim(), 10);

  for (let tItr = 0; tItr < t; tItr++) {
    const jewels = readLine();

    const ans = getMaxScore(jewels);

    ws.write(ans + '\n');
  }

  ws.end();
}


