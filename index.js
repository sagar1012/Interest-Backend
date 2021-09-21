var express = require("express"),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    app = express(),
    mongoose = require("mongoose");


mongoose.connect('mongodb://localhost:27017/interest', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});


app.listen(3001, () => {
    console.log("HTTP Server running on port " + 3001);
});

var routes = require("./src/routes/routes");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: "50mb",
        parameterLimit: 50000,
    })
);

app.use("/", cors(corsOptions), routes);

module.exports = app;