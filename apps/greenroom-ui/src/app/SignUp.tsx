import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { EventRegistrationRestClient } from '@parm/greenroom-rest-client';
import { host } from './app';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface SignUpProps {
  eventId: string;
}

export default function SignUp(props: SignUpProps) {
  const { eventId } = props;
  const classes = useStyles();
  const [fields, setFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const onClick = () => {
    const client = new EventRegistrationRestClient(host);
    client.post({
      _type: 'event-registration',
      eventId, 
      order: null,
      ...fields,
    }).subscribe();
  };

  // todo memo and debounce onChange
  const onChange: (field: string) => React.ChangeEventHandler =
    (field) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setFields({
          ...fields,
          [field]: event.target.value
        });
      };

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Sign up
        </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={onChange('firstName')}
              value={fields['firstName']}
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={onChange('lastName')}
              value={fields['lastName']}
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={onChange('email')}
              value={fields['email']}
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>
        </Grid>
        <Button
          onClick={onClick}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
          </Button>
      </form>
    </div>
  );
}
