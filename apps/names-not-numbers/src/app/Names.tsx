import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import * as faker from 'faker';

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(1),
  },
  cards: {
    width: '100%',
  },
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
}));

export default function Names(props) {
  const classes = useStyles();
  const size = 300;
  // use https://github.com/bvaughn/react-window in next iteration

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Names, not Numbers
      </Typography>
      <Typography component="div" variant="caption">
        Victims of Covid-19 aren't just statistics. These names represent the number of lives lost from Covid-19 worldwide.
      </Typography>
      <div className={classes.cards}>
        {[...Array(size).keys()].map((person, i) => {
          return (
            <Card key={i} className={classes.card}>
              {/* <CardHeader subheader={'Slot ' + (i + 1)}/> */}
              <CardContent >
                <Typography variant="caption">
                  {faker.name.findName()}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}