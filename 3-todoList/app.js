//entry point

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

//server port
const port = 3000;

//Initialize app
const app = express();

//configure db
const MongoClient = require("mongodb").MongoClient; //used to connect to the db, make reqs
const ObjectID = require("mongodb").ObjectID; //used for sending queries, wrap text object id into objectID object
const url = "mongodb://localhost:27017/todoapp"; //location of mongo server/db

//initialize body parser middleware
app.use(bodyParser.json()); //parses text as json
app.use(bodyParser.urlencoded({extended: false})); //parses text as URL encoded data

//initialize static fileserving from /public folder
app.use(express.static(path.join(__dirname, "public")));

//route setup
const indexRouter = require("./routes/index");
const todoRouter = require("./routes/todo");

//view setup (template engine - EJS)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//connect to mongodb
MongoClient.connect(url, {useNewUrlParser: true}, (err, client) =>
{
    if(err) throw err;
    console.log("MongoDB Connected...");

    var db = client.db("todoapp");
    todosCollection = db.collection("todos"); //this variable is GLOBAL, probably bad practice

    //start listening
    //in the callback to ensure it happens AFTER the db connects
    app.listen(port, () => 
    {
        console.log("Server running on port " + port);
    });
});

//routes
app.use("/", indexRouter);
app.use("/todo", todoRouter);