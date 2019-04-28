const express = require("express");
const hbs = require("express-hbs");
const controllers = require("./controllers");

exports.initApp = function(firestore) {
    //create controller
    const controller = controllers.controller();

    //use express server
    const app = express();

    //setup view engine
    app.engine('hbs', hbs.express3({  
        defaultLayout: './app/views/layouts/default.hbs',
        layoutsDir: './app/views/layouts'
    }));
    app.set("views", "./app/views");
    app.set("view engine", "hbs");

    //setup routes
    app.get("/", (request, response) => controller.index(response));
    app.get("/bgr", (request, response) => controller.bgr(response));
    app.get("/bgs", (request, response) => controller.bgs(response));
    app.get("/news", (request, response) => controller.news(response));
    app.get("/news/:id", (request, response) => controller.newsPost(response, request.params.id));

    return app;
}