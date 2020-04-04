const Matrix = require('./Matrix.js')

test('Addition of two matrices', () => {
  let m1 = {
    rows: 3,
    columns: 3,
    data: [
      [1, 2, 3],
      [3, 4, 2],
      [1, -1, 0]
    ]
  };
  let m2 = {
    rows: 3,
    columns: 3,
    data: [
      [5, -2, 7],
      [8, -4, 2],
      [0, 3, 11]
    ]
  };
  let m3 = {
    rows: 3,
    columns: 3,
    data: [
      [6, 0, 10],
      [11, 0, 4],
      [1, 2, 11]
    ]
  }
  expect(Matrix.add(m1,m2)).toStrictEqual(m3)
});

test('Subtraction of two matrices', () => {
  let m1 = {
    rows: 3,
    columns: 3,
    data: [
      [5, -2, 7],
      [8, -4, 2],
      [0, 3, 11]
    ]
  };
  let m2 = {
    rows: 3,
    columns: 3,
    data: [
      [1, 2, 3],
      [3, 4, 2],
      [1, -1, 0]
    ]
  };
  let m3 = {
    rows: 3,
    columns: 3,
    data: [
      [4, -4, 4],
      [5, -8, 0],
      [-1, 4, 11]
    ]
  }
  expect(Matrix.sub(m1,m2)).toStrictEqual(m3)
});

test('Scaling of a matrix', () => {
  let m1 = {
    rows: 2,
    columns: 3,
    data: [
      [5, -2, 7],
      [8, -4, 2],
    ]
  };
  let m2 = {
    rows: 2,
    columns: 3,
    data: [
      [10, -4, 14],
      [16, -8, 4],
    ]
  }
  expect(Matrix.scale(2,m1)).toStrictEqual(m2)
});

test('Multiply two vectors', () => {
  let v1 = {
    rows: 1,
    columns: 3,
    data: [
      [5, -2, 7],
    ]
  };
  let v2 = {
    rows: 3 ,
    columns: 1,
    data: [
      [10],
      [-4],
      [14]
    ]
  }
  let v3 = {
    rows: 1,
    columns: 1,
    data:[[156]]
  }
  expect(Matrix.mul(v1,v2)).toStrictEqual(v3)
});

test('Multiply two matrices', () => {
  let m1 = {
    rows: 2,
    columns: 2,
    data: [
      [5, -2],
      [4, 5]
    ]
  };
  let m2 = {
    rows: 2,
    columns: 2,
    data: [
      [2, 3],
      [-4, 5],
    ]
  }
  let m3 = {
    rows: 2,
    columns: 2,
    data:[
      [18, 5],
      [-12, 37]
    ]
  }
  expect(Matrix.mul(m1,m2)).toStrictEqual(m3)
});

test('Transpose of a matrix', () => {
  let m1 = {
    rows: 3,
    columns: 2,
    data: [
      [5, -2],
      [4, 5],
      [7, -9]
    ]
  };
  let m2 = {
    rows: 2,
    columns: 3,
    data: [
      [5,4,7],
      [-2,5,-9]
    ]
  }
  expect(Matrix.transpose(m1)).toStrictEqual(m2)
});
