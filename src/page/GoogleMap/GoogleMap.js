import React from 'react';
import { Grid, Box } from '@mui/material';

function GoogleMap() {
  const latitude = 33.6844;
  const longitude = 73.0479;

  return (
    <Grid container justifyContent="center" sx={{ paddingX: 2 }}>
      <Grid item xs={12} md={12} lg={12}>
        <Box>
          <iframe src={`https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;&output=embed`} width="100%" height="550px" zoom={15}></iframe>
        </Box>
      </Grid>
    </Grid>
  );
}

export default GoogleMap;
