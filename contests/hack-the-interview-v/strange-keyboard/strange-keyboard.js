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
 * Complete the 'receivedText' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING S as parameter.
 */


const NUM_LOCK = "#";
const BACKSPACE = "*";
const END = ">";
const HOME = "<";
const COMMANDS = {[NUM_LOCK]: true, [BACKSPACE]: true, [END]: true, [HOME]: true};
let numLockEnabled = true;

function receivedText(S) {
  let inputs = S;
  let result = "";
  let index = 0;
  console.log("check", inputs.slice(3454, 3459));

  for(let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if(COMMANDS[input]) {
      // console.log("perform ", inputs[i]);
      switch(input) {
        case BACKSPACE:
          console.log("before backspace", result, index, input, i);
          if(index > 0) {
            result = result.slice(0, index - 1) + result.slice(index, result.length);
            index--;
          }
          continue;
          break;
        case HOME:
          index = 0;
          continue;
        case END:
          index = result.length;
          continue;
        case NUM_LOCK:
          numLockEnabled = !numLockEnabled;
          continue;
      }
    } else {
      if(!numLockEnabled && input.match(/\d/)) {
        continue;
      }
      // console.log(result.slice(0, index - 1) , input , result.slice(index + 1, result.length - 1));
      if(result === "") {
        result += input;
      } else if(index === 0) {
        result = input + result;
      } else {
        // (i > 50) ? console.log('before', result, 'index', index, 'input', input) : null
        result = result.slice(0, index) + input + result.slice(index, result.length);
        // (i > 50) ? console.log('after', result, 'index', index, 'input', input) : null
      }
    }
    index++;
  }

  return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const S = readLine();

    const result = receivedText(S);

    ws.write(result + '\n');

    ws.end();
}


