var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NASA' });
});
router.get('/potd/*', function(req, res, next) {
  res.render('index', { title: 'NASA' });
});

/* GET potd */
router.get('/api/v1/potd/:date?', function(req, res, next) {
  if (req.params.date) {
    console.log(req.params.date);
    models.potd.find({
      where: {
        date: req.params.date
      }
    }).then(function(potds) {
      console.log('yeah')
      return res.json(potds);
    });
  } else {
    models.potd.findAll().then(function(potds) {
      console.log('yeah')
      return res.json(potds);
    });
  }
});

module.exports = router;
