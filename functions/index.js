const functions = require("firebase-functions");
const express = require("express");
const hbs = require("express-hbs");
const controllers = require("./controllers");

//create controller
const controller = controllers.controller();

//use express server
const app = express();

//setup view engine
app.engine('hbs', hbs.express3({  
    defaultLayout: './views/layouts/default.hbs',
    layoutsDir: './views/layouts'
}));
app.set("views", "./views");
app.set("view engine", "hbs");

//setup routes
app.get("/", (request, response) => controller.index(response));
app.get("/bgr", (request, response) => controller.bgr(response));
app.get("/bgs", (request, response) => controller.bgs(response));
app.get("/news", (request, response) => controller.news(response));
app.get("/news/:id", (request, response) => controller.newsPost(response, request.params.id));

exports.app = functions
    .region('us-central1')
    .https.onRequest(app);