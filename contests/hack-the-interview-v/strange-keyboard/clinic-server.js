'use strict'

const fs = require('fs');

const restify = require('restify')
const server = restify.createServer()

function createLargeLinkStructure (tail, item, repeats, callback) {
  setImmediate(function () {
    if (repeats > 0) {
      const next = JSON.parse(item)
      tail.next = next
      createLargeLinkStructure(next, item, repeats - 1, callback)
    } else {
      callback(null, tail)
    }
  })
}

function getLargeData (data, callback) {
  const item = JSON.stringify(data)
  const first = JSON.parse(item)
  createLargeLinkStructure(first, item, 512, function (err, last) {
    if (err) return callback(err)

    // make data circular
    last.next = first
    callback(null, first)
  })
}

function getVersion (bigdata, callback) {
  setTimeout(function () {
    callback(null, bigdata.version)
  }, 1000)
}

function processRequest (data, callback) {
  getLargeData(data, function (err, bigdata) {
    if (err) return callback(err)

    getVersion(bigdata, function (err, version) {
      if (err) return callback(err)

      callback(null, { version })
    })
  })
}

server.get('/', function (req, res, next) {
  fs.readFile("./input08.txt", 'utf8', function(err, data) {
    if (err) throw err;
    main(data);
    res.send("done")
  });
})

server.listen(3000)

process.on('SIGINT', function () {
  console.error('Caught SIGINT, shutting down.')
  server.close()
})

// ------
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
  const result = [];
  let index = 0;

  for(let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if(COMMANDS[input]) {
      // console.log("perform ", inputs[i]);
      switch(input) {
        case BACKSPACE:
          // console.log('backspace before', result, index);
          result.splice(index - 1, 1);
          index--;
          // console.log('backspace after', result, index);
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
          // index++;
          continue;
      }
    } else {
      if(!numLockEnabled && input.match(/\d/)) {
        // index++;
        continue;
      }
      result.splice(index, 0, input);
    }
    // console.log(result, index);

    // console.log(inputs.length, index, input, i);
    index++;
  }

  return result.join("");
}

function main(S) {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    // const S = readLine();

    const result = receivedText(S);

    ws.write(result + '\n');

    ws.end();
}


