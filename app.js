const express = require('express');
const morgan = require('morgan');

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
app.use((req, res, next) => {
  console.log('Hello from the middleware');

  // Always have to call `next()` at the end of a middleware function
  // to continue the request/response cycle
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES

// Mount new routers to respective route addresses
// Good practice to specify the API version
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
