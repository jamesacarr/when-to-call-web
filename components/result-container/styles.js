export default theme => ({
  root: theme.mixins.gutters({
    paddingTop: theme.spacing.unit * 4,
    flex: '1 1 100%',
    maxWidth: '100%',
    margin: '0 auto'
  }),
  [theme.breakpoints.up(900 + (theme.spacing.unit * 6))]: {
    root: {
      maxWidth: 1200
    }
  }
});
