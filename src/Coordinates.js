import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CoordinatesIcon from '@mui/icons-material/Room';

const Coordinates = ({ lon, lat }) => (
  <Grid item xs={4}>
    <Card sx={{ width: '250%', backgroundColor: 'transparent', boxShadow: 'none' }}>
      <CardContent sx={{ color: 'white' }}>  {/* Set text color to white */}
        <CoordinatesIcon />
        <Typography variant="body2" color="white" component="p">  {/* Set Typography text color to white */}
          Coordinates: {lon !== null && lat !== null ? `${lon}, ${lat}` : "..."}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);

export default Coordinates;
