import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ListItem } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  caption: {
    margin: theme.spacing(1, 0, 1),
  },
}));

export interface Comic {
  firstName: string;
  lastName: string;
}

export interface Slot {
  comics: Comic[];
};

export interface LineupProps {
  slots: Slot[];
}

export default function Lineup(props: LineupProps) {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Lineup
        </Typography>
      <div>
        {props.slots.map((slot, i) => {
          return (
            <ListItem>
              Slot {i + 1}
            </ListItem>
          );
        })}
      </div>
    </div>
  );
}
