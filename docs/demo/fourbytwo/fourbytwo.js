// Set up variables for the memory game.
let win = false;
let selectedBoxes = [];
let foundPairs = [];

// Define a user action against a given box.
function userActionClick(box) {
  for (let i = 0; i < foundPairs.length; i += 1) {
    if (box.colour === foundPairs[i].colour) {
      // Don't select already selected colours.
      return;
    }
  }

  if (selectedBoxes.length > 0) {
    if (selectedBoxes[0].x === box.x && selectedBoxes[0].y === box.y) {
      // Don't allow found colour to be selected twice.
      return;
    }
  }

  // Push the user's selection into the selected boxes array.
  selectedBoxes.push(box);

  // Clear out the game grid and add the existing colours.

  if (selectedBoxes.length === 1) {
    // This is the first selection the user made, draw the colour.
    fillBox(selectedBoxes[0], selectedBoxes[0].colour);
    return;
  }

  if (selectedBoxes.length === 2) {
    // This is a full selection, so increase the score and find out if the colours match
    score += 1;

    if (selectedBoxes[0].colour === selectedBoxes[1].colour) {
      foundPairs.push(selectedBoxes[0]);
      foundPairs.push(selectedBoxes[1]);
    }

    fillBox(selectedBoxes[0], selectedBoxes[0].colour);
    fillBox(selectedBoxes[1], selectedBoxes[1].colour);
    wait(500);
    selectedBoxes = [];

    if (foundPairs.length === (gridMaxX * gridMaxY)) {
      win = true;
    }
  }
}

// Load in the canvas element and set up the game.
function randomiseColours() {
  let colours = [
    'blue',
    'cyan',
    'darkorange',
    'red',
    'black',
    'green',
    'purple',
    'yellow',
  ];

  colours = colours.slice(0, (gridMaxX * gridMaxY) / 2);
  colours = colours.map((item) => [item, item]).reduce((a, b) => a.concat(b));

  shuffle(colours);

  for (let i = 0; i < gridMaxX; i += 1) {
    for (let j = 0; j < gridMaxY; j += 1) {
      grid[i][j].colour = colours.shift();
    }
  }
}

function init() {
  randomiseColours();
}

function update() {
  if (win === true) {
    // We have a winner!
    // flush the screen.
    cls();
    // Display the score.
    displayScore(score);
    // Reset some variables.
    score = 0;
    selectedBoxes = [];
    foundPairs = [];

    // Reset the game grid.
    randomiseColours();

    // Turn off the win state.
    win = false;
  }
}

function draw() {
  cls();
  for (let i = 0; i < foundPairs.length; i += 1) {
    fillBox(foundPairs[i], foundPairs[i].colour);
  }
  for (let i = 0; i < selectedBoxes.length; i += 1) {
    fillBox(selectedBoxes[i], selectedBoxes[i].colour);
  }
}
