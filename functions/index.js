const firebase = require("firebase-admin");
const functions = require("firebase-functions");
const { initApp } = require("./app/init");
const { initGraph, initGraphHttps } = require("./graph/init");

//init firebase
firebase.initializeApp(functions.config().firebase);
const firestore = firebase.firestore();

const app = initApp();

const graph = initGraphHttps(firestore);

exports.graph = functions
    .region('us-central1')
    .https.onRequest(graph);

exports.app = functions
    .region('us-central1')
    .https.onRequest(app);