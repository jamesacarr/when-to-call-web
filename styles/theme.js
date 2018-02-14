import { createMuiTheme } from 'material-ui/styles';

const primary = {
  main: '#00a0c6',
  light: '#5dd1f9',
  dark: '#007195',
};

const secondary = {
  main: '#ff7f00',
  light: '#ffb043',
  dark: '#c55000',
};

export default createMuiTheme({
  palette: {
    primary,
    secondary,
  },
});
