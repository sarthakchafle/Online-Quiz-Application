import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container ,Paper,Button} from '@material-ui/core';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  
    button: {
        backgroundColor: '#533b7c',
        color: 'white',
        margin: theme.spacing(1),
        
      },
    
      layout: {
        backgroundColor: '#fbf7fc',
        
      },

      root: {
        '& > *': {
          margin: theme.spacing(1),
         
        },
      },
}));

export default function FeedbackForm() {
    const formRef = React.useRef();
    let navigate = useNavigate();
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[email,setEmail]=useState('')
    const[ratings,setRatings]=useState('')
    const[feedback,setFeedback]=useState('')
     const classes = useStyles();
   
      
const onBtnSubmit=(e)=>{
    const check = formRef.current.reportValidity()
    if(check){
        //console.log("added");
        navigate("/finalPage");
        window.location.reload();
    }
    else
        alert("Please fill the feedback completely");
}
const onBtnSkip=(e)=>{
    //console.log("skipped");
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

    <Container>
        <Paper elevation={3} style={paperStyle} className={classes.layout}>
            <h1 style={{color:"#533b7c", textAlign:"center"}}>Feedback</h1>

    <form className={classes.root} ref={formRef} >
    
      <TextField id="outlined-basic" required label="Email" variant="outlined" fullWidth 
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      />
      <TextField id="outlined-basic" required type="number" 
      InputProps={{
        inputProps: { 
            max: 5, min: 1 
        }
      }}
      label="Ratings (1 to 5)" variant="outlined" placeholder='1-Low 5-High' fullWidth
      value={ratings}
      onChange={(e)=>setRatings(e.target.value)}
      />
      <TextField id="outlined-basic" required label="Your Feedback" multiline maxRows={4} variant="outlined" fullWidth 
      value={feedback}
      onChange={(e)=>setFeedback(e.target.value)}
      />
      <Button variant="contained" id="submission" className={classes.button} onClick={onBtnSubmit}>
  Submit
</Button>
<Button variant="contained" id="skip" className={classes.button} onClick={onBtnSkip}>
  Skip
</Button>
    </form>
   
    </Paper>
    
    </Container>
  );
}