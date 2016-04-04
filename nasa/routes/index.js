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
      return res.json(potds);
    });
  } else {
    var offset = req.query.offset;
    console.log(offset);
    var limit = 30;
    models.potd.findAll({
      offset: offset,
      limit: limit,
      order: [['date', 'DESC']]
    }).then(function(potds) {
      return res.json(potds);
    });
  }
});

module.exports = router;
