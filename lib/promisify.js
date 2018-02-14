export default original => {
  const SUCCESS_STATUS = [
    window.google.maps.places.PlacesServiceStatus.OK,
    window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS,
  ];

  // Ensure the argument is a function
  if (typeof original !== 'function') {
    throw new TypeError('Argument to promisify must be a function');
  }

  return (...args) => {
    return new Promise((resolve, reject) => {
      // Append the callback bound to the context
      args.push((data, status) => {
        if (!SUCCESS_STATUS.includes(status)) {
          return reject(status);
        }

        resolve(data);
      });

      original.call(this, ...args);
    });
  };
};
