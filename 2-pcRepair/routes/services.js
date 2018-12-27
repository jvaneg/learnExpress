const express = require('express');
const router = express.Router();
const fs = require("fs"); //filesystem node module

var results;
// reads the specified file, if it exists, and parses the json content
// data - input from the file
// NOTE: readFile seems to read from the directory in which the main app.js was run
console.log(__dirname);
fs.readFile("json/services.json", "utf8", function(err, data)
{
  if(err)
  {
    // if the file fails to open
    throw err;
  }
  else
  {
    //parses the file data and puts in in the results var
    results = JSON.parse(data);
  }
});

/* GET services page. */
router.get('/', function(req, res, next) {
  res.render('services', 
    { 
      title: 'Services',
      services: results
    });
});

module.exports = router; //to use this from another file need the export
