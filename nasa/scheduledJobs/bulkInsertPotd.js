var async = require("async");
var nasaAPIService = require('../serverServices/nasaAPIService.js');
var models = require('../models');

module.exports = {
  execute: function() {
    endDate = new Date(2015, 9, 31);
    startDate = new Date(2015, 8, 1);
    var dates = this.getDates(startDate, endDate);
    console.log('insert bulk for dates : '+startDate+' to '+endDate);
    var potds = [];

    // 1st para in async.each() is the array of items
    async.each(dates,
      // 2nd param is the function that each item is passed to
      function(date, callback){
        // Call an asynchronous function, often a save() to DB
        nasaAPIService.getPotd(function(res){
          if (res) {
            var data = JSON.parse(res);
            console.log(data);
            console.log('response received for date : ' +date);
            var mediaType = data.media_type;
            var dateFormattedForInsert;
            if (data.date) {
              dateFormattedForInsert = data.date;
            } else {
              var year = date.getFullYear();
              var month = date.getMonth() + 1;
              var monthFormatted = ('0'+month).substring(month.toString().length-1,month.toString().length+1);
              var day = date.getDate();
              var dayFormatted = ('0'+day).substring(day.toString().length-1,day.toString().length+1);
              dateFormattedForInsert = year+"-"+monthFormatted+"-"+dayFormatted;
              console.log('date was not present : '+dateFormattedForInsert);
            }
            var potdJSON = {
              date:data.date,
              title:data.title,
              explanation:data.explanation,
              hdurl:data.hdurl,
              url:data.url,
              copyright:data.copyright,
              mediaType:mediaType
            };
            potds.push(potdJSON);
            callback();
          }
        }, date)
      },
      // 3rd param is the function to call when everything's done
      function(err) {
        // All tasks are done now
        console.log('insert bulk finished');
        models.potd.bulkCreate(potds);
      }
    );
  },
  getDates: function(startDate, stopDate) {
      var dateArray = new Array();
      var currentDate = startDate;
      while (currentDate <= stopDate) {
          dateArray.push( new Date (currentDate) );
          var dat = new Date(currentDate.valueOf())
          dat.setDate(dat.getDate() + 1);
          currentDate = dat;
      }
      return dateArray;
  }
}
