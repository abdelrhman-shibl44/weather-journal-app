// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require("express");
// Require bodyParser to parse the data and convert it to json file
const bodyParser = require("body-parser");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
// to allow client side and server side talk to each other
const cors = require("cors");
// use cors as middle-ware.
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
const port = process.env.PORT || 8080;
const server = app.listen(port, listening);
function listening() {
    //test our server 
    console.log(`message from server`);
    console.log(`your port is ${port}`);
};
// add get route to send all data to our app;
app.get("/all", (req, res) => {
    res.send(projectData); // send data to app.js by "/all" path;
});
// add post route to store and save coming data;
app.post("/sendWeatherData", (req, res) => {
    let body = req.body
    const newEntry = {
        temprature: body.temp,
        date: body.date,
        userResponse: body.user
    };
    // put the data into our object;
    projectData = newEntry;
    // send the data for test 
    res.send(projectData)
});
// end coding;