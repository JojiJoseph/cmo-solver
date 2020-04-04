class Matrix {
  static add(m1, m2) {
    if (m1.rows != m2.rows || m1.columns != m2.columns) {
      throw "Incompatible matrices!";
    }
    let output = {
      rows: m1.rows,
      columns: m1.columns,
      data: []
    };
    for(let i=0;i<m1.rows;++i) {
      let row = [];
      for(let j=0;j<m1.columns;++j) {
        let sum = m1.data[i][j] + m2.data[i][j];
        row.push(sum);
      }
      output.data.push(row);
    }
    return output;
  }
  static sub(m1, m2) {
    if (m1.rows != m2.rows || m1.columns != m2.columns) {
      throw "Incompatible matrices!";
    }
    let output = {
      rows: m1.rows,
      columns: m1.columns,
      data: []
    };
    for(let i=0;i<m1.rows;++i) {
      let row = [];
      for(let j=0;j<m1.columns;++j) {
        let diff = m1.data[i][j] - m2.data[i][j];
        row.push(diff);
      }
      output.data.push(row);
    }
    return output;
  }
  static mul(m1, m2) {
    if(m1.columns !== m2.rows) {
      throw "Incompatible matrices!";
    }
    let output = {
      rows: m1.rows,
      columns: m2.columns,
      data: []
    };
    for(let i=0;i<m1.rows;++i) {
      let row = [];
      for(let j=0;j<m2.columns;++j) {
        let sum = 0;
        for(let k=0;k<m1.columns;++k) {
          sum += m1.data[i][k]*m2.data[k][j];
        }
        row.push(sum);
      }
      output.data.push(row);
    }
    return output;
  }
  static scale(k, m1) {
    let output = {
      rows: m1.rows,
      columns: m1.columns,
      data: []
    };
    for(let i=0;i<m1.rows;++i) {
      let row = [];
      for(let j=0;j<m1.columns;++j) {
        let value = k*m1.data[i][j];
        row.push(value);
      }
      output.data.push(row);
    }
    return output;
  }
  static transpose(m1) {
    let output = {
      rows: m1.columns,
      columns: m1.rows,
      data: []
    }
    for(let j=0;j<m1.columns;++j) {
      let row = [];
      for(let i=0;i<m1.rows;++i) {
        row.push(m1.data[i][j]);
      }
      output.data.push(row);
    }
    return output;
  }
  static norm(m1) {
    let sum=0
    for(let j=0;j<m1.columns;++j) {
      for(let i=0;i<m1.rows;++i) {
        sum += m1.data[i][j]*m1.data[i][j];
      }
    }
    sum = Math.sqrt(sum)
    // console.log(m1);
    return sum;
  }
}

module.exports = Matrix
