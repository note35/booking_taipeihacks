/*eslint-disable*/
var express = require('express');
var router = express.Router();

router.get('/privacy', function(req, res, next) {
  return res.sendFile( __base+'views/privacy.html' );
});

router.all('*', function(req, res, next) {
  return res.sendFile( __base+'dist/index.html' );
});

module.exports = router;