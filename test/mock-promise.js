export default () => {
  const mock = jest.fn();
  mock.promises = [];

  mock.mockImplementation(() => {
    const promise = {};
    promise.promise = new Promise((resolve, reject) => {
      promise.resolve = resolve;
      promise.reject = reject;
    });

    mock.promises.push(promise);

    return promise.promise;
  });

  return mock;
};
