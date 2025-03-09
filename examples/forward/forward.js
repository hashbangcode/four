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

var wallIsActive = false;
var wall = [];
var wallCoordinates = undefined;

function placePlayer() {
    playercoordinates = { column: 0, row: 2 };
    if (typeof wallTimeout !== "number") {
        wallTimeout = setTimeout(moveWall, 1000);
    }
}

function moveWall() {
    wallTimeout = setTimeout(moveWall, Math.max(1000 - (score * 100), 250));
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

    for (let i = 0; i < gridMaxX; i++) {
        for (let j = 0; j < gridMaxY; j++) {
            let element = grid[i][j];
            if (element.column === wallCoordinates) {
                for (let wallpart = 0; wallpart < wall.length; wallpart++) {
                    if (wall[wallpart] === 1 && element.row == wallpart) {
                        if (element.column === playercoordinates.column && element.row === playercoordinates.row) {
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

    for (let i = 0; i < gridMaxX; i++) {
        for (let j = 0; j < gridMaxY; j++) {
            let element = grid[i][j];
            if (element.column === playercoordinates.column && element.row === playercoordinates.row) {
                fillBox(element, 'black');
            }
            if (element.column === wallCoordinates) {
                for (let wallpart = 0; wallpart < wall.length; wallpart++) {
                    if (wall[wallpart] === 1 && element.row == wallpart) {
                        fillBox(element, 'green');
                    }
                }
            }
        }
    }
}
