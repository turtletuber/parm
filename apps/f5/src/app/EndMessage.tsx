import React from 'react';
import { Link, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export function EndMessage() {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Typography variant="body2" color="textSecondary" align="center">
        That's it for now. 
        Share this adventure with a friend, 
        wait for someone to continue where you left off, 
        or <Link href="/">go back to the start</Link> and try another path.
      </Typography>
    </div>
  );
}