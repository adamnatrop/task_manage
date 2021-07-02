const express = require("express");
const session = require('express-session');
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const MongoStore = require("connect-mongo");


// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/task_manage", 

  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);
mongoose.Promise = global.Promise;
const db = mongoose.connection

// use for storing session data (usually browser tokens)
app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/task_manage"})
}));

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);




// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
