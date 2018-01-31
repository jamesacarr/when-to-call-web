export default theme => ({
  '@global': {
    html: {
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
      // Change from `box-sizing: content-box` so that `width`
      // is not affected by `padding` or `border`.
      boxSizing: 'border-box'
    },
    '*, *::before, *::after': {
      boxSizing: 'inherit'
    },
    body: {
      margin: 0,
      background: theme.palette.background.default,
      '@media print': {
        background: theme.palette.common.white
      }
    }
  }
});
