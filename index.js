// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date", function(req, res) {
  date_string = req.params.date;

  if (Number(date_string)) {
    date_string = Number(date_string);
  }
    date = new Date(date_string);

    data = {
      unix: Date.parse(date),
      utc: new Date(date).toUTCString()
    }

    
    if (data.unix == null || data.utc == "Invalid Date") {
      res.json({ error : "Invalid Date" });
    } else {
      res.json(data);
    }
});

app.get("/api", function(req, res) {
  date = new Date();

  data = {
    unix: Date.parse(date),
    utc: new Date(date).toUTCString()
  }

  res.json(data);
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
