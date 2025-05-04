// Set up variables for the game.
let loose = false;

let segments = [];
segments[0] = [
  { row: 0, column: 0, },
  { row: 0, column: 1, },
  { row: 1, column: 0, },
];
segments[1] = [
  { row: 2, column: 0, },
  { row: 3, column: 0, },
  { row: 3, column: 1, },
];
segments[2] = [
  { row: 0, column: 2, },
  { row: 0, column: 3, },
  { row: 1, column: 3, },
];
segments[3] = [
  { row: 2, column: 3, },
  { row: 3, column: 2, },
  { row: 3, column: 3, },
];
segments[4] = [
  { row: 1, column: 1, },
  { row: 1, column: 2, },
  { row: 2, column: 1, },
  { row: 2, column: 2, },
];

let segmentColours = [
  {
    active: 'blue',
    inactive: 'navy',
  },
  {
    active: 'yellow',
    inactive: 'olive',
  },
  {
    active: 'red',
    inactive: 'maroon',
  },
  {
    active: 'lime',
    inactive: 'green',
  },
  {
    active: 'fuchsia',
    inactive: 'purple',
  },
];

let sequence = [];
let position = 1;

const defaultLightUpInterval = 30;
let lightUpInterval = defaultLightUpInterval;

let selectedSegment = undefined;

//start sequence
//increse sequence
//play sequence turn off user intreqctio n then turn it on again once complete
// the sequeence
//   segments 

function createSequence() {
  sequence = [];
  for (let i = 0; i < 5; i += 1) {
    sequence.push(Math.floor(Math.random() * 5));
  }
}

function userActionClick(element) {
  lightUpInterval = defaultLightUpInterval;

  // run through the sequence as the user clicks
  for (let i = 0; i < segments.length; i += 1) {
    for (let j = 0; j < segments[i].length; j += 1) {
      if (segments[i][j].row === element.row && segments[i][j].column === element.column) {
        selectedSegment = i;
        break;
      }
    }
  }

  // colour = segmentColours[segment]['active']

  // for (let j = 0; j < segments[segment].length; j += 1) {
  //   let row = segments[segment][j].row;
  //   let column = segments[segment][j].column;
  //   fillBox(grid[row][column], segmentColours[segment]['active']);
  // }

  //console.log(segment);
}

function drawSegments() {
  for (let i = 0; i < segments.length; i += 1) {
    if (selectedSegment === i) {
      colourSegment(segments[i], segmentColours[i]['active']);
    } else {
      colourSegment(segments[i], segmentColours[i]['inactive']);
    }
    //    for (let j = 0; j < segments[i].length; j += 1) {
    //let row = segments[i][j].row;
    //let column = segments[i][j].column;
    //if (selectedSegment === i) {
    //  fillBox(grid[row][column], segmentColours[i]['active']);
    //}
    //else {
    //  fillBox(grid[row][column], segmentColours[i]['inactive']);
    //}
    //  }
  }
}


function init() {
  createSequence();
  console.log(sequence);
  drawSegments();
}

function update(delta) {
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

function colourSegment(segment, colour) {
  for (let i = 0; i < segment.length; i += 1) {
    let row = segment[i].row;
    let column = segment[i].column;
    fillBox(grid[row][column], colour);
  }
}

function playSequence() {
  removeClickListener();

  for (let sequencePosition = 0; sequencePosition < position; sequencePosition += 1) {

    let segment = segments[sequence[sequencePosition]];

    colourSegment(segment, segmentColours[sequence[sequencePosition]]['inactive']);
    
    // remove user interaction

    
    colourSegment(segment, segmentColours[sequence[sequencePosition]]['active']);

    // pause the game
    wait(100);

    // for (let i = 0; i < segments.length; i += 1) {
    //   for (let j = 0; j < segments[i].length; j += 1) {
    //     let row = segments[i][j].row;
    //     let column = segments[i][j].column;
    //     if (sequence[sequencePosition] === i) {
    //       fillBox(grid[row][column], segmentColours[i]['active']);
    //     }
    //     else {
    //       fillBox(grid[row][column], segmentColours[i]['inactive']);
    //     }
    //   }
    // }
  }

  addClickListener();
}

function draw(delta) {
  drawSegments();

  playSequence();


  lightUpInterval -= (delta * 60);

  if (lightUpInterval <= 0) {
    selectedSegment = undefined
    lightUpInterval = defaultLightUpInterval;
  }
}
