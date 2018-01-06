//server.js
'use strict'
//first we import our dependencies…
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

//and create our instances
var app = express();
var router = express.Router();

//const config = require('./src/app/model/config');

require('dotenv').load();

console.log('-------=========process.env.NODE_ENV: ' + process.env.NODE_ENV)

var port = 3001;
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}else{
  port = process.env.PORT;
}

app.set('port', port);

// const db = process.env.DB_URL;
// console.log('=====db url: ' + db)
// mongoose.Promise = global.Promise;

// Using `mongoose.connect`...
// var promise = mongoose.connect(db, {
//   useMongoClient: true,
//   /* other options */
// });

// app.use(cookieParser());


// promise.then(function(db) {


  if (app.get('env') === 'development') var dev = true;

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  //app.use(cors());

  //To prevent errors from Cross Origin Resource Sharing, we will set 
  //our headers to allow CORS with middleware like so:
  app.use(function(req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Credentials', 'true');
   res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  //and remove cacheing so we get the most recent comments
   res.setHeader('Cache-Control', 'no-cache');
   next();
  }); 


  app.use(express.static(__dirname + "/dist"));

  







  //now we can set the route path & initialize the API
  //Define our routes
  var amazonRoutes = require('./src/app/routes/amazonRoutes');
  

  //Use our router configuration when we call /api
  app.use('/api/amazon', amazonRoutes);

  //dev error handler
  // if (dev){
  //   app.use(logger('dev'));
  // }

  //require('./init/init');

  // production error handler
  app.use(function(err, req, res, next){
    res.status(err.status || 500).send();
  })

  app.get('*', function (req, res) {
     res.sendFile(path.resolve(__dirname + "/dist/index.html"));
  });

  app.on('listening',function(){
    console.log('ok, server is running');
  });

  //starts the server and listens for requests
  app.listen(app.get('port'), function() {
   console.log(`API running on port ${port} `);

   console.log("You made it! You're here!");
  });

// }); //end promise.then(function(db) {