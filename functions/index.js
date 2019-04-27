const firebase = require("firebase-admin");
const functions = require("firebase-functions");
const { initApp } = require("./app/init");
const { initGraph } = require("./graph/init");

//init firebase
firebase.initializeApp(functions.config().firebase);

const app = initApp(firebase.firestore());

const graph = initGraph(firebase.firestore());

exports.graph = functions.https.onRequest(graph);

exports.app = functions
    .region('us-central1')
    .https.onRequest(app);