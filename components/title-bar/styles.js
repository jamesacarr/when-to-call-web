import { fade } from 'material-ui/styles/colorManipulator';

export default theme => ({
  wrapper: {
    display: 'flex',
    width: '50%',
    margin: '0 auto',
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    borderRadius: 2,
    background: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      background: fade(theme.palette.common.white, 0.25)
    },
    '& $input': {
      width: '100%'
    },
    '& *::-webkit-input-placeholder': {
      color: '#fff'
    },
    '& *:-moz-placeholder': {
      color: '#fff'
    },
    '& *::-moz-placeholder': {
      color: '#fff'
    },
    '& *:-ms-input-placeholder': {
      color: '#fff'
    }
  },
  title: {
    float: 'left'
  },
  search: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    font: 'inherit',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit * 9}px`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    color: 'inherit',
    'flex-grow': 1,
    '&:focus': {
      outline: 0
    }
  }
});
