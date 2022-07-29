import React from "react";
import Paper from "@mui/material/Paper";
import { Divider, Typography } from "@mui/material";

const AddedQuestions = (props) => {
  return (
    <div style={{ margin: "20px 0" }}>
      <Paper elevation={3}  className="p-3 mx-5">
        <h4
          style={{ textAlign: "center", fontWeight: "400" }}>{`Added Questions`}</h4>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          {`Title:`} <span style={{ color: "#533b7c" }}>{props.title}</span>
        </Typography>
        <Divider />
        {props.array.map((e, key) => (
          <div style={{maxWidth: "70vw"}}>
            <Typography key={key} variant="h6">
              {key + 1 + ". " + e.question}
            </Typography>
            <ol type="a" style={{ fontWeight: "500" }}>
              {e.option.map((e, key) => (
                <li>
                  <div
                    style={{
                      color: e.correct === true && "green",
                      fontWeight: e.correct === true && "bold",
                      textDecoration: e.correct === true && "underline",
                    }}
                  >
                    {e.answer}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </Paper>
    </div>
  );
};

export default AddedQuestions;
