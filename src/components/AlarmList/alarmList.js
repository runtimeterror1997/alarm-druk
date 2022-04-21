import React, {useEffect, useState} from 'react';
import {
  Button,
  Card,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  Tooltip,
  Typography
} from "@mui/material";
import './alarmList.scss'
import AlarmIcon from '@mui/icons-material/Alarm';
import AlarmAddIcon from '@mui/icons-material/AlarmAdd';
import CreateAlarm from "../CreateAlarm/CreateAlarm";

function AlarmList(props) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('time'));
    if (items) {
      setItems(items);
    }
  }, []);
  debugger

  const handleClose = () => {
    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  return (
    <Container align="center">
      <Card className="card-alarm">
        <Stack className="card-header">
          <Typography variant={'body1'} className="mt-1" component={'h2'} fontWeight={700} gutterBottom>
            Welcome to Druk Alarm
          </Typography>
          <div align={'center'}>
            <AlarmIcon style={{color: "#D2691EFF"}} fontSize={"large"}/>
          </div>
        </Stack>
        <div align="right" className='hand-cursor mb-2 mt-2 mr-1'>
          <Tooltip title="create alarm">
            <Button variant="contained" size="small" onClick={handleOpen}>
              <AlarmAddIcon/>
            </Button>
          </Tooltip>
        </div>
        <Divider/>
        {items?.length ? 0 && items?.map((alarm) => (
          <Grid container spacing={2} className="pt-3">
            <Grid item lg={6} md={6} xs={4} className="pull-left">
              <Typography fontSize={18} fontStyle={"oblique"} fontWeight={500} color="gray">7:00 am</Typography>
            </Grid>
            <Grid item lg={3} md={3} xs={4}>
              <Typography fontSize={14} fontStyle={"oblique"} fontWeight={500} color="gray">wed, 12, 2021</Typography>
            </Grid>
            <Grid item lg={3} md={3} xs={4}>
              <FormControlLabel
                control={<Switch checked={true} color="default" size="medium"
                  // onClick={() => handleUpdateStatus(true, product?.id)}
                />}/>
            </Grid>
          </Grid>
        )) : (
          <Typography fontSize={18} fontWeight={700}>
            No alarm is set!
          </Typography>
        )}
        <Divider/>
      </Card>
      <CreateAlarm open={open} handleAction={handleClose}/>
    </Container>
  );
}

export default AlarmList;