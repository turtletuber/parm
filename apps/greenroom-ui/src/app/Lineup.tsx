import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { Slot } from '@parm/greenroom-interface';

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
      <Typography component="div" variant="caption">
        The names within each slot are in no particular order.
      </Typography>
      <div className={classes.cards}>
        {props.slots.map((slot, i) => {
          return (
            <Card key={i} className={classes.card}>
              <CardHeader subheader={'Slot ' + (i + 1)}/>
              <CardContent >
                <Typography variant="caption">
                  {slot.comics.length > 0 ?
                    slot.comics
                      .map(c => `${c.firstName} ${c.lastName}`)
                      .join(' • ')
                    :
                    'None yet'
                  }
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
