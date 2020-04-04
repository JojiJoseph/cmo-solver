import Matrix from './Matrix';

import Quadratic from './quadratic';

// Format 1/2xAx-bx+c
const solveQudraticByInexactSteepestDescent = (A,B,c, alpha, x0) => {
  let Q = Matrix.add(A, A);
  Q = Matrix.scale(0.5, Q);
  let x = x0;
  let grad = Matrix.add(Matrix.mul(Q, x),Matrix.scale(-1,B));
  while(Matrix.norm(grad) > 0.01) {
  // console.log(alpha)
  x = Matrix.add(x, Matrix.scale(-alpha, grad));
  grad = Matrix.add(Matrix.mul(Q, x),Matrix.scale(-1,B));
  }
  console.log(x)
  return x;
};

const parseFloatMatrix = (mat) => {
  for(let i=0;i<mat.rows;++i) {
    for(let j=0;j<mat.columns;++j) {
      mat.data[i][j] = parseFloat(mat.data[i][j]);
    }
  }
  return mat;
}
const matrixToMathjax = (mat) => {
  // return '$$\\begin{pmatrix}a & b\\\\ c & d\\end{pmatrix}$$'
  mat = parseFloatMatrix(mat);
  let matrix = '\\begin{bmatrix}';
  for(let i=0;i<mat.rows;++i) {
    for(let j=0;j<mat.columns;++j) {
      matrix += ` ${mat.data[i][j]}  ${j != mat.columns-1?'&':''} `;
    }
    matrix += ' \\\\';
  }
  matrix += ' \\end{bmatrix}';
  return matrix;
};
const solveQudraticByInexactSteepestDescentWithSteps = (A,B,c, alpha, x0) => {
  A = parseFloatMatrix(A)
  B = parseFloatMatrix(B)
  c = parseFloat(c)
  alpha = parseFloat(alpha)
  x0 = parseFloatMatrix(x0);
  console.log(A, Matrix.transpose(A));
  let Q = Matrix.add(A, Matrix.transpose(A));
  Q = Matrix.scale(0.5, Q);
  let x = x0;
  let grad = Matrix.add(Matrix.mul(Q, x),Matrix.scale(-1,B));
  let steps = [];
  let iteration = 1;
  console.log('Here');
  // steps.push(`$f(x) = \\frac{1}{2}x^T${matrixToMathjax(Q)}x-${matrixToMathjax(Matrix.transpose(B))}x+${c}$`);
  steps.push(`$f(x) = \\frac{1}{2}x^TQx-b^Tx+c$`);
  steps.push(`$\\begin{aligned}
    Q&=\\frac{A+A^T}{2} \\\\
    &=\\frac{1}{2}(${matrixToMathjax(A)}+${matrixToMathjax(Matrix.transpose(A))}) \\\\
    &=${matrixToMathjax(Q)}
    \\end{aligned}$`)
    steps.push(`$b=${matrixToMathjax(B)} $ `)
    steps.push(`$c=${c} $ `)
  // steps.push(`$Q=${matrixToMathjax(Q)} $ `)
  // steps.push(`$x^{(0)}=${matrixToMathjax(x0)} $ `)
  while(Matrix.norm(grad) > 0.001 && iteration <100) {
    console.log('Here 2');
    steps.push(`$\\underline{\\text{Iteration ${iteration}}}$`)
    steps.push(`$\\begin{aligned}
      g^{(${iteration-1})}&=\\nabla{f(x^{(${iteration-1})})} \\\\
      &=Qx^{(${iteration-1})}-b \\\\
      &=${matrixToMathjax(Q)}${matrixToMathjax(x)}-${matrixToMathjax(B)} \\\\
      &=${matrixToMathjax(grad)}
      \\end{aligned}$ `)
    // steps.push(`$g^{(${iteration-1})}=Qx^{(${iteration-1})}-b$ `)
    // steps.push(`$g^{(${iteration-1})}=${matrixToMathjax(Q)}${matrixToMathjax(x)}-${matrixToMathjax(B)}$ `)
    // steps.push(`$g^{(${iteration-1})}=${matrixToMathjax(grad)} $ `)
    // steps.push(`$g^{(${iteration-1})}=${matrixToMathjax(grad)} $ `)
  //   let alpha = Matrix.mul(Matrix.transpose(grad),grad).data[0]/
  //   (Matrix.mul(Matrix.transpose(grad),
  // Matrix.mul(Q,grad))).data[0];
//   steps.push(`$\\begin{aligned}
//     \\alpha_{${iteration-1}}&=\\text{arg min}_{\\alpha \\geq 0}{f(x^{(${iteration-1})}-\\alpha g^{(${iteration-1})})} \\\\
//     &=\\frac{g^{(${iteration-1})T}g^{(${iteration-1})}}{g^{(${iteration-1})T}Qg^{(${iteration-1})}} \\\\
// &=\\frac{${matrixToMathjax(Matrix.transpose(grad))}${matrixToMathjax(grad)}}{${matrixToMathjax(Matrix.transpose(grad))}${matrixToMathjax(Q)}${matrixToMathjax(grad)}} \\\\
// &=${alpha} \\\\
//     \\end{aligned}$ `)
  // steps.push(`$\\alpha _{${iteration-1}}=${alpha} $ `)
  // steps.push(`$\\alpha _{${iteration-1}}=${alpha} $ `)
  // console.log(alpha)
  let xnew = Matrix.add(x, Matrix.scale(-alpha, grad));
  steps.push(`$\\begin{aligned}
    x^{(${iteration})}&=x^{(${iteration-1})}-\\alpha g^{(${iteration-1})} \\\\
    &=${matrixToMathjax(x)}-${alpha}${matrixToMathjax(grad)} \\\\
    &=${matrixToMathjax(xnew)}
    \\end{aligned}$ `)

  x = xnew;
  steps.push(`$x^{(${iteration})}=${matrixToMathjax(x)}$ `)
  grad = Matrix.add(Matrix.mul(Q, x),Matrix.scale(-1,B));

  iteration++;
  console.log(iteration);
  }
  let quadratic = new Quadratic(Q, Matrix.scale(-1, B), c);
  // console.log(quadratic.evaluate(x))
  steps.push(`$\\boxed{\\begin{aligned}
    x^*&=${matrixToMathjax(x)} \\\\
    f(x^*)&=${quadratic.evaluate(x).data[0][0]}
    \\end{aligned}}$ `)
  // console.log(x)
  setTimeout(()=>{
    MathJax.typeset()
  }, 1000)
  return steps;
};

export default solveQudraticByInexactSteepestDescent;
export {solveQudraticByInexactSteepestDescentWithSteps};
