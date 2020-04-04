import React, {useState, useEffect} from 'react';
import solveQudraticBySteepestDescent from '../steepest-descent';
import {solveQudraticBySteepestDescentWithSteps} from '../steepest-descent';
import {solveQudraticByInexactSteepestDescentWithSteps} from '../steepest-descent-inexact';
import {solveQudraticByConjugateGradientWithSteps} from '../conjugate-gradient';
import MatrixInput from './MatrixInput';

const Solver = () => {
  const [noOfVariables, setNoOfVariables] = useState(2);
  useEffect(()=>{
    setTimeout(()=>{
      console.log('in useEffect')
      MathJax.typeset()
    }, 1000)
  })
  const [A, setA] = useState({
    rows: 2,
    columns: 2,
    data: [[0.5, -1],[1,1]]
  });
  const [steps, setSteps] = useState([]);
  const [method, setMethod] = useState(1);
  const [B, setB] = useState({
    rows: 2,
    columns: 1,
    data: [[-1],[-2]]
  });
  const [c, setC] = useState(0)
  const [alpha, setAlpha] = useState(0.05)
  const [x0, setX0] = useState({
    rows: 2,
    columns: 1,
    data: [[0],[0]]
  });
  const generateAbc = (n) => {
    let data = [];
    let bData = [];
    let xData = [];
    for(let i=0;i<n;++i) {
      let row = [];
      for(let j=0;j<n;++j) {
        row.push(Math.floor(Math.random()*10))
      }
      data.push(row)
      bData.push([Math.floor(Math.random()*10)])
      xData.push([0])
    }
    setA({
      rows: n,
      columns: n,
      data: data
    })
    setB({
      rows: n,
      columns: 1,
      data: bData
    })
    setX0({
      rows: n,
      columns: 1,
      data: xData
    })
  };
  return (<div className="solver">
    <form onSubmit={(e)=>{
      e.preventDefault()
      setSteps([]);
      setTimeout( () => {
        if(method == 1) {
          setSteps(solveQudraticBySteepestDescentWithSteps(A,B,c, x0));
        } else if(method == 2) {
          setSteps(solveQudraticByConjugateGradientWithSteps(A,B,c, x0));
        } else if(method == 3) {
          setSteps(solveQudraticByInexactSteepestDescentWithSteps(A,B,c,alpha,x0))
        }
      }, 1000);
    }}>
    {/* <MatrixInput/> */}
    Method
    <select value={method} onChange={(e)=>{
      setMethod(e.target.value);
    }}>
      <option value={1}>Steepest Descent</option>
      <option value={2}>Conjugate Gradient</option>
      <option value={3}>Steepest Descent with fixed alpha</option>
    </select>
    <br/>
    Format $\boxed{'{'}f(x) = \frac{'{1}{2}'}x^TAx-{'b^Tx'}+c{'}'}$
    <br/>
    Number of variables
      <select value={noOfVariables} onChange={(e)=>{
        setNoOfVariables(e.target.value);
        generateAbc(e.target.value)}}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      <div className="variable-container">
        <p>$A$</p>
        <MatrixInput matrix={A} onChange={(A)=>setA(A)}/>
      </div>

      <div className="variable-container">
        <p>$b$</p>
        <MatrixInput matrix={B} onChange={(B)=>setB(B)}/>
      </div>

      <div className="variable-container">
        <p>$c$</p>
        {<input className="cell" value={c} onChange={(e)=>setC((e.target.value))}/>}
        <br/>
      </div>
      { method == 3 &&
        <React.Fragment>
          <div className="variable-container">
            <p>$\alpha$</p>
            {<input className="cell" value={alpha} onChange={(e)=>setAlpha((e.target.value))}/>}
            <br/>
          </div>
        </React.Fragment>
      }
      <div className="variable-container">
        <p>$x^{0}$</p>
        <MatrixInput matrix={x0} onChange={(x0)=>setX0(x0)}/>
      </div>
      <button className="button-solve">Solve</button>
      <hr/>
    </form>
    {steps.map((step, index)=>(<p key={index}>{step}</p>))}
  </div>);
};

export default Solver;
