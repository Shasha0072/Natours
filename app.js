const express = require('express');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
const morgan = require('morgan');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on the server`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;