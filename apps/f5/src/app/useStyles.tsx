import { makeStyles } from '@material-ui/core/styles';

const makeTransparent = (hexcode: string) => 
  hexcode + ((hexcode.length === 4) ? '0' : '00');

export const useStyles = makeStyles(theme => ({
  card: {
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
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(25),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  list: {
    width: 250,
  },
  menuButton: {
    zIndex: 100,
    margin: '0 !important' as any,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed !important' as any,
  },
  text: {
    display: 'inline-block',
    margin: 'auto',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  italic: {
    fontStyle: 'italic',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
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
  active: {
    color: theme.palette.primary.main,
  },
  action: {
    fontSize: '10',
    marginLeft: 'auto',
  },
  // expand: {
  //   height: 0,
  //   transitionDuration: '0.3s',
  //   // transitionProperty: 'height',
  //   // transition: theme.transitions.create('transform', {
  //   //   duration: theme.transitions.duration.shortest, 
  //   // }),
  // },
  // expandOpen: {
  //   transitionDuration: '0.3s',
  //   height: '100%',
  // },
  endMessage: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));