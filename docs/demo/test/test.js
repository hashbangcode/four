function init() {
  console.log('init');
}

function update(delta) {
  console.log(`update ${delta}`);

  if (score === 1) {
    displayScore(1234567890);
    score = 0;
  } else {
    score = 1;
  }

  wait(2000);
}

function draw(delta) {
  console.log(`draw ${delta}`);

  if (score === 1) {
    return;
  }

  const colours = [
    'blue',
    'cyan',
    'darkorange',
    'red',
    'black',
    'green',
    'purple',
    'yellow',
    'olive',
    'navy',
    'teal',
    'aqua',
    'maroon',
    'grey',
    'lime',
    'fuchsia',
  ];

  shuffle(colours);

  let colourCount = 0;
  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid[i].length; j += 1) {
      fillBox(grid[i][j], colours[colourCount]);
      colourCount += 1;
    }
  }
}
