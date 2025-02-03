// Set up variables for the forward game.
var loose = false;
var playercoordinates = {};
var gravityTimeout = undefined;
var wallTimeout = undefined;

let shapes = [];
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

// Set the game up.
function setupGame(boxes) {
    if (boxes.length === 0) {
        // The boxes haven't been set yet, so do this.
        drawGrid(true);
    }
}

function placePlayer(boxes) {
    playercoordinates = { column: 0, row: 2 };
    if (typeof wallTimeout !== "number") {
        wallTimeout = setTimeout(moveWall, 1000);
    }
}

var wallIsActive = false;
var wall = [];
var wallCoordinates = undefined;

function moveWall() {
    wallTimeout = setTimeout(moveWall, Math.max(1000 - (score * 100), 250));
    console.log(wallCoordinates);
    if (wallIsActive) {
        if (wallCoordinates == -1) {
            wallIsActive = false;
            score++;
        } else {
            wallCoordinates = wallCoordinates - 1;
        }
    } else {
        let randomIndex = Math.floor(Math.random() * shapes.length)
        wall = shapes[randomIndex];
        wallCoordinates = gridMaxX - 1;
        wallIsActive = true;
    }
}

function userActionKeyPress(direction) {
    for (let b = 0; b < boxes.length; b++) {
        if (boxes[b].column === playercoordinates.column && boxes[b].row === playercoordinates.row) {
            fillBox(boxes[b], 'white');
        }
    }
    switch (direction) {
        case KEYPRESS_UP:
            if (playercoordinates.row >= 1) {
                playercoordinates.row = playercoordinates.row - 1;
            }
            break;
        case KEYPRESS_DOWN:
            if (playercoordinates.row < 3) {
                playercoordinates.row = playercoordinates.row + 1;
            }
            break;
    }
}

// Load in the canvas element and set up the game.
window.onload = function () {
    canvas = document.getElementById('gc');
    ctx = canvas.getContext('2d');

    width = canvas.width;
    height = canvas.height;

    addKeyListener();
    setupGame(boxes);

    placePlayer(boxes);

    // Run game loop.
    setInterval(gameLoop, 100);
}

// The game loop
// In this case we are checking for a win condition and reacting to that.
function gameLoop() {
    if (frames.length > 0) {
        // Don't do anything whilst we are animating.
        return;
    }
    drawGrid();
    if (loose === true) {
        // Crashed!
        // Flush the screen.
        cls();
        // Display the score.
        displayScore(score);
        // Reset some variables.
        score = 0;
        // Set the game up again.
        setupGame(boxes);
        placePlayer(boxes);

        // Turn off the win state.
        loose = false;
    }
    else {
        cls();
        for (let b = 0; b < boxes.length; b++) {
            if (boxes[b].column === playercoordinates.column && boxes[b].row === playercoordinates.row) {
                fillBox(boxes[b], 'black');
            }
            if (boxes[b].column === wallCoordinates) {
                for (let wallpart = 0; wallpart < wall.length; wallpart++) {
                    if (wall[wallpart] == 1 && boxes[b].row == wallpart) {
                        fillBox(boxes[b], 'green');
                        if (boxes[b].column === playercoordinates.column && boxes[b].row === playercoordinates.row) {
                            loose = true;
                        }
                    }
                }
            }
        }
    }
}
