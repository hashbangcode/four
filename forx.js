// Set up variables for the memory game.
var loose = false;
var foxtimeout = undefined;
var playercoordinates = {};
var foodcoordinates = {};
var foxcoordinates = {};

let shapes = [];
shapes[0] = [
    [0, 0, 0, 0],
    [1, 0, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 0, 0],
];
shapes[1] = [
    [0, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

// Set the game up.
function setupGame(boxes) {
    if (boxes.length === 0) {
        // The boxes haven't been set yet, so do this.
        drawGrid(true);
    }
}

function placeFood(boxes) {
    while (true) {
        let randomIndex = Math.floor(Math.random() * boxes.length);
        if (boxes[randomIndex].column === playercoordinates.column && boxes[randomIndex].row === playercoordinates.row) {
            continue;
        }
        if (boxes[randomIndex].column === foxcoordinates.column && boxes[randomIndex].row === foxcoordinates.row) {
            continue;
        }
        foodcoordinates = { column: boxes[randomIndex].column, row: boxes[randomIndex].row };
        return;
    }
}

function placeFox(boxes) {
    while (true) {
        let randomIndex = Math.floor(Math.random() * boxes.length);
        if (boxes[randomIndex].column === playercoordinates.column && boxes[randomIndex].row === playercoordinates.row) {
            continue;
        }
        if (boxes[randomIndex].column === foodcoordinates.column && boxes[randomIndex].row === foodcoordinates.row) {
            continue;
        }
        if (boxes[randomIndex].column === (playercoordinates.column + 1) || boxes[randomIndex].column === (playercoordinates.column - 1)
            && (boxes[randomIndex].row === (playercoordinates.row + 1) || boxes[randomIndex].row === (playercoordinates.row - 1))) {
            continue;
        }
        foxcoordinates = { column: boxes[randomIndex].column, row: boxes[randomIndex].row };
        return;
    }
}

function placePlayer(boxes) {
    while (true) {
        let randomIndex = Math.floor(Math.random() * boxes.length);
        if (boxes[randomIndex].column === foxcoordinates.column && boxes[randomIndex].row === foxcoordinates.row) {
            continue;
        }
        if (boxes[randomIndex].column === foodcoordinates.column && boxes[randomIndex].row === foodcoordinates.row) {
            continue;
        }
        playercoordinates = { column: boxes[randomIndex].column, row: boxes[randomIndex].row };
        return;
    }
}

function userActionKeyPress(direction) {
    for (let b = 0; b < boxes.length; b++) {
        if (boxes[b].column === playercoordinates.column && boxes[b].row === playercoordinates.row) {
            fillBox(boxes[b], 'white');
        }
    }
    drawGrid();

    switch (direction) {
        case KEYPRESS_LEFT:
            if (playercoordinates.column >= 1) {
                playercoordinates.column = playercoordinates.column - 1;
            }
            break;
        case KEYPRESS_UP:
            if (playercoordinates.row >= 1) {
                playercoordinates.row = playercoordinates.row - 1;
            }
            break;
        case KEYPRESS_RIGHT:
            if (playercoordinates.column < 3) {
                playercoordinates.column = playercoordinates.column + 1;
            }
            break;
        case KEYPRESS_DOWN:
            if (playercoordinates.row < 3) {
                playercoordinates.row = playercoordinates.row + 1;
            }
            break;
    }
    if (typeof foxtimeout !== "number") {
        foxtimeout = setTimeout(moveFox, 2000);
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
    placeFood(boxes);
    placeFox(boxes);

    // Run game loop.
    setInterval(gameLoop, 100);
}

function moveFox() {
    foxtimeout = setTimeout(moveFox, Math.max(2000 - (score * 100), 250));
    for (let b = 0; b < boxes.length; b++) {
        if (boxes[b].column === foxcoordinates.column && boxes[b].row === foxcoordinates.row) {
            fillBox(boxes[b], 'white');
        }
    }
    drawGrid();

    if (foxcoordinates.row < playercoordinates.row) {
        foxcoordinates.row++;
        return;
    }
    if (foxcoordinates.row > playercoordinates.row) {
        foxcoordinates.row--;
        return;
    }
    if (foxcoordinates.column < playercoordinates.column) {
        foxcoordinates.column++;
        return;
    }
    if (foxcoordinates.column > playercoordinates.column) {
        foxcoordinates.column--;
        return;
    }

}

// The game loop
// In this case we are checking for a win condition and reacting to that.
function gameLoop() {
    if (frames.length > 0) {
        // Don't do anything whilst we are animating.
        return;
    }

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
        // Set the game up again.
        setupGame(boxes);

        placePlayer(boxes);
        placeFood(boxes);
        placeFox(boxes);

        // Turn off the win state.
        loose = false;
    }
    else {
        if (foxcoordinates.column === playercoordinates.column && foxcoordinates.row === playercoordinates.row) {
            loose = true;
            return;
        }
        if (foodcoordinates.column === playercoordinates.column && foodcoordinates.row === playercoordinates.row) {
            placeFood(boxes);
            score++;
        }
        for (let b = 0; b < boxes.length; b++) {
            if (boxes[b].column === playercoordinates.column && boxes[b].row === playercoordinates.row) {
                fillBox(boxes[b], 'black');
            }
            if (boxes[b].column === foodcoordinates.column && boxes[b].row === foodcoordinates.row) {
                fillBox(boxes[b], 'green');
            }
            if (boxes[b].column === foxcoordinates.column && boxes[b].row === foxcoordinates.row) {
                fillBox(boxes[b], 'red');
            }
        }
    }
}
