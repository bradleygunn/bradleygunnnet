const graphQlTools = require("graphql-tools");
const resolver = require("./executor");

const schema = `
type Post {
    id: String
    title: String
    text: String
    date: String
}
type Video {
    id: String
    embedUrl: String
    title: String
    topic: String
}
type Image {
    id: String
    name: String
    url: String
}
type Link {
    id: String
    url: String
    topic: String
}
type Topic {
    id: String
    name: String
    videos: [Video]
    links: [Link]
}
type Query {
    posts: [Post]
    post(id: String!): Post
    videos: [Video]
    links: [Link]
    images: [Image]
    topics: [Topic]
}
`;

export default makeExecutableSchema({
    typeDefs: schema,
    resolver
});