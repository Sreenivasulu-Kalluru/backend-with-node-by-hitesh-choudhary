// * try catch and async - await (or) use Promise

module.exports = (func) => (req, res, next) =>
  Promise.resolve(func(req, res, next)).catch(next);
