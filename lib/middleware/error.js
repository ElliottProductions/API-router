// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message;

  if (err.name?.startsWith('Sequelize')) {
    message = err.errors.map((e) => e.message).join();
    status = 400;
  }

  if (status === 500 && process.env.NODE_ENV === 'production') {
    message = 'Unexpected server error';
  }
  res.status(status);

  if (process.env.NODE_ENV !== 'test' || status === 500) {
    // eslint-disable-next-line no-console
    console.log(err);
  }

  res.send({ status, message });
};
