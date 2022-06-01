import React from "react";
import Paper from "@mui/material/Paper";
import { Divider, Typography } from "@mui/material";

const AddedQuestions = (props) => {
  return (
    <div style={{ border: "1px solid #000", margin: "20px 0" }}>
      <Paper elevation={3}>
        <div
          style={{ textAlign: "center", fontWeight: "400", color: "green" }}
        >{`Added Questions`}</div>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          {`Title:`} <span style={{ color: "#cc3342" }}>{props.title}</span>
        </Typography>
        <Divider />
        {props.array.map((e, key) => (
          <>
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
          </>
        ))}
        <Typography variant="h6">{props.startTime}</Typography>
        <Typography variant="h6">{props.endTime}</Typography>
      </Paper>
    </div>
  );
};

export default AddedQuestions;
