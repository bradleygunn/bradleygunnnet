const utils = require("../utils");

/**
 * @typedef Post
 * @type {object}
 * @property {string} Id
 * @property {string} Title
 * @property {string} Text
 * @property {Date} Date
 */
class Post {
    /**
     * @param {string} id
     * @param {string} title 
     * @param {string} text 
     * @param {number} timestamp seconds
     */
    constructor(id, title, text, timestamp)
    {
        /**
         * @type {string}
         */
        this.Id = id;

        /**
         * @type {string}
         */
        this.Title = title;

        /**
         * @type {string}
         */
        this.Text = text
            .replace(new RegExp(/link\((.*?)\)/, 'g'), `<a href="$1" target="_blank">$1</a>`)
            .replace(new RegExp(/\\n/, 'g'), "<br />")
            .replace(new RegExp(/img\((.*?)\)/, 'g'), `<img src="$1" class="img-fluid" />`);

        /**
         * @type {Date}
         */
        this.Date = utils.toDate(timestamp);
    }
}

/**
 * @description creates a post object
 * @param {string} id
 * @param {string} title 
 * @param {string} text 
 * @param {number} timestamp seconds
 * @returns {Post} post object
 */
exports.post = function(id, title, text, timestamp) {
    return new Post(id, title, text, timestamp);
}