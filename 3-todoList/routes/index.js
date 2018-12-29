const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) 
{
  todosCollection.find({}).toArray((err, todos) =>
  {
    if(err)
    {
      return console.log(err);
    }
    else
    {
      //console.log(todos);
      res.render("index", 
      {
        todos: todos
      });
    }
  });
});

module.exports = router; //to use this from another file need the export