export default () => {
  const mock = jest.fn();
  const promise = new Promise((resolve, reject) => {
    mock.resolve = resolve;
    mock.reject = reject;
  });
  mock.mockReturnValue(promise);

  return mock;
};
