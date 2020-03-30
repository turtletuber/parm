import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  card: {
    height: '100px',
    marginTop: theme.spacing(1),
  },
  cards: {
    width: '100%',
  },
  img: {
    width: '100%',
    borderRadius: '5px',
  },
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    marginTop: theme.spacing(2),
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  rightShoulder: {
    position: 'absolute',
    right: '1.5%',
    top: '1.5%',
  },
  rightShoulderButton: {
    marginLeft: '3px',
  }
}));