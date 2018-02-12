import promisify from './promisify';

const createFn = status => (input, callback) => {
  callback(input, status);
};

describe('promisify', () => {
  it('promisifies google function', () => {
    const fn = promisify(createFn('OK'));

    expect(fn('test')).toBeInstanceOf(Promise);
  });

  it('resolves when status is OK', async () => {
    const fn = promisify(createFn('OK'));
    await expect(fn('testing')).resolves.toEqual('testing');
  });

  it('resolves when status is ZERO_RESULTS', async () => {
    const fn = promisify(createFn('ZERO_RESULTS'));
    await expect(fn('testing')).resolves.toEqual('testing');
  });

  it('rejects when status is UNKNOWN_ERROR', async () => {
    const fn = promisify(createFn('UNKNOWN_ERROR'));
    await expect(fn('testing')).rejects.toEqual('UNKNOWN_ERROR');
  });
});
