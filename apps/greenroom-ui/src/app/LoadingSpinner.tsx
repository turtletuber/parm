import React from 'react';
import Loader from 'react-loader-spinner';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  spinner: {
    color: theme.palette.secondary.main,
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

export const LoadingSpinner = () => {
  const classes = useStyles();
  return (
    <div className={classes.spinner}>
      <Loader
        type="TailSpin"
        height={80}
        width={80}
      />
    </div>
  );
}