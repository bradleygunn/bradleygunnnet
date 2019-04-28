const bodyParser = require("body-parser");
const express = require("express");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const { resolver } = require("./resolver");
const { printSchema } = require("graphql/utilities/schemaPrinter");
const { schema } = require("./schema");
const { initProvider } = require("./data/provider");

//still in progress - for local use of graph in functions
/*exports.initGraph = function(firestore) {
    //init provider
    const provider = initProvider(firestore);

    //build schema
    const builtSchema = buildSchema(schema);

    return (query) => new Promise((resolve, reject) => {
        graphql(builtSchema, query, resolver, { provider: provider }).then(result => {
            resolve(result);
            return result;
        });
    });
}*/

exports.initGraphHttps = function(firestore) {
    //use express server
    const graph = express();

    //init provider
    const provider = initProvider(firestore);

    //make schema executable for apollo
    const execSchema = makeExecutableSchema({
        typeDefs: schema,
        resolvers: resolver
    });

    // /graph
    graph.post(
        "/graph",
        (request, response, next) => {
            console.log(`[GRAPH ENTRY] ${request.ip} querying graph: ${request.body.query}`);

            response.on("finish", () => {
                const result = response.json();

                console.log(`[GRAPH EXIT] graph query for ${request.ip} completed with status ${response.statusCode} ${response.statusMessage}`);
            });

            next();
        },
        bodyParser.json(), 
        graphqlExpress({ schema: execSchema, context: { provider: provider }})
    );

    // /graph/debug
    graph.get(
        "/graph/debug",
        graphiqlExpress({ endpointURL: "/graph" })
    );

    // /graph/schema
    graph.get("/graph/schema", (request, response) => {
        response.set("Content-Type", "text/plain");
        response.send(printSchema(execSchema));
    });

    return graph;
};