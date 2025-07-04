import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import FeedbackService from "../services/feedback.service";
import NotAllowed from "./NotAllowed";
import { Navigate, useLocation} from "react-router-dom";

const Review =()=>{
  let location = useLocation();
  const [data, setData] = useState([]);
  const getData = async () => {
    let res = await FeedbackService.getFeedback();
    setData(res.data);
  };
  useEffect(() => {
    if(AuthService.getCurrentUser().isAdmin === "true"){
      console.log(AuthService.getCurrentUser().isAdmin);
      getData();
    }
  }, []);
  if(!AuthService.isLoggedIn()) {
    return (
      <Navigate to="/login" replace state={{ from: location }} />
    )
  }
 if(AuthService.getCurrentUser().isAdmin === "false"){
    return (<NotAllowed/>)
 }

return (
    <div style={{ backgroundColor: "#533b7c" }}>
      <div style={{ height: "30vh", backgroundColor: "beige" }}>
        <center><h1 style={{paddingTop:"80px"}}>Feedback Review</h1></center>
      </div>
      <div style={{ backgroundColor: "#533b7c", padding: "40px",  minHeight: "70vh" }}>
      <table
          className="table table-hover mx-auto rounded shadow"
          style={{ backgroundColor: "#f7fdcb", textAlign: "center" }}
        >
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Rating</th>
              <th scope="col">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, key) => {
              return ( 
                <tr 
                  className={`${item.rating}`>3 ? "table-success"
                                               : `${item.rating}`<3 ? "table-danger"
                                               : "table-warning"}
                  key={key}
                >
                  <td >{item.email}</td>
                  <td>{item.rating}</td>
                  <td >{item.review}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
        
export default Review;