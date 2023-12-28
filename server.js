// Good practice to seperate Server functionality (server.js) from the
// express configuration functionality (app.js)

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
