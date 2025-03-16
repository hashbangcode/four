// Set up variables for the forward game.
let loose = false;
let playercoordinates = {};
let wallTimeout;

const shapes = [];
shapes[0] = [
  0,
  1,
  1,
  1,
];
shapes[1] = [
  1,
  0,
  1,
  1,
];
shapes[2] = [
  1,
  1,
  0,
  1,
];
shapes[3] = [
  1,
  1,
  1,
  0,
];

let wallIsActive = false;
let wall = [];
let wallCoordinates;

function moveWall() {
  wallTimeout = setTimeout(moveWall, Math.max(1000 - (score * 100), 250));
  if (wallIsActive) {
    if (wallCoordinates === -1) {
      wallIsActive = false;
      score += 1;
    } else {
      wallCoordinates -= 1;
    }
  } else {
    const randomIndex = Math.floor(Math.random() * shapes.length);
    wall = shapes[randomIndex];
    wallCoordinates = gridMaxX - 1;
    wallIsActive = true;
  }
}

function placePlayer() {
  playercoordinates = { column: 0, row: 2 };
  if (typeof wallTimeout !== 'number') {
    wallTimeout = setTimeout(moveWall, 1000);
  }
}

function userActionKeyPress(direction) {
  switch (direction) {
    case KEYPRESS_UP:
      if (playercoordinates.row >= 1) {
        playercoordinates.row -= 1;
      }
      break;
    case KEYPRESS_DOWN:
      if (playercoordinates.row < 3) {
        playercoordinates.row += 1;
      }
      break;
  }
}

function init() {
  placePlayer();
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
    // Set the game up again.
    placePlayer();

    // Turn off the win state.
    loose = false;
    return;
  }

  for (let i = 0; i < gridMaxX; i += 1) {
    for (let j = 0; j < gridMaxY; j += 1) {
      const element = grid[i][j];
      if (element.column === wallCoordinates) {
        for (let wallpart = 0; wallpart < wall.length; wallpart += 1) {
          if (wall[wallpart] === 1 && element.row === wallpart) {
            if (element.column === playercoordinates.column 
                && element.row === playercoordinates.row) {
              loose = true;
              return;
            }
          }
        }
      }
    }
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
      if (element.column === wallCoordinates) {
        for (let wallpart = 0; wallpart < wall.length; wallpart += 1) {
          if (wall[wallpart] === 1 && element.row === wallpart) {
            fillBox(element, 'green');
          }
        }
      }
    }
  }
}
