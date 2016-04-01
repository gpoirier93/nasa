var https = require('https');
var apiKey = "GV5BwqkiDLorofJQHZvd7u29AtEM24fq5D21vyew";

module.exports = {
  getPotd : function(callback, date) {
    var url;
    if (date) {
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      dateParam = year+"-"+month+"-"+day;
      url  = "https://api.nasa.gov/planetary/apod?api_key="+apiKey+"&date="+dateParam;
    } else {
      url = "https://api.nasa.gov/planetary/apod?api_key="+apiKey;
    }
    https.get(url, (res) => {
      res.on("data", function(data) {
          callback(data);
      });
    });
  }
}
