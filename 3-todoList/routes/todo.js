const express = require('express');
const router = express.Router();
const ObjectID = require("mongodb").ObjectID; //used for sending queries, wrap text object id into objectID object


// POST /add router
router.post("/add", (req, res, next) =>
{
    //create todo object to insert into db
    const todo = {
        text: req.body.text,
        body: req.body.body
    };

    // insert into db
    todosCollection.insertOne(todo, (err, result) =>
    {
        if(err)
        {
            return console.log(err);
        }
        console.log("Todo added");
        res.redirect('/');
    });
    
});

// DELETE route for specific id
router.delete("/delete/:id", (req, res, next) =>
{
    const query = {_id: ObjectID(req.params.id)}; //format the delete query
    //delete one element
    todosCollection.deleteOne(query, (err, response) =>
    {
        if(err)
        {
            return console.log(err);
        }
        console.log("Todo removed");
        res.send(200); //200 response -> everything is good http
    });
});

/* Get route to edit an a todo by its ID */
// actually just shows the edit page and retrieves the data for it from the db, doesnt store the edit yet
router.get('/edit/:id', function(req, res, next) 
{
    const query = {_id: ObjectID(req.params.id)}; //builds the query with the todo id
    var allTodos;

    todosCollection.find({}).toArray((err, todosList) =>
    {
        if(err)
        {
            return console.log(err);
        }
        else
        {
            allTodos = todosList;

            //finds one that matches the query
            todosCollection.find(query).next((err, todo) =>
            {
                if(err)
                {
                    return console.log(err);
                }
                else
                {
                    //sends the todo to the ejs page edit.ejs as a variable
                    res.render("edit", 
                    {
                        todo: todo,
                        todos: allTodos
                    });
                }
            });
        }
    });

    
});

// POST /edit/id router
// actually edits the todo entry in the db
router.post("/edit/:id", (req, res, next) =>
{
    const query = {_id: ObjectID(req.params.id)}; //format the edit query
    //create todo object to insert into db
    const todo = {
        text: req.body.text,
        body: req.body.body
    };

    // update todo in db
    // updateOne(<filter>, <update>, <callback(<error>, <result>)>)
    // in this case we arent using the result document, just checking the error
    todosCollection.updateOne(query, {$set: todo}, (err, result) =>
    {
        if(err)
        {
            return console.log(err);
        }
        console.log("Todo updated");
        res.redirect('/');
    });
    
});

module.exports = router; //to use this from another file need the export