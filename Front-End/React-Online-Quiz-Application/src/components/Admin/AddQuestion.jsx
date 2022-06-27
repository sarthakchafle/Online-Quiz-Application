import React, {useState} from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function AddQuestion({formattedArray, setFormattedArray, count, setCount}) {
    const [open, setOpen] = useState(false);
    const [options, setoptions] = useState(["", "", "", ""])
    const [answer, setAnswer] = useState()
    const [question, setQuestion] = useState("")
    const handleAdd = () => {
        if(question === "" || answer === "" || options[0] === "" || options[1] === ""|| options[2] === "" || options[3] === "") {
            setOpen(true)
            return
        }
        setFormattedArray((old) => [
            ...old, {
                question: question,
                option: [
                    { answer: options[0], correct: answer === options[0] },
                    { answer: options[1], correct: answer === options[1] },
                    { answer: options[2], correct: answer === options[2] },
                    { answer: options[3], correct: answer === options[3] },
                ]
            }
        ]) 
        setCount(count+1)
        setQuestion("")
        setoptions(["", "", "", ""])
        setAnswer("")
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
    let temp = []
    const handleOption = (e, i) => {
        let a = options.slice()
        a[i] = e.target.value;
        setoptions(a)
    }
    for(let i=0;i<4;i++) {
        temp.push(<TextField
            className="my-1"
            required={true}
            id="outlined-textarea"
            label={`Option ${i+1}`}
            placeholder="option..."
            multiline
            margin="dense"
            value={options[i]}
            sx={{ width: "49%", marginRight: "2px" }}
            onChange={(e) => handleOption(e, i)}
        />)
    }
    return (
        <div>
            <TextField
                className="my-4"
                required={true}
                id="outlined-textarea"
                label={`Question ${count+1}`}
                placeholder="question..."
                multiline
                fullWidth
                margin="dense"
                value={question}
                onChange={(e) => {
                    setQuestion(e.target.value);
                }}
            />
            {temp}
              <FormControl sx={{ width: "100%" }} className="my-4">
                <InputLabel id="demo-multiple-name-label">
                  Correct Answer...
                </InputLabel>
                <Select 
                  required={true}
                  label="Correct Answer"
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  value={answer}
                  inputProps={{ "aria-label": "Without label" }}
                  onChange={(e) => setAnswer(e.target.value)}
                  input={<OutlinedInput label="Name" />}
                  fullWidth
                >
                  <MenuItem value={options[0]}>{options[0]}</MenuItem>
                  <MenuItem value={options[1]}>{options[1]}</MenuItem>
                  <MenuItem value={options[2]}>{options[2]}</MenuItem>
                  <MenuItem value={options[3]}>{options[3]}</MenuItem>
                </Select>
              </FormControl>
            <Button
                variant="contained"
                color="success"
                type="submit"
                onClick={handleAdd}
            >
              {"Add"}
            </Button>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Add all values"
                action={action}
            />
        </div>
    )
}
