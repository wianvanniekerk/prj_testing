import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const LiveDataCard =({ title, description }) => {
  return (
    <CardContent>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 40 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  );
}

export default LiveDataCard;