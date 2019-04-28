exports.schema = `
# news, blog post, article
type Post {
    # auto generated id
    id: String
    # title of the post
    title: String
    # main content of the post
    text: String
    # date when the post was created
    date: String
}
# A reference to a video hosted on YouTube
type Video {
    # auto generated id
    id: String
    # the url of the video used for embedding
    embedUrl: String
    # title of the video
    title: String
    # the name of the topic that the video belongs to
    topic: String
}
# A reference to an image hosted somewhere on the clearnet
type Image {
    # auto generated id
    id: String
    # a text reference to the image
    name: String
    # url of image
    url: String
    # image group
    group: String
}
# A link to somewhere on the clearnet
type Link {
    # auto generated id
    id: String
    # url of the link
    url: String
    # the name of the topic that the link belongs to
    topic: String
}
# A topic is used to group some entities such as videos and link can belong to a topic
type Topic {
    # auto generated id
    id: String
    # name of the topic
    name: String
    # get all videos for the topic
    videos: [Video]
    # get all links for the topic
    links: [Link]
    # get all images for the topic
    images: [Image]
    # get all images by group for the topic
    images(group: String): [Image]
}
# query the graph
type Query {
    # get all posts
    posts: [Post]
    # get single post by id
    post(id: String): Post
    # get all videos
    videos: [Video]
    # get all links
    links: [Link]
    # get all images
    images: [Image]
    # get all images by group
    images(group: String): [Image]
    # get single image by name
    image(name: String): Image
    # get all topics
    topics: [Topic]
    # get single topic by name
    topic(name: String): Topic
}
`;