function init() {
    console.log('init');
}

function update() {
    console.log('update');
}

function draw() {
    console.log('draw');


    let colours = [
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
    
    let colourCount = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            fillBox(grid[i][j], colours[colourCount]);
            colourCount++;
        }
    }
    wait(2000);

    if (score === 1) {
        displayScore(1234567890);
        score = 0;
    }
    else {
        score = 1;
    }
}
