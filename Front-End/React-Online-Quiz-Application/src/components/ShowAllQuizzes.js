import React from 'react'
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";


export default function AllQuizzes() {
  const arr = [1,2,3,4]
  return (
	<div className='p-5'>
    <Grid container spacing={2} style={{display: "flex", flexDirection: "row"}}>
      {
        arr.map(()=>{
          return(
            <Grid item xs={6} md={4} lg={3}>
				<div className='d-flex align-items-center p-2 flex-column' style={{backgroundColor: "#e3e3e3"}}>
					<h4>Quiz Name</h4>
					<span>Time Limit: 20 minutes</span>
					<Button
						className="my-3 px-5"
						variant="contained"
						style={{backgroundColor: "#533b7c"}}
					>
						Start
					</Button>
				</div>
			</Grid>
          )
        })
      }
    </Grid>
	</div>
  )
}