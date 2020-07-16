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
  // jewels = jewels.split("");
  let mid;
  let score = 0;
  let findingPairs = true;
  mainLoop:
  while(findingPairs) {
    findingPairs = false;
    // Check the center
    const mid = Math.floor(jewels.length / 2);
    if(jewels[mid - 1] === jewels[mid]) {
      // let mod = (jewels).splice(mid - 1, 2);
      jewels = jewels.slice(0, mid - 1) + jewels.slice(mid + 1, jewels.length);
      // console.log(mod == jewels, mod, jewels);
      score++;
      findingPairs = true;
    } else {
      verificationLoop:
      for(let i = 1; i < jewels.length; i++) {
        if(jewels[i - 1] === jewels[i]) {
          let additionalMatches = 0,
            leftIndex = i - 2,
            rightIndex = i + 1;
          while(jewels[leftIndex] && jewels[leftIndex] === jewels[rightIndex]) {
            additionalMatches++;
            leftIndex--;
            rightIndex++;
          }
          if(additionalMatches > 0) {
            console.log("matches", additionalMatches);
            jewels = jewels.slice(0, leftIndex) + jewels.slice(rightIndex, jewels.length);
            // console.log("after", jewels);
            score += 1 + additionalMatches;
          } else {
            jewels = jewels.slice(0, i - 1) + jewels.slice(i + 1, jewels.length);
            score++;
          }
          findingPairs = true;
          break verificationLoop;
        }
      }
    }
  }

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


