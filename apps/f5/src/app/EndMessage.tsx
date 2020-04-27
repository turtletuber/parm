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
        <Link href={current}> Share this adventure with a friend</Link>, 
        wait for someone to continue where you left off, 
        or <Link href="/">go back to the start</Link> and try another path.
      </Typography>
    </div>
  );
}