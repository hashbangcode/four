// The width of the canvas.
let width;
// The height of the canvas.
let height;

// Set the grid dimensions.
const gridMaxX = 4;
const gridMaxY = 4;

// The game grid.
let grid = [];

// The game loop timer ID.
let gameloopId;

// Define animation settings.
let frameCounter = 0;
let frames = [];

// The current score.
let score = 0;

// The canvas context object.
let ctx;

// Constants for detecting directions.
const KEYPRESS_UP = 'up';
const KEYPRESS_DOWN = 'down';
const KEYPRESS_LEFT = 'left';
const KEYPRESS_RIGHT = 'right';

// Define the characters to display.
const numbers = [];
numbers[' '] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
numbers[0] = [
  [1, 1, 1, 1],
  [1, 0, 0, 1],
  [1, 0, 0, 1],
  [1, 1, 1, 1],
];
numbers[1] = [
  [0, 0, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 1, 0],
];
numbers[2] = [
  [0, 1, 1, 0],
  [1, 0, 0, 1],
  [0, 0, 1, 0],
  [0, 1, 1, 1],
];
numbers[3] = [
  [1, 1, 1, 0],
  [0, 1, 1, 1],
  [0, 0, 0, 1],
  [1, 1, 1, 0],
];
numbers[4] = [
  [1, 0, 0, 0],
  [1, 0, 1, 0],
  [1, 1, 1, 1],
  [0, 0, 1, 0],
];
numbers[5] = [
  [1, 1, 1, 1],
  [1, 1, 0, 0],
  [0, 0, 1, 0],
  [1, 1, 1, 0],
];
numbers[6] = [
  [0, 1, 1, 0],
  [1, 0, 0, 0],
  [1, 1, 1, 0],
  [1, 1, 1, 0],
];
numbers[7] = [
  [1, 1, 1, 1],
  [0, 0, 0, 1],
  [0, 0, 1, 0],
  [0, 1, 0, 0],
];
numbers[8] = [
  [0, 1, 1, 0],
  [1, 1, 1, 1],
  [1, 0, 0, 1],
  [0, 1, 1, 0],
];
numbers[9] = [
  [0, 1, 1, 1],
  [0, 1, 0, 1],
  [0, 1, 1, 1],
  [0, 0, 0, 1],
];

// Set up the game grid.
function setupGrid() {
  grid = [];
  for (let i = 0; i < gridMaxX; i += 1) {
    grid[i] = [];
    column = 0;
    const yCoord = i * (width / gridMaxY);
    for (let j = 0; j < gridMaxY; j += 1) {
      const xCoord = j * (width / gridMaxY);
      const rectWidth = width / gridMaxY;
      const rectHeight = height / gridMaxY;
      grid[i][j] = {
        column: j,
        row: i,
        x: xCoord,
        y: yCoord,
        width: rectWidth,
        height: rectHeight,
      };
    }
  }
  return grid;
}

// Draw the grid.
function drawGrid() {
  for (let i = 0; i < gridMaxX; i += 1) {
    const y = i * (width / gridMaxY);
    for (let j = 0; j < gridMaxY; j += 1) {
      const x = j * (width / gridMaxY);
      const rectWidth = width / gridMaxY;
      const rectHeight = height / gridMaxY;
      ctx.strokeRect(x, y, rectWidth, rectHeight);
    }
  }
}

// Fix a box with a colour.
function fillBox(box, colour) {
  ctx.beginPath();
  ctx.fillStyle = colour;
  ctx.fillRect(box.x, box.y, box.width, box.height);
}

// Clear the screen and redraw the grid.
function cls() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
}

// Flash the game area with a colour and re-draw the grid.
function flashGrid(colour) {
  ctx.beginPath();
  ctx.fillStyle = colour;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // After 50 milliseconds, clear the screen and re-draw the grid.
  setTimeout(() => {
    cls();
  }, 50);
}

// Handle the canvas click event and pass onto a custom handle function
// along the box that was clicked.
function canvasClick(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Collision detection between clicked offset and element.
  for (let i = 0; i < gridMaxX; i += 1) {
    for (let j = 0; j < gridMaxY; j += 1) {
      const element = grid[i][j];
      if (
        y > element.y
                && y < element.y + element.height
                && x > element.x
                && x < element.x + element.width
      ) {
        if (typeof userActionClick === 'function') {
          userActionClick(element);
        }
        return false;
      }
    }
  }
  return false;
}

// Add event listener for `click` events.
function addClickListener() {
  canvas.addEventListener('click', canvasClick, false);
}

// Convert the keypress into directions and pass them upstream.
function keyPress(event) {
  if (typeof userActionKeyPress !== 'function') {
    return;
  }

  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(event.code) > -1) {
    event.preventDefault();
  }

  switch (event.code) {
    case 'ArrowLeft':
    case 'KeyA':
      userActionKeyPress(KEYPRESS_LEFT);
      break;
    case 'ArrowUp':
    case 'KeyW':
      userActionKeyPress(KEYPRESS_UP);
      break;
    case 'ArrowRight':
    case 'KeyD':
      userActionKeyPress(KEYPRESS_RIGHT);
      break;
    case 'ArrowDown':
    case 'KeyS':
      userActionKeyPress(KEYPRESS_DOWN);
      break;
    default:
      // Do nothing.
  }
}

// Add an event listener for key down events.
function addKeyListener() {
  document.addEventListener('keydown', keyPress, false);
}

// Remove the event listener for key down events.
function removeKeyListener() {
  document.removeEventListener('keydown', keyPress, false);
}

// Shuffle an array.
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

// Generate a random number between two values.
function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Get a random element from the grid.
function randomElement() {
  const randomX = Math.floor(Math.random() * gridMaxX);
  const randomY = Math.floor(Math.random() * gridMaxY);
  return grid[randomX][randomY];
}

// Animate the score.
function animateScore() {
  cls();

  if (frameCounter >= frames.length) {
    frames = [];
    flashGrid('black');
    addKeyListener();
    return;
  }

  for (let i = 0; i < frames[frameCounter].length; i += 1) {
    for (let j = 0; j < frames[frameCounter][i].length; j += 1) {
      if (frames[frameCounter][i][j] === 1) {
        // Yes, we use j and i backwards here as we want to
        // print the text scrolling across, rather than up.
        fillBox(grid[j][i], 'black');
      }
    }
  }

  frameCounter += 1;
  setTimeout(animateScore, 250);
}

// Display the score in the game grid.
function displayScore(passedScore) {
  removeKeyListener();
  const arrayColumn = (arr, n) => arr.map((x) => x[n]);

  // Convert score into a string and add start and end buffers.
  const scoreString = ` ${passedScore.toString()} `;

  const convertedScore = [];

  for (let i = 0; i < scoreString.length; i += 1) {
    const character = numbers[scoreString[i]];
    for (let j = 0; j < character[0].length; j += 1) {
      convertedScore.push(arrayColumn(character, j));
    }
    if (scoreString[i] !== ' ') {
      // Single row buffer between each character.
      convertedScore.push([0, 0, 0, 0]);
    }
  }

  // Convert string into an array of elements.
  for (let i = 0; i < convertedScore.length - 4; i += 1) {
    const frame = [];

    frame.push(convertedScore[i]);
    frame.push(convertedScore[i + 1]);
    frame.push(convertedScore[i + 2]);
    frame.push(convertedScore[i + 3]);

    frames.push(frame);
  }

  frameCounter = 0;
  setTimeout(animateScore, 250);
}

// The game loop, where we define our custom functions.
function gameLoop() {
  if (frames.length === 0) {
    draw();
    update();
  }

  drawGrid();
}

// Initialise the canvas.
function initCanvas(id) {
  canvas = document.getElementById(id);
  
  canvas.style.cursor = 'crosshair';
  canvas.style.background = 'white';
  canvas.style.border = '2px solid black';
  canvas.style.margin = '0 auto 0 auto';
  canvas.style.display = 'flex';

  ctx = canvas.getContext('2d');

  width = canvas.width;
  height = canvas.height;

  addClickListener();
  addKeyListener();

  setupGrid();
  drawGrid();

  if (typeof init === 'function') {
    init();
  }

  gameloopId = setInterval(gameLoop, 100);
}

// Pause the game loop for a number of seconds and restart it.
function wait(seconds) {
  clearInterval(gameloopId);
  gameloopId = setInterval(gameLoop, seconds);
}

// Get the canvas context object of the game grid. Used for testing.
function getCanvasContextObject() {
  return ctx;
}

// Load in the canvas element and set up the game.
window.onload = function fourWindowLoad() {
  initCanvas('four');
};

if (typeof module === 'object') {
  module.exports = {
    getCanvasContextObject,
    setupGrid,
    drawGrid,
    initCanvas,
  };
}
