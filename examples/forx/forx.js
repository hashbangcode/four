// Set up variables for the fox game.
var loose = false;
var foxtimeout = undefined;
var playercoordinates = {};
var foodcoordinates = {};
var foxcoordinates = {};

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

function moveFox() {
    foxtimeout = setTimeout(moveFox, Math.max(2000 - (score * 100), 250));
    for (let b = 0; b < boxes.length; b++) {
        if (boxes[b].column === foxcoordinates.column && boxes[b].row === foxcoordinates.row) {
            fillBox(boxes[b], 'white');
        }
    }

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

function init() {
    placePlayer(boxes);
    placeFood(boxes);
    placeFox(boxes);
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
    }
}

function draw() {
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
