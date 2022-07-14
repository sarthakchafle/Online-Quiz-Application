import React, {useEffect, useState} from 'react'
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import {getAllQuizzesTitles} from '../services/quiz.service'


export default function AllQuizzes() {
    const [data, setData] = useState([])
    useEffect(async() => {
      const res = await getAllQuizzesTitles()
      console.log(res.data)
      setData(res.data)
    }, [])
    
    return (
        <div className='p-5'>
        <Grid container spacing={2} style={{display: "flex", flexDirection: "row"}}>
        {
            data.map((item)=>{
            return(
                <Grid item xs={6} md={4} lg={3}>
                    <div className='d-flex align-items-center p-2 flex-column' style={{backgroundColor: "#e3e3e3"}}>
                        <h4>{item.title}</h4>
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