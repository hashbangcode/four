
// Set up variables for the memory game.
var win = false;
var score = 0;
var selectedBoxes = [];
var foundPairs = [];

// Set the game up.
function setupGame(boxes) {
  if (boxes.length === 0) {
    // The boxes haven't been set yet, so do this.
    drawGrid(true);
  }

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

  colours = colours.slice(0, boxes.length / 2);
  colours = colours.map(function (item) {
    return [item, item];
  }).reduce(function (a, b) { return a.concat(b) });

  shuffle(colours);

  boxes.forEach(function (element) {
    element.colour = colours.shift();
  });
}

// Define a user action against a given box.
function userActionClick(box) {
  for (let i = 0; i < foundPairs.length; i++) {
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
  cls();
  for (let i = 0; i < foundPairs.length; i++) {
    fillBox(foundPairs[i], foundPairs[i].colour);
  }

  if (selectedBoxes.length === 1) {
    // This is the first selection the user made, draw the colour.
    fillBox(selectedBoxes[0], selectedBoxes[0].colour);
    return;
  }

  if (selectedBoxes.length === 2) {
    // This is a full selection, so increase the score and find out if the colours match
    score++;

    if (selectedBoxes[0].colour === selectedBoxes[1].colour) {
      foundPairs.push(selectedBoxes[0]);
      foundPairs.push(selectedBoxes[1]);
    }

    fillBox(selectedBoxes[0], selectedBoxes[0].colour);
    fillBox(selectedBoxes[1], selectedBoxes[1].colour);

    selectedBoxes = [];

    if (foundPairs.length === boxes.length) {
      win = true;
    }
  }
}

// Load in the canvas element and set up the game.
window.onload = function () {
  canvas = document.getElementById('gc');
  ctx = canvas.getContext('2d');

  width = canvas.width;
  height = canvas.height;

  addClickListener();
  setupGame(boxes);

  // Run game loop.
  setInterval(gameLoop, 100);
}

// The game loop
// In this case we are checking for a win condition and reacting to that.
function gameLoop() {
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
    // Set the game up again.
    setupGame(boxes);
    // Turn off the win state.
    win = false;
  }
}
   