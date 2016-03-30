var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var config = require(path.join(__dirname, '../', '../', 'config'));
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NASA' });
});

/* GET potd */
router.get('/api/v1/potd/:id?', function(req, res, next) {
    var results = [];
    // Grab data from http request
    var data = {text: req.body.text, complete: false};

    // Get a Postgres client from the connection pool
    pg.connect(config.db, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query;
        if (req.params.id) {
          query = client.query("SELECT * FROM potd WHERE id = $1", req.params.id);
        } else {
          query = client.query("SELECT * FROM potd ORDER BY date ASC");
        }

        // Stream results back one row at a time
        query.on('row', function(row) {
            // console.log(row.date);
            // console.log(moment(row.date, 'yyyy-MM-dd'T'HH:mm:ss.SSSz').today());
            // row.formattedDate = moment(row.date, 'yyyy-MM-dd'T'HH:mm:ss.SSSz').format('MMMM Do YYYY')
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
});

router.post('/api/v1/potd', function(req, res, next) {
    var results = [];
    // Grab data from http request
    var data = {text: req.body.text, complete: false};

    // Get a Postgres client from the connection pool
    pg.connect(config.db, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO potd(date, title, description, hdurl, url) values($1, $2, $3, $4, $5)", [data.date, data.title, data.description, data.hdurl, data.url]);
        // SQL Query > Select Data
        var query = client.query("SELECT * FROM potd ORDER BY date ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
});

module.exports = router;
