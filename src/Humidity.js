import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import HumidityIcon from '@mui/icons-material/Opacity';

const Humidity = ({ humidity }) => (
  <Grid item xs={4}>
    <Card sx={{ width: '250%', backgroundColor: 'transparent', boxShadow: 'none' }}>
      <CardContent sx={{ color: 'white' }}>
        <HumidityIcon />
        <Typography variant="body2"  color="white" component="p">
          Humidity: {humidity !== null ? `${humidity}%` : "..."}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);

export default Humidity;
