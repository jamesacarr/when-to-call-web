export default class {
  getPlacePredictions = jest.fn((input, callback) => {
    callback(input, 'OK');
  })
}
