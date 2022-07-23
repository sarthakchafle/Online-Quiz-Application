import React from "react";
import "./result.css";
const Result = () => {
  return (
    <React.Fragment>
      <div className="name">
        <h1 className="display-5">Name: abcd Title: html</h1>
      </div>
      <div style={{ textAlign: "center" }}>
        <h4>Your Score</h4>
        <h4>3/5</h4>
      </div>
      <div className="root">
        <div>
          <div className="table-wrapper-scroll-y my-custom-scrollbar">
            <table className="table table-hover mx-auto my-table shadow p-3 mb-5 bg-body rounded">
              <thead>
                <tr>
                  <th scope="col">Question</th>
                  <th scope="col">Correct Answer</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-success">
                  <th scope="row">What is Html</th>
                  <td>Structural language</td>
                  <td>1</td>
                </tr>
                <tr className="table-success">
                  <th scope="row">What does HTML stand for?</th>
                  <td>Hyper Text Markup language</td>
                  <td>1</td>
                </tr>
                <tr className="table-danger">
                  <th scope="row">Who is the father of HTML?</th>
                  <td>Tim Berners-Lee</td>
                  <td>0</td>
                </tr>
                <tr className="table-success">
                  <th scope="row">Who is making the Web standards?</th>
                  <td>W3C</td>
                  <td>1</td>
                </tr>
                <tr className="table-warning">
                  <th scope="row">
                    Choose the correct HTML element for the largest heading:
                  </th>
                  <td>-</td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: "center" }}>Total Score: 3/5</div>
          <div style={{ textAlign: "center" }}>
            <button type="button" className="btn">
              Mail Score
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
  // return (<div style={{display:'flex', flex:1,justifyContent:'center',alignItems:'center', height : '100vh',flexDirection:'column'}}>
  //     <h2 style={{marginBottom:'30px'}}><b>Quiz Result</b></h2><table style={{fontSize:'2vw',borderStyle:'solid',borderWidth:'1px',padding:'100px'}}>
  //     <tr style={{height:'10vh',backgroundColor:'grey'}}>
  //       <th style={{width:'40vw',paddingLeft:'200px'}}>Details<br></br></th>
  //       <th style={{width:'40vw',paddingLeft:'200px'}}>Quiz Answer</th>
  //     </tr>
  //     <tr>
  //       <td style={{borderStyle:'solid',borderWidth:'1px',padding:'100px'}}>User ID : dwabiwubdaidiwuadb<br></br>Username : Sarthak<br></br>Email : sarthak@gmail.com<br>
  //       </br>Quiz Title: html<br></br>Score : 90/100</td>
  //       <td style={{borderStyle:'solid',borderWidth:'1px',padding:'100px'}}>1.What does HTML stand for?<br></br> Answer: Hyper text markup language<br></br>2.Question<br></br>Answer:<br></br>3.Question<br>
  //       </br>Answer:</td>

  //     </tr>

  //   </table></div>)
};
export default Result;
