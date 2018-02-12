export const arrayToObject = (arr, key, transform) => arr.reduce((obj, item) => {
  obj[item[key]] = transform ? transform(item) : item;
  return obj;
}, {});

export default {
  arrayToObject
};
