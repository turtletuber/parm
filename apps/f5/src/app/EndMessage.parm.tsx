import React from 'react';
import { Link, Typography } from '@material-ui/core';
import { useStyles } from './useStyles';

export function EndMessage() {
  const classes = useStyles();
  const current = window.location.href;

  return (
    <div className={classes.paper}>
      <Typography variant="body2" color="textSecondary" align="center">
        That's it for now. 
      </Typography>
    </div>
  );
}