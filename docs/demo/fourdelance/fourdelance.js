// Set up variables for the four-de-lance game.
let loose = false;
let snake = [];
let foodcoordinates = {};
let snakeMoveTimeout;
let snakeDirection;

const SNAKE_UP = 'up';
const SNAKE_DOWN = 'down';
const SNAKE_LEFT = 'left';
const SNAKE_RIGHT = 'right';

function placeFood() {
  if (snake.length === 16) {
    // There is nowhere to place the food, so "win".
    loose = true;
    score += 1;
    return;
  }
  foodcoordinates = {};
  placeFoodLoop: while (typeof foodcoordinates.column === 'undefined') {
    const random = randomElement();
    for (let s = 0; s < snake.length; s += 1) {
      if (snake[s].column === random.column && snake[s].row === random.row) {
        continue placeFoodLoop;
      }
    }
    foodcoordinates = { column: random.column, row: random.row };
  }
}

function moveSnake() {
  snakeMoveTimeout = setTimeout(moveSnake, Math.max(2000 - (score * 100), 250));

  const head = structuredClone(snake[0]);

  switch (snakeDirection) {
    case SNAKE_LEFT:
      if (snake[0].column >= 1) {
        head.column -= 1;
      }
      else {
        loose = true;
      }
      break;
    case SNAKE_UP:
      if (snake[0].row >= 1) {
        head.row -= 1;
      } else {
        loose = true;
      }
      break;
    case SNAKE_RIGHT:
      if (snake[0].column < 3) {
        head.column += 1;
      } else {
        loose = true;
      }
      break;
    case SNAKE_DOWN:
      if (snake[0].row < 3) {
        head.row += 1;
      } else {
        loose = true;
      }
      break;
    default:
      // Player hasn't moved yet.
      return;
  }

  for (let s = 1; s < snake.length; s += 1) {
    if (snake[s].column === head.column && snake[s].row === head.row) {
      loose = true;
      return;
    }
  }

  snake.unshift(head);

  if (snake[0].column === foodcoordinates.column && snake[0].row === foodcoordinates.row) {
    score += 1;
    placeFood();
    return;
  }

  snake.pop();
}

function placeSnake() {
  while (snake.length === 0) {
    const random = randomElement();
    if (random.column === foodcoordinates.column && random.row === foodcoordinates.row) {
      continue;
    }

    snake.push({ column: random.column, row: random.row });
  }
  if (typeof snakeMoveTimeout !== 'number') {
    snakeMoveTimeout = setTimeout(moveSnake, 100);
  }
}

function userActionKeyPress(direction) {
  switch (direction) {
    case KEYPRESS_LEFT:
      snakeDirection = SNAKE_LEFT;
      break;
    case KEYPRESS_UP:
      snakeDirection = SNAKE_UP;
      break;
    case KEYPRESS_RIGHT:
      snakeDirection = SNAKE_RIGHT;
      break;
    case KEYPRESS_DOWN:
      snakeDirection = SNAKE_DOWN;
      break;
    default:
      // Do nothing.
      break;
  }
}

function init() {
    placeSnake();
    placeFood();
}

function update() {
  if (loose === true) {
    // We have a winner!
    // flush the screen.
    cls();
    // Display the score.
    displayScore(score);
    // Reset some variables.
    score = 0;
    snake = [];
    snakeDirection = undefined;

    // Reset the game grid.
    placeSnake();
    placeFood();

    // Turn off the win state.
    loose = false;
  }
}

function draw() {
  cls();
  for (let i = 0; i < gridMaxX; i += 1) {
    for (let j = 0; j < gridMaxY; j += 1) {
      const element = grid[i][j];
      for (let g = 0; g < snake.length; g += 1) {
        if (snake[g].column === element.column && snake[g].row === element.row) {
          fillBox(element, 'red');
        }
      }
      if (element.column === foodcoordinates.column && element.row === foodcoordinates.row) {
        fillBox(element, 'green');
      }
    }
  }
}
