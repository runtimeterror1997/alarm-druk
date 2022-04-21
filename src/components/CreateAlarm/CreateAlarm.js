import React, {useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, Grid, Slide, TextField, Typography} from "@mui/material";
import './CreateAlarm.scss'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CreateAlarm({open, handleAction}) {
  const [value, setValue] = React.useState(0);
  const [time, setTime] = useState([]);

  useEffect(() => {
    localStorage.setItem('time', JSON.stringify(time));
  }, [time]);

  const handleTime = (e) => {
    setTime(e.target.value);
  }


  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={(e) => handleAction(false, e)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <Typography align="center" fontSize={14} fontWeight={600} marginTop={2}>Set your alarm</Typography>
        <DialogContent className="create-alarm">
          <Grid item lg={12} md={12} xs={12}>
            <TextField name='time' label="Select Time" InputLabelProps={{style: {fontSize: 13}, shrink: true}}
                       size="small" fullWidth type="time" value={time || null}
                       onChange={(e,) => handleTime(e, value)}/>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" size={'small'}
                  style={{color: '#000', backgroundColor: '#f3c716', textTransform: 'capitalize'}}
                  onClick={(e) => handleAction(e, true)}>Save</Button>
          <Button variant="text" size={'small'} style={{color: '#b04f4f', textTransform: 'capitalize'}}
                  onClick={(e) => handleAction(e, true)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateAlarm;