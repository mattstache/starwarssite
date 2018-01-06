'use strict';

var amazon = require('../controllers/amazon.controller.js');
var express = require('express');

var router = express.Router();

router.get('/', function(req, res){
  res.status(200).send('API initialized - test')
});

router.get('/search', amazon.search);

module.exports = router;