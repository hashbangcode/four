// Set up variables for the fox game.
let loose = false;
let foxtimeout;
let playercoordinates = {};
let foodcoordinates = {};
let foxcoordinates = {};

function placeFood() {
  foodcoordinates = {};
  while (typeof foodcoordinates.column === 'undefined') {
    const random = randomElement();
    if (random.column === playercoordinates.column && random.row === playercoordinates.row) {
      continue;
    }
    if (random.column === foxcoordinates.column && random.row === foxcoordinates.row) {
      continue;
    }
    foodcoordinates = { column: random.column, row: random.row };
  }
}

function placeFox(gamegrid) {
  foxcoordinates - {};
  while (typeof foxcoordinates.column === 'undefined') {
    const random = randomElement();
    if (random.column === playercoordinates.column && random.row === playercoordinates.row) {
      continue;
    }
    if (random.column === foodcoordinates.column && random.row === foodcoordinates.row) {
      continue;
    }
    if ((random.column === (playercoordinates.column + 1)
        || random.column === (playercoordinates.column - 1))
        && ((random.row === (playercoordinates.row + 1)
        || random.row === (playercoordinates.row - 1)))) {
      continue;
    }
    foxcoordinates = { column: random.column, row: random.row };
  }
}

function placePlayer() {
  playercoordinates = {};
  while (typeof playercoordinates.column === 'undefined') {
    const random = randomElement();
    if (random.column === foxcoordinates.column && random.row === foxcoordinates.row) {
      continue;
    }
    if (random.column === foodcoordinates.column && random.row === foodcoordinates.row) {
      continue;
    }
    playercoordinates = { column: random.column, row: random.row };
  }
}

function moveFox() {
  foxtimeout = setTimeout(moveFox, Math.max(2000 - (score * 100), 250));

  if (foxcoordinates.row < playercoordinates.row) {
    foxcoordinates.row += 1;
    return;
  }
  if (foxcoordinates.row > playercoordinates.row) {
    foxcoordinates.row -= 1;
    return;
  }
  if (foxcoordinates.column < playercoordinates.column) {
    foxcoordinates.column += 1;
    return;
  }
  if (foxcoordinates.column > playercoordinates.column) {
    foxcoordinates.column -= 1;
  }
}

function userActionKeyPress(direction) {
  switch (direction) {
    case KEYPRESS_LEFT:
      if (playercoordinates.column >= 1) {
        playercoordinates.column -= 1;
      }
      break;
    case KEYPRESS_UP:
      if (playercoordinates.row >= 1) {
        playercoordinates.row -= 1;
      }
      break;
    case KEYPRESS_RIGHT:
      if (playercoordinates.column < 3) {
        playercoordinates.column += 1;
      }
      break;
    case KEYPRESS_DOWN:
      if (playercoordinates.row < 3) {
        playercoordinates.row += 1;
      }
      break;
    default:
      // Do nothing.
      break;
  }
  if (typeof foxtimeout !== 'number') {
    foxtimeout = setTimeout(moveFox, 2000);
  }
}

function init() {
  placePlayer();
  placeFood();
  placeFox();
}

function update() {
  if (loose === true) {
    // Crashed!
    // Reset the fox timeout.
    clearTimeout(foxtimeout);
    foxtimeout = undefined;

    // Flush the screen.
    cls();
    // Display the score.
    displayScore(score);
    // Reset some variables.
    score = 0;

    placePlayer();
    placeFood();
    placeFox();

    // Turn off the win state.
    loose = false;
    return;
  }

  if (foxcoordinates.column === playercoordinates.column
    && foxcoordinates.row === playercoordinates.row) {
    loose = true;
    return;
  }
  if (foodcoordinates.column === playercoordinates.column
    && foodcoordinates.row === playercoordinates.row) {
    placeFood();
    score += 1;
  }
}

function draw() {
  cls();
  for (let i = 0; i < gridMaxX; i += 1) {
    for (let j = 0; j < gridMaxY; j += 1) {
      const element = grid[i][j];
      if (element.column === playercoordinates.column && element.row === playercoordinates.row) {
        fillBox(element, 'black');
      }
      if (element.column === foodcoordinates.column && element.row === foodcoordinates.row) {
        fillBox(element, 'green');
      }
      if (element.column === foxcoordinates.column && element.row === foxcoordinates.row) {
        fillBox(element, 'red');
      }
    }
  }
}
