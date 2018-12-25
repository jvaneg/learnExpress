const express = require("express"); //require express module
const path = require("path"); //require the path module for doing stuff with filepaths
const bodyParser = require("body-parser"); //the body parser module for parsing POST reqs

const app = express()

app.use(bodyParser.json()); //middleware setup to use body-parser
app.use(bodyParser.urlencoded({extended: false}));

//setting up static webserver stuff
app.use(express.static(path.join(__dirname, "resources")));

//route for GET requests to helloworld (/helloworld)
app.get('/helloworld', function(req, res)
{
    res.send("Hello world");
});

//route for GET requests to /about2
//note: the syntax here for an inline callback is equivalent to the root route
app.get("/about2", (req, res) =>
{
    res.send("<h1>About</h1>");
});

//route for GET requests to /users/:name
//:name implies its a dynamic parameter, retrieved with req.params.name
app.get("/users/:name", (req, res) =>
{
    let user = req.params.name; //let is scoped only to this block
    res.send("<h1>" + user + "</h1>");
});

//route for json
app.get("/users", (req,res) =>
{
    //array of users
    let users = [
        {
            firstName: 'Joel',
            lastName: "van Egmond",
            age: 24,
            gender: "male"
        },
        {
            firstName: 'Trent',
            lastName: "van Egmond",
            age: 59,
            gender: "male"
        }
    ];

    //convers users to json and sends it as response
    res.json(users);
});

//route for downloading a file
//causes the client to get a prompt to download the specified file
app.get('/download', (req,res) =>
{
    //lets the user download cat.jpg
    res.download(path.join(__dirname, "/resources/cat.jpg"));
});

//route to redirect requests to /about to /about.html
app.get("/about", (req, res) =>
{
    res.redirect("/about.html");
});

//route for handling post requests (in this case from our form)
app.post("/subscribe", (req, res) =>
{
    //parsed with body-parser, from the POST req
    let name = req.body.name;
    let email = req.body.email;

    console.log(name + " has registered with email: " + email);

    res.send("gottem");
});

//start the server
app.listen(3000, function()
{
    console.log("Server started on port 3000...")
});