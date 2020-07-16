process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////

function birthdayCakeCandles(n, ar) {
    if(n === 0) return 0;
    const ordered = ar.sort((a,b) => a - b);
    const tallest = ordered[ordered.length - 1];
    let tallestCount = 0;
  
      console.log(ordered.length, tallest)
    for(let i = ordered.length - 1; i >= 0; i--) {
      if(ordered[i] < tallest)
        break;
      tallestCount++;
    }
  //console.log(ordered, tallest, tallestCount)
    return tallestCount;
}

function main() {
    var n = parseInt(readLine());
    ar = readLine().split(' ');
    ar = ar.map(Number);
    var result = birthdayCakeCandles(n, ar);
    process.stdout.write("" + result + "\n");

}
