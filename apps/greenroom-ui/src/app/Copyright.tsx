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

export default function Copyright() {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}{new Date().getFullYear()}
      </Typography>
    </div>
  );
}