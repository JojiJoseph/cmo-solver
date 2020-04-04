import Matrix from './Matrix';

import Quadratic from './quadratic';

// Format 1/2xAx-bx+c
const solveQudraticByConjugateGradient = (A,B,c, x0) => {
  let Q = Matrix.add(A, A);
  Q = Matrix.scale(0.5, Q);
  let x = x0;
  let grad = Matrix.add(Matrix.mul(Q, x),Matrix.scale(-1,B));
  let d = Matrix.scale(-1,grad);
  while(Matrix.norm(grad) > 0.01) {
    let alpha = Matrix.mul(Matrix.transpose(grad),d).data[0]/
    (Matrix.mul(Matrix.transpose(d),
  Matrix.mul(Q,d))).data[0];
  // console.log(alpha)
  x = Matrix.add(x, Matrix.scale(alpha, d));
  grad = Matrix.add(Matrix.mul(Q, x),Matrix.scale(-1,B));
  if (Matrix.norm(grad)<0.01) break;
  let beta = Matrix.mul(Matrix.transpose(grad),Matrix.mul(Q,d)).data[0]/
  (Matrix.mul(Matrix.transpose(d),
Matrix.mul(Q,d))).data[0];
d = Matrix.add(Matrix.scale(-1,grad),Matrix.scale(beta,d));
if (Matrix.norm(d) < 0.01) break;
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
const solveQudraticByConjugateGradientWithSteps = (A,B,c, x0) => {
  A = parseFloatMatrix(A)
  B = parseFloatMatrix(B)
  c = parseFloat(c)
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
  let d = Matrix.scale(-1,grad);
  steps.push(`$\\begin{aligned}
    g^{(${iteration-1})}&=\\nabla{f(x^{(${iteration-1})})} \\\\
    &=Qx^{(${iteration-1})}-b \\\\
    &=${matrixToMathjax(Q)}${matrixToMathjax(x)}-${matrixToMathjax(B)} \\\\
    &=${matrixToMathjax(grad)}
    \\end{aligned}$ `)
  steps.push(`$\\begin{aligned}
    d^{(${iteration-1})}&=-g^{(${iteration-1})} \\\\
    &=${matrixToMathjax(d)}
    \\end{aligned}$ `)
  while(Matrix.norm(grad) > 0.01 && iteration <100) {
    steps.push(`$\\underline{\\text{Iteration ${iteration}}}$`)
    // steps.push(`$\\begin{aligned}
    //   d^{(${iteration-1})}&=g^{(${iteration-1})} \\\\
    //   &=${matrixToMathjax(d)}
    //   \\end{aligned}$ `)
    // steps.push(`$g^{(${iteration-1})}=Qx^{(${iteration-1})}-b$ `)
    // steps.push(`$g^{(${iteration-1})}=${matrixToMathjax(Q)}${matrixToMathjax(x)}-${matrixToMathjax(B)}$ `)
    // steps.push(`$g^{(${iteration-1})}=${matrixToMathjax(grad)} $ `)
    // steps.push(`$g^{(${iteration-1})}=${matrixToMathjax(grad)} $ `)
    let alpha = -Matrix.mul(Matrix.transpose(grad),d).data[0]/
    (Matrix.mul(Matrix.transpose(d),
  Matrix.mul(Q,d))).data[0];
  steps.push(`$\\begin{aligned}
    \\alpha_{${iteration-1}}&=\\text{arg min}_{\\alpha \\geq 0}{f(x^{(${iteration-1})}+\\alpha d^{(${iteration-1})})} \\\\
    &=-\\frac{g^{(${iteration-1})T}d^{(${iteration-1})}}{d^{(${iteration-1})T}Qd^{(${iteration-1})}} \\\\
&=-\\frac{${matrixToMathjax(Matrix.transpose(grad))}${matrixToMathjax(d)}}{${matrixToMathjax(Matrix.transpose(d))}${matrixToMathjax(Q)}${matrixToMathjax(d)}} \\\\
&=${alpha} \\\\
    \\end{aligned}$ `)
  // steps.push(`$\\alpha _{${iteration-1}}=${alpha} $ `)
  // steps.push(`$\\alpha _{${iteration-1}}=${alpha} $ `)
  // console.log(alpha)
  let xnew = Matrix.add(x, Matrix.scale(alpha, d));
  steps.push(`$\\begin{aligned}
    x^{(${iteration})}&=x^{(${iteration-1})}+\\alpha d^{(${iteration-1})} \\\\
    &=${matrixToMathjax(x)}+${alpha}${matrixToMathjax(d)} \\\\
    &=${matrixToMathjax(xnew)}
    \\end{aligned}$ `)

  x = xnew;
  // steps.push(`$x^{(${iteration})}=${matrixToMathjax(x)}$ `)
  grad = Matrix.add(Matrix.mul(Q, x),Matrix.scale(-1,B));
  steps.push(`$\\begin{aligned}
    g^{(${iteration})}&=\\nabla{f(x^{(${iteration})})} \\\\
    &=Qx^{(${iteration})}-b \\\\
    &=${matrixToMathjax(Q)}${matrixToMathjax(x)}-${matrixToMathjax(B)} \\\\
    &=${matrixToMathjax(grad)}
    \\end{aligned}$ `)
  if (Matrix.norm(grad)<0.01) break;
  let beta = Matrix.mul(Matrix.transpose(grad),Matrix.mul(Q,d)).data[0]/
  (Matrix.mul(Matrix.transpose(d),
  Matrix.mul(Q,d))).data[0];
  steps.push(`$\\begin{aligned}
    \\beta_{${iteration-1}}&=\\frac{g^{(${iteration})}Qd^{(${iteration-1})}}{d^{(${iteration-1})}Qd^{(${iteration-1})}}\\\\
    &=\\frac{${matrixToMathjax(Matrix.transpose(grad))}${matrixToMathjax(Q)}${matrixToMathjax(d)}}{${matrixToMathjax(Matrix.transpose(d))}${matrixToMathjax(Q)}${matrixToMathjax(d)}}\\\\
    &=${beta} \\\\
    \\end{aligned}$ `)
    let dnext = Matrix.add(Matrix.scale(-1,grad),Matrix.scale(beta,d));
  steps.push(`$\\begin{aligned}
    d^${iteration}&=-g^{(${iteration})}+\\beta_{${iteration-1}}d^{(${iteration-1})} \\\\
    &=-${matrixToMathjax(grad)}+${beta}${matrixToMathjax(d)}\\\\
    &=${matrixToMathjax(dnext)}\\end{aligned}$`)
    d = dnext;
  if (Matrix.norm(d) < 0.01) break;
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

export default solveQudraticByConjugateGradient;
export {solveQudraticByConjugateGradientWithSteps};
