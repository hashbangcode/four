// The width of the canvas.
var width;
// The height of the canvas.
var height;

// Set the grid dimensions.
const gridMaxX = 4;
const gridMaxY = 4;

var grid = [];

var gameloopId = undefined;

// Define animation settings.
var frameCounter = 0;
var frames = [];

var score = 0;

// Define the characters to display.
let numbers = [];
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
    grid = new Array();
    for (let i = 0; i < gridMaxX; i++) {
        grid[i] = new Array();
        column = 0;
        let y = i * (width / gridMaxY);
        for (let j = 0; j < gridMaxY; j++) {
            let x = j * (width / gridMaxY);
            let rectWidth = width / gridMaxY;
            let rectHeight = height / gridMaxY;
            grid[i][j] = {
                column: j,
                row: i,
                x: x,
                y: y,
                width: rectWidth,
                height: rectHeight
            };
        }
    }
}

// Draw the grid.
function drawGrid() {
    for (let i = 0; i < gridMaxX; i++) {
        let y = i * (width / gridMaxY);
        for (let j = 0; j < gridMaxY; j++) {
            let x = j * (width / gridMaxY);
            let rectWidth = width / gridMaxY;
            let rectHeight = height / gridMaxY;
            ctx.strokeRect(x, y, rectWidth, rectHeight);
        }
    }
}

// Add event listener for `click` events.
function addClickListener() {
    canvas.addEventListener("click", canvasClick, false);
}

// Handle the canvas click event and pass onto a custom handle function along the box that was clicked.
function canvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left,
        y = event.clientY - rect.top;

    // Collision detection between clicked offset and element.

    for (let i = 0; i < gridMaxX; i++) {
        for (let j = 0; j < gridMaxY; j++) {
            let element = grid[i][j];
            if (
                y > element.y &&
                y < element.y + element.height &&
                x > element.x &&
                x < element.x + element.width
            ) {
                if (typeof userActionClick === 'function') {
                    userActionClick(element);
                }
                return false;
            }
        }
    }
}

function addKeyListener() {
    document.addEventListener('keydown', keyPress, false);
}

function removeKeyListener() {
    document.removeEventListener('keydown', keyPress, false);
}

const KEYPRESS_UP = 'up';
const KEYPRESS_DOWN = 'down';
const KEYPRESS_LEFT = 'left';
const KEYPRESS_RIGHT = 'right';

function keyPress(evt) {
    if (typeof userActionKeyPress !== 'function') {
        return;
    }
    switch (evt.keyCode) {
        case 37:
            userActionKeyPress(KEYPRESS_LEFT);
            break;
        case 38:
            userActionKeyPress(KEYPRESS_UP);
            break;
        case 39:
            userActionKeyPress(KEYPRESS_RIGHT);
            break;
        case 40:
            userActionKeyPress(KEYPRESS_DOWN);
            break;
    }
}

// Shuffle an array.
function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

// Display the score in the game grid.
function displayScore(score) {
    removeKeyListener();
    const arrayColumn = (arr, n) => arr.map(x => x[n]);

    // Convert score into a string and add start and end buffers.
    score = ' ' + score.toString() + ' ';

    let convertedScore = [];

    for (let i = 0; i < score.toString().length; i++) {
        let character = numbers[score[i]];
        for (let j = 0; j < character[0].length; j++) {
            convertedScore.push(arrayColumn(character, j));
        }
        if (score[i] !== ' ') {
            // Single row buffer between each character.
            convertedScore.push([0, 0, 0, 0]);
        }
    }

    // Convert string into an array of elements.
    for (let i = 0; i < convertedScore.length - 4; i++) {
        let frame = [];

        frame.push(convertedScore[i]);
        frame.push(convertedScore[i + 1]);
        frame.push(convertedScore[i + 2]);
        frame.push(convertedScore[i + 3]);

        frames.push(frame);
    }

    frameCounter = 0;
    setTimeout(animateScore, 250);
}

function randomElement() {
    let randomX = Math.floor(Math.random() * gridMaxX);
    let randomY = Math.floor(Math.random() * gridMaxY);
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

    for (let i = 0; i < frames[frameCounter].length; i++) {
        for (let j = 0; j < frames[frameCounter][i].length; j++) {
            if (frames[frameCounter][i][j] === 1) {
                // Yes, we use j and i backwards here as we want to 
                // print the text scrolling across, rather than up.
                fillBox(grid[j][i], 'black');
            }
        }
    }

    frameCounter++;
    setTimeout(animateScore, 250);
}

// Flash the game area with a colour and re-draw the grid.
function flashGrid(colour) {
    ctx.beginPath();
    ctx.fillStyle = colour;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // After 50 milliseconds, clear the screen and re-draw the grid.
    setTimeout(function () {
        cls();
    }, 50);
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

// Load in the canvas element and set up the game.
window.onload = function () {
    canvas = document.getElementById('four');
    ctx = canvas.getContext('2d');
  
    width = canvas.width;
    height = canvas.height;
  
    addClickListener();
    addKeyListener();
  
    setupGrid();
    drawGrid();

    if (typeof init === "function") {
        init();
    }

    gameloopId = setInterval(gameLoop, 100);
}

function wait(seconds) {
    clearInterval(gameloopId);
    gameloopId = setInterval(gameLoop, seconds);
}

// The game loop, where we define our custom functions.
function gameLoop() {

    if (frames.length === 0) {
        draw();
        update();
    }

    drawGrid();
}