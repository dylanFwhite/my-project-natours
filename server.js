// Good practice to seperate Server functionality (server.js) from the
// express configuration functionality (app.js)

// Add 'safety net' event listener that captures any unhandled rejections
process.on('unhandledRejection', (err) => {
  console.log(err.name);
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');

  process.exit(1);
});

// Add 'safety net' event listener that captures any uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name);

  process.exit(1);
});

const dotenv = require('dotenv');
const mongoose = require('mongoose');
// Run code in app file after configuring the .env vars
const app = require('./app');

// Import environment variables
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB Connection Successful!');
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
