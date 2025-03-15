const {
  getCanvasContextObject,
  setupGrid,
  drawGrid,
  initCanvas,
} = require('../four');

describe('four tests:', () => {
  let canvas;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'four');
    document.getElementsByTagName('body')[0].append(canvas);
  });

  test('test set up grid', () => {
    const theGrid = setupGrid();
    expect(theGrid.length).toStrictEqual(4);
    expect(theGrid[0].length).toStrictEqual(4);
  });

  test('test drawing grid', () => {
    initCanvas('four');
    const ctx = getCanvasContextObject();
    drawGrid();
    const events = ctx.__getEvents();
    expect(events).toMatchSnapshot();
  });
});
