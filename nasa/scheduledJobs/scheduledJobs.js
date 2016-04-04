var models = require('../models');
var schedule = require('node-schedule');
var nasaAPIService = require('../serverServices/nasaAPIService.js');
var bulkInsertPotd = require('./bulkInsertPotd.js');
var fs = require('fs');
var pg = require('pg');
var path = require('path');
var config = require(path.join(__dirname, '../', '../', 'config'));

var potdScheduledJob = schedule.scheduleJob({ hour: 01, minute: 00 }, function() {
  console.log('Time for potdScheduledJob');
  console.log(new Date());
  nasaAPIService.getPotd(function(res) {
    if (res) {
      var data = JSON.parse(res);
      var mediaType = data.media_type;
      models.potd.create({
        date:data.date,
        title:data.title,
        explanation:data.explanation,
        hdurl:data.hdurl,
        url:data.url,
        copyright:data.copyright,
        mediaType:mediaType
      })
    }
  });
});

// var potdScheduledJob = schedule.scheduleJob({ minute: 20 }, function() {
  // console.log('Time for bulkInsertJob');
  // console.log(new Date());
  // bulkInsertPotd.execute();
// });

// nasaAPIService.getPotd(function(res) {
//   if (res) {
//     var data = JSON.parse(res);
//     var mediaType = data.media_type;
//     models.potd.create({
//       date:data.date,
//       title:data.title,
//       explanation:data.explanation,
//       hdurl:data.hdurl,
//       url:data.url,
//       copyright:data.copyright,
//       mediaType:mediaType
//     })
//   }
// }, new Date(2016, 2, 22));
