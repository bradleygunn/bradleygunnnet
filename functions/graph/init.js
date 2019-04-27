const bodyParser = require("body-parser");
const express = require("express");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { printSchema } = require("graphql/utilities/schemaPrinter");
const { schema } = require("./schema");
const p = require("./data/provider");

exports.initGraph = function(firestore) {
    //use express server
    const graph = express();

    const provider = p.initProvider(firestore);

    // /graph
    graph.use(
        "/graph?",
        bodyParser.json(), 
        graphqlExpress({ schema, context: { provider: provider } })
    );

    // /graph/debug
    graph.use(
        "/graph/debug",
        graphiqlExpress({ endpointURL: "/graph" })
    );

    // /graph/schema
    graph.use("/graph/schema", (request, response) => {
        response.set("Content-Type", "text/plain");
        response.send(printSchema(schema));
    });

    return graph;
};