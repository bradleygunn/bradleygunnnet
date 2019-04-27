class Controller {
    constructor(resolver, provider) {
        this.resolver = resolver;
        this.provider = provider;
    }

    /**
     * @description sets up cache control rules for response
     * @param {Response} response 
     * @param {boolean} cacheOnCdn caches on cdn when set to true
     * @param {number} browserCacheTimeout seconds 
     * @param {number} cdnCacheTimeout seconds
     */
    setResponseCacheControl(response, cacheOnCdn, browserCacheTimeout, cdnCacheTimeout) {
        if (cacheOnCdn === true) {
            response.set("Cache-Control", `public, max-age=${browserCacheTimeout}, s-maxage=${cdnCacheTimeout}`);
        } else {
            response.set("Cache-Control", `private, max-age=${browserCacheTimeout}`);
        }
    }

    /**
     * @description Home page
     * @param {Response} response 
     * @returns {void} renders html
     */
    index(response) {
        console.log("running index page");

        console.log("setting cache rules")
        this.setResponseCacheControl(response, true, 86400, 604800);

        console.log("rendering result to html");
        return response.render("index", {
            meta: {
                description: "The life of Bradley Gunn. Episodes include Bradley Gunn Raver and Bradley Gunn Sailor",
                image: "https://drive.google.com/uc?export=view&id=1I_kymQQQ0w7uhNrN9ZITwyJc1Bl5Zwc3"
            }
        });
    }

    /**
     * @description Bradley Gunn Raver page
     * @param {Response} response 
     * @returns {void} renders html
     */
    bgr(response) {
        console.log("running Bradley Gunn Raver page");

        console.log("setting cache rules")
        this.setResponseCacheControl(response, true, 86400, 604800);

        console.log("rendering result to html");
        return response.render("bgr", {
            meta: {
                title: "BGR",
                description: "Read the story of Bradley Gunn Raver. Watch videos, listen to music and read more articles. The life of Bradley Gunn. Episodes include Bradley Gunn Raver and Bradley Gunn Sailor.",
                image: "https://drive.google.com/uc?export=view&id=1-8T0GOUxmvvwDZrYLG4dWeKgw8oCV5KM"
            }
        });
    }

    /**
     * @description Bradley Gunn Sailor page
     * @param {Response} response 
     * @returns {void} renders html
     */
    bgs(response) {
        console.log("running Bradley Gunn Sailor page");

        console.log("setting cache rules")
        this.setResponseCacheControl(response, true, 86400, 604800);

        console.log("rendering result to html");
        return response.render("bgs", {
            meta: {
                title: "BGS",
                description: "Read the story of Bradley Gunn Sailor. Episodes include Bradley Gunn Raver and Bradley Gunn Sailor.",
                image: "https://drive.google.com/uc?export=view&id=1497TN_mUfFGpiR_Izs9JXjw1uue-Qfki"
            }
        });
    }

    /**
     * @description posts feed page
     * @param {Response} response 
     * @returns {void} renders html
     */
    news(response) {
        console.log("running news page");
        const providerArg = function(p) { return { provider: p } }(this.provider);

        console.log(`parsing ${providerArg.provider} to resolver`);

        this.resolver.Query.posts(null, null, providerArg, null).then(posts => {
            console.log("rendering result to html");
            return response.render("posts", { 
                posts,
                meta: {
                    title: "News",
                    description: "Bradley Gunn News",
                    image: "https://drive.google.com/uc?export=view&id=1I_kymQQQ0w7uhNrN9ZITwyJc1Bl5Zwc3"
                }
            });
        }).catch(error => {
            return response.status(500).send(error);
        });
    }

    newsPost(response, postId) {
        console.log(`running news post page for postId: ${postId}`);
        const providerArg = function(p) { return { p } }(this.provider);

        this.resolver.Query.postId(null, { postId }, providerArg, null).then(post => {
            console.log("rendering result to html");
            return response.render("posts", { 
                post,
                meta: {
                    title: post.Title,
                    description: "Bradley Gunn News",
                    image: "https://drive.google.com/uc?export=view&id=1I_kymQQQ0w7uhNrN9ZITwyJc1Bl5Zwc3"
                }
            });
        }).catch(error => {
            return response.status(500).send(error);
        });
    }
}

/**
 * @returns {Controller} controller
 */
exports.controller = function(resolver, provider) {
    return new Controller(resolver, provider);
}