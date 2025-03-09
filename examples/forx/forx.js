// Set up variables for the fox game.
var loose = false;
var foxtimeout = undefined;
var playercoordinates = {};
var foodcoordinates = {};
var foxcoordinates = {};

function placeFood() {
    while (true) {
        let random = randomElement();
        if (random.column === playercoordinates.column && random.row === playercoordinates.row) {
            continue;
        }
        if (random.column === foxcoordinates.column && random.row === foxcoordinates.row) {
            continue;
        }
        foodcoordinates = { column: random.column, row: random.row };
        return;
    }
}

function placeFox(gamegrid) {
    while (true) {
        let random = randomElement();
        if (random.column === playercoordinates.column && random.row === playercoordinates.row) {
            continue;
        }
        if (random.column === foodcoordinates.column && random.row === foodcoordinates.row) {
            continue;
        }
        if (random.column === (playercoordinates.column + 1) || random.column === (playercoordinates.column - 1)
            && (random.row === (playercoordinates.row + 1) || random.row === (playercoordinates.row - 1))) {
            continue;
        }
        foxcoordinates = { column: random.column, row: random.row };
        return;
    }
}

function placePlayer() {
    while (true) {
        let random = randomElement();
        if (random.column === foxcoordinates.column && random.row === foxcoordinates.row) {
            continue;
        }
        if (random.column === foodcoordinates.column && random.row === foodcoordinates.row) {
            continue;
        }
        playercoordinates = { column: random.column, row: random.row };
        return;
    }
}

function userActionKeyPress(direction) {

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

    if (foxcoordinates.column === playercoordinates.column && foxcoordinates.row === playercoordinates.row) {
        loose = true;
        return;
    }
    if (foodcoordinates.column === playercoordinates.column && foodcoordinates.row === playercoordinates.row) {
        placeFood();
        score++;
    }
    
}

function draw() {
    cls();
    for (let i = 0; i < gridMaxX; i++) {
        for (let j = 0; j < gridMaxY; j++) {
            let element = grid[i][j];
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
