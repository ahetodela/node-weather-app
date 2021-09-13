const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const path = require("path");
const hbs = require("hbs");
const fs = require("fs");
const express = require("express");

const app = express(); //call the express function since express is only a function
const port = process.env.PORT || 3000;
//definitions for Express path configurations
const publicDirecPath = path.join(__dirname, "../public"); //store the actual path to the public folder
const viewsPath = path.join(__dirname, "../templates/views"); //changing the path of the views folder

/* New partials code */
const partialsPath = path.join(__dirname, "../templates/partials");
let partialFileNames = fs.readdirSync(partialsPath);
partialFileNames.forEach((filename) => {
    let matches = /^([^.]+).hbs$/.exec(filename);
    if (!matches) {
        return;
    }
    let partialName = matches[1];
    let partialTemplate = fs.readFileSync(
        partialsPath + "/" + filename,
        "utf-8"
    );
    hbs.registerPartial(partialName, partialTemplate);
});
/* ==========End of partials code======== */

//const partialsPath = path.join(__dirname, "..templates/partials"); //get the path to the partials to be used eg header and footer

//setting up handlebars and views locations
app.set("view engine", "hbs"); //setting up the handler bars for express to use
app.set("views", viewsPath); //since the path had been changed, this code as to be supplied. if the path was not changed, express would have automatically located the files in the views folder without us having to supply the path

//hbs.registerPartials(partialsPath, () => {});

app.use(express.static(publicDirecPath)); //this is done once since the entire public folder will be served to the browser. So it automatically navigates to the file which the user provided in the url. default is the index.html file

//routes
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Dela Edinam Aheto",
    });
});
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        body: "I am a software developer by profession",
        name: "Dela Edinam Aheto",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help page!!!",
        message: "These are the FAQ😎",
        name: "Dela Edinam Aheto",
    });
});
app.get("/weather", (req, res) => {
    let address = req.query.address;
    if (!address) {
        res.send({
            error: "Please provide an address",
        });
    } else {
        //call the geocode function here
        //address = address.toUpperCase();
        geocode(address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                res.send({
                    error,
                });
            } else {
                //call the forecast when things go well.
                forecast(latitude, longitude, (error, forecastData) => {
                    if (error) {
                        res.send({
                            error,
                        });
                    } else {
                        res.send({
                            forecast: forecastData,
                            location,
                            address: "Address you provided: " + address,
                        });
                    }
                });
            }
        });
        /* res.send({
            forecast: "Misty",
            location: "Tampere",
            address
        }); */
    }
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        message: "Help article not found😪",
        name: "Dela Edinam Aheto",
    });
});
app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        message: "Page not found",
        name: "Dela Edinam Aheto",
    });
});

//Listening on port
app.listen(port, () => {
    //call this method to assign a port to the server
    console.log("running on port " + port);
});

/* app.get("/help", (req, res) => {
    res.send("Hello there");
});
app.get("/about", (req, res) => {
    res.send("<h1>About Us</h1>");
}); */
