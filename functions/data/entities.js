const utils = require("../utils");

class Post {
    constructor(id, title, text, timestamp) {
        this.id = id;
        this.title = title;
        this.text = text
            .replace(new RegExp(/link\((.*?)\)/, 'g'), `<a href="$1" target="_blank">$1</a>`)
            .replace(new RegExp(/\\n/, 'g'), "<br />")
            .replace(new RegExp(/img\((.*?)\)/, 'g'), `<img src="$1" class="img-fluid" />`);
        this.date = utils.toDate(timestamp).toDateString();
    }
}

class Video {
    constructor(id, embedUrl, title, topic) {
        this.id = id;
        this.embedUrl = embedUrl;
        this.title = title;
        this.topic = topic;
    }
}

class Image {
    constructor(id, name, url) {
        this.id = id;
        this.name = name;
        this.url = url;
    }
}

class Link {
    constructor(id, url, topic) {
        this.id = id;
        this.url = url;
        this.topic = topic;
    }
}

class Topic {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

exports.post = function(dataObject) {
    return new Post(dataObject.id, dataObject.data.Title, dataObject.data.Text, dataObject.data.Date.seconds);
}

exports.video = function(dataObject) {
    return new Video(dataObject.id, dataObject.data.embedUrl, dataObject.data.title, dataObject.data.topic);
}

exports.image = function(dataObject) {
    return new Image(dataObject.id, dataObject.data.name, dataObject.data.url);
}

exports.link = function(dataObject) {
    return new Link(dataObject.id, dataObject.data.url, dataObject.data.topic);
}

exports.topic = function(dataObject) {
    return new Topic(dataObject.id, dataObject.data.name);
}