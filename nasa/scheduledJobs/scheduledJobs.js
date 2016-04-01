var models = require('../models');
var schedule = require('node-schedule');
var nasaAPIService = require('../serverServices/nasaAPIService.js');
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
      models.potd.create({
        date:data.date,
        title:data.title,
        explanation:data.explanation,
        hdurl:data.hdurl,
        url:data.url,
        copyright:data.copyright,
        mediaType:data.media_type
      })
    }
  });
});

// nasaAPIService.getPotd(function(res) {
//   if (res) {
//     var data = JSON.parse(res);
//
//   }
// }, new Date(2016, 2, 26));
