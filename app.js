const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
// Add middleware to manipulate the original request object prior to sending
// a response (request/response cycle)

// Use environment variable to determine whether to do logging
if (process.env.NODE_ENV === 'developement') {
  app.use(morgan('dev'));
}

app.use(express.json());
// How to serve static files from folders in express
app.use(express.static(`${__dirname}/public`));

// Define our own middleware and add it to the middleware stacks (Will be
// applied to all requests)
// app.use((req, res, next) => {
//   console.log('Hello from the middleware');

//   // Always have to call `next()` at the end of a middleware function
//   // to continue the request/response cycle
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES

// Mount new routers to respective route addresses
// Good practice to specify the API version
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Add middleware to handle uncaptured request routes
app.all('*', (req, res, next) => {
  // const err = new Error(`Cannot find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;

  // Pass error object to next middleware
  // If any object is passed to `next()` NextJS will assume that it is an errot
  // and jump directly to the error middleware i.e. foo(err, res, req, next)
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`));
});

// Create middleware to handle operational errors globally
app.use(globalErrorHandler);

module.exports = app;
