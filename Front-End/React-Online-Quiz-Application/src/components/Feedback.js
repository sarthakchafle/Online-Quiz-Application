import React, { useEffect, useState } from 'react';
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { Container ,Paper,Button} from '@mui/material';
import { useNavigate } from "react-router-dom";
import './homepage.css'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

export default function Feedback() {
    const formRef = React.useRef();
    let navigate = useNavigate();
    const[email,setEmail]=useState('')
    const[feedback,setFeedback]=useState('')
    const [star, setStar] = useState(0)

     const onBtnSubmit=(e)=>{
        const check = formRef.current.reportValidity()
        if(check){
            //console.log("added");
            navigate("/");
            window.location.reload();
        }
        else
            alert("Please fill the feedback completely");
    }
    const onBtnSkip=(e)=>{
        navigate("/finalPage");
        window.location.reload();
    }
      /*
        e.preventDefault()
        const feeds={email,ratings,feedback}
        console.log(feeds)
        fetch("",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(feeds)
    
      }).then(()=>{
        console.log("feedback added")
      }) 
      }*/


  return (

    <div style={{backgroundColor: "#533b7c", height: "100vh", width: "100vw", padding: "10vw"}}>
        <Paper elevation={3} className="p-3">
            <h1 style={{color:"#533b7c", textAlign:"center"}}>Feedback</h1>
                <form ref={formRef} >
                    <TextField 
                        id="outlined-basic" 
                        required 
                        label="Email" 
                        variant="outlined" 
                        fullWidth 
                        value={email} 
                        className="m-2"
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <TextField 
                        id="outlined-basic" 
                        required 
                        label="Your Feedback"
                        multiline 
                        maxRows={4} 
                        variant="outlined" 
                        fullWidth 
                        value={feedback} 
                        className="m-2"
                        onChange={(e)=>setFeedback(e.target.value)}
                    />
                    <div className="m-2">
                    {
                        [1,2,3,4,5].map((item) => {
                            if(item <= star) {
                                return (
                                    <StarIcon 
                                        sx={{color: "yellow", height: "50px", width: "50px"}} 
                                        onClick={() => setStar(item)} 
                                    />
                                )
                            }
                            return (
                                <StarBorderIcon 
                                    sx={{color: "black", height: "50px", width: "50px"}} 
                                    onClick={() => setStar(item)} 
                                />
                            )
                        })
                    }
                    </div>

                <button 
                    onClick={onBtnSubmit} 
                    className="btn-red-for-rest-pages m-2"
                >
                    Submit
                </button>
                <button className="btn-red-for-rest-pages m-2">
                    Skip
                </button>
            </form>
   
        </Paper>
    
    </div>
  );
}