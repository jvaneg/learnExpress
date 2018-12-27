# PC Repair Website

A simple PC Repair website with a homepage, about page, services list, and contact form.
Uses an express backend with the pug template engine and bootstrap.

Main things I learned:
- how to setup a project skeleton with the express-generator
- how to configure and use the basics of the pug/jade template engine for html
- how to use routers for routes instead of raw express get/post
- how to use some basic bootstrap classes such as the grid, jumbotron, cards, forms, etc
- how to parse JSON files to display a dynamic number of elements
- how to configure and use the nodemailer node module

# Install/Run
Install:
```
npm install
```
Run:
```
npm start
```

## Note
To use the emailer in this project you will have to sub in real emails/auth info in the services.js file.
