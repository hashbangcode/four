// Set up variables for the game.
let loose = false;

let segments = [];
segments[0] = [
  {row: 0, column: 0,},
  {row: 0, column: 1,},
  {row: 1, column: 0,},
];
segments[1] = [
  {row: 2, column: 0,},
  {row: 3, column: 0,},
  {row: 3, column: 1,},
];
segments[2] = [
  {row: 0, column: 2,},
  {row: 0, column: 3,},
  {row: 1, column: 3,},
];
segments[3] = [
  {row: 2, column: 3,},
  {row: 3, column: 2,},
  {row: 3, column: 3,},
];
segments[4] = [
  {row: 1, column: 1,},
  {row: 1, column: 2,},
  {row: 2, column: 1,},
  {row: 2, column: 2,},
];

let segmentColours = [
  'blue',
  'yellow',
  'red',
  'green',
  'purple',
];

let sequence = [];
let position = 0;


//start sequence
//increse sequence
//play sequence turn off user intreqctio n then turn it on again once complete
// the sequeence
//   segments 

function createSequence() {

}

function userActionClick(element) {
  // run through the sequence as the user clicks
  let segment = '';
  for (let i = 0; i < segments.length; i += 1) {
    for (let j = 0; j < segments[i].length; j += 1) {
      if (segments[i][j].row === element.row && segments[i][j].column === element.column) {
        segment = i;
        break;
      }
    }
  }
  console.log(segment);
}

function init() {
  //createSequence();
  for (let i = 0; i < segments.length; i += 1) {
    for (let j = 0; j < segments[i].length; j += 1) {
      let row = segments[i][j].row;
      let column = segments[i][j].column;
      fillBox(grid[row][column], segmentColours[i]);
    }
  }
}

function update() {
  if (loose === true) {
    // Crashed!
    // Flush the screen.
    cls();
    // Display the score.
    displayScore(score);
    // Reset some variables.
    score = 0;




    // Turn off the win state.
    loose = false;
    return;
  }

}

function draw() {
//  cls();
}
