import { makeStyles } from '@material-ui/core/styles';

const makeTransparent = (hexcode: string) => 
  hexcode + ((hexcode.length === 4) ? '0' : '00');

export const useStyles = makeStyles(theme => ({
  card: {
    height: '200px',
    marginTop: theme.spacing(1),
    position: 'relative',
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
    display: 'inline-block',
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
  },
  quote: {
    display: 'inline-block',
    borderLeftWidth: '3px',
    borderLeftStyle: 'solid',
    paddingLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
    fontStyle: 'italic',
  },
  fadeOut: {
    backgroundImage: `linear-gradient(
      to bottom, 
      ${makeTransparent(theme.palette.background.paper)},
      ${theme.palette.background.paper} 70%,
      ${theme.palette.background.paper} 100%
    )`,
    position: 'absolute',
    width: '100%',
    height: '40%',
    bottom: '0',
  },
}));