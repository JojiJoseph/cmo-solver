const Matrix = require('./Matrix');

class Quadratic {
  constructor(A,b,c) {
    this.A = A;
    this.b = b;
    this.c = c;
  }
  evaluate(x) {
    let ans = Matrix.mul(this.A,x);
    ans = Matrix.mul(Matrix.transpose(x), ans);
    ans = Matrix.scale(0.5, ans);
    ans = Matrix.add(ans, Matrix.mul(Matrix.transpose(this.b),x));
    ans = Matrix.add(ans, {
      rows: 1,
      columns: 1,
      data: [[this.c]]
    });
    return ans;
  }
}

module.exports = Quadratic;
