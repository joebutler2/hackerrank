// Took 1 hour and 15 minutes to solve.
// Need to be more aware of edge cases. Also need to pay close attention
// to the instructions. Intially I though that we were counting entries
// in the result, rather than specifically which ones were "flipped on"
// i.e. "1".
// https://www.hackerrank.com/contests/hack-the-interview-v/challenges/the-xor-problem/leaderboard/10
// Looking at the results I would have been in the top 100 results.
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
 * Complete the 'maxXorValue' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING x
 *  2. INTEGER k
 */

function maxXorValue(bit_string, bit_count) {
  const base_ten = parseInt(bit_string, 2);
  let result = "";
  let numOfSetBits = 0;
  let finalIndex;
  if(bit_count > 0) {
    for(let i = 0; i < bit_string.length; i++) {
      if(bit_string[i] == '1') {
        result += '0';
      } else {
        result += '1';
        numOfSetBits++;
        if(numOfSetBits === bit_count) {
          finalIndex = i;
          break;
        }
      }
    }
  } else {
    // The result should be all zeros.
    finalIndex = -1;
  }

  for(let j = finalIndex + 1; j < bit_string.length; j++) {
    result += '0' // bit_string[j];
  }

  // console.log(typeof base_number, bit_count, to_binary(base_ten))
  return result;
}

const to_binary = (decimal) => (decimal >>> 0).toString(2);

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const s = readLine();

        const k = parseInt(readLine().trim(), 10);

        const y = maxXorValue(s, k);

        ws.write(y + '\n');
    }

    ws.end();
}


