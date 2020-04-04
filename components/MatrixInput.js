import React from 'react';

const MatrixInput = (props = {
  matrix:{
    rows: 2,
    columns: 2,
    data: [[1,1],[2,2]]
  }
}) => {
  return (
    <div className="matrix">
      {
        props.matrix && props.matrix.data.map((row,rIndex)=>(
          <div key={rIndex}>
            {
              row.map((cell, cIndex)=>{
                return <input className="cell" key={cIndex}
                  onChange={(e)=>{
                  let A2 = {...props.matrix};
                  A2.data[rIndex][cIndex] = (e.target.value);
                  // console.log(A2)
                  if (props.onChange) {
                    props.onChange(A2);
                  }
                  // setA(A2);
                }} value={cell}/>
              })
            }
            <br/>
          </div>
        ))
      }
      </div>
  );
};

export default MatrixInput
