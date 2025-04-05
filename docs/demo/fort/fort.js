// Set up variables for the game.
let loose = false;
let greenSpots = [];
let redSpots = [];

const defaultDecayInterval = 60;
let decayInterval = defaultDecayInterval;

const defaultPlaceInterval = 60;
let placeInterval = defaultDecayInterval;

function placeGreen() {
  if (greenSpots.length > score) {
    return;
  }
  if (redSpots.length + greenSpots.length > 13) {
    return;
  }
  let greencoordinates = {};
  placeGreenLoop: while (typeof greencoordinates.column === 'undefined') {
    const random = randomElement();
    for (let g = 0; g < greenSpots.length; g += 1) {
      if (greenSpots[g].column === random.column && greenSpots[g].row === random.row) {
        continue placeGreenLoop;
      }
    }
    for (let g = 0; g < redSpots.length; g += 1) {
      if (redSpots[g].column === random.column && redSpots[g].row === random.row) {
        continue placeGreenLoop;
      }
    }
    const randomHealth = randomRange(1, 15);
    greencoordinates = { column: random.column, row: random.row, health: randomHealth };
  }
  greenSpots.push(greencoordinates);
}

function placeRed() {
  if (redSpots.length > score) {
    return;
  }
  if (redSpots.length + greenSpots.length > 13) {
    return;
  }
  let redcoordinates = {};
  placeRedLoop: while (typeof redcoordinates.column === 'undefined') {
    const random = randomElement();
    for (let g = 0; g < greenSpots.length; g += 1) {
      if (greenSpots[g].column === random.column && greenSpots[g].row === random.row) {
        continue placeRedLoop;
      }
    }
    for (let g = 0; g < redSpots.length; g += 1) {
      if (redSpots[g].column === random.column && redSpots[g].row === random.row) {
        continue placeRedLoop;
      }
    }
    const randomHealth = randomRange(2, 20);
    redcoordinates = { column: random.column, row: random.row, health: randomHealth };
  }
  redSpots.push(redcoordinates);
}

function userActionClick(element) {
  for (let g = 0; g < greenSpots.length; g += 1) {
    if (greenSpots[g].column === element.column && greenSpots[g].row === element.row) {
      greenSpots.splice(g, 1);
      score += 1;
    }
  }
  for (let g = 0; g < redSpots.length; g += 1) {
    if (redSpots[g].column === element.column && redSpots[g].row === element.row) {
      loose = true;
    }
  }
}

// Decrease the health of all counters. If any counter reaches 0 then remove it from the grid.
function decreaseHealth() {
  for (let g = 0; g < greenSpots.length; g += 1) {
    greenSpots[g].health -= 1;
    if (greenSpots[g].health === 0) {
      greenSpots.splice(g, 1);
    }
  }
  for (let r = 0; r < redSpots.length; r += 1) {
    redSpots[r].health -= 1;
    if (redSpots[r].health === 0) {
      redSpots.splice(r, 1);
    }
  }
}

function init() {
  placeGreen();
  placeRed();
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

    greenSpots = [];
    redSpots = [];

    decayInterval = defaultDecayInterval;
    placeInterval = defaultPlaceInterval;

    placeGreen();
    placeRed();

    // Turn off the win state.
    loose = false;
    return;
  }

  decayInterval -= (delta * 60);

  if (decayInterval <= 0) {
    decreaseHealth();
    decayInterval = Math.max(5, defaultDecayInterval - score);
  }

  placeInterval -= (1 + delta);
  if (placeInterval <= 0) {
    // Randomly place a counter.
    let actions = [
      placeGreen,
      placeRed,
    ];
    shuffle(actions);
    actions[0]();
    placeInterval = Math.max(5, defaultPlaceInterval - score);
  }
}

function draw(delta) {
  cls();
  for (let i = 0; i < gridMaxX; i += 1) {
    for (let j = 0; j < gridMaxY; j += 1) {
      const element = grid[i][j];
      for (let g = 0; g < greenSpots.length; g += 1) {
        if (greenSpots[g].column === element.column && greenSpots[g].row === element.row) {
          fillBox(element, 'green');
        }
      }
      for (let g = 0; g < redSpots.length; g += 1) {
        if (redSpots[g].column === element.column && redSpots[g].row === element.row) {
          fillBox(element, 'red');
        }
      }
    }
  }
}
