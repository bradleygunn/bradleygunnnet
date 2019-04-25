const providers = require("./providers");

var provider;

    resolveFunctions = {
        Query: {
          posts() {
            provider._query(store => store.collection("posts")).then(posts => {
                return posts;
            });
          },
          post(_, { id }) {
            return new Promise((resolve, reject) => {
                provider._query(store => store.collection("posts").doc(id)).then(posts => {
                    if (posts.length > 0) {
                        const result = posts[0];
        
                        const returnVal = entities.post(result.id, result.data.Title, result.data.Text, result.data.Date.seconds);
    
                        resolve(returnVal);
                        return returnVal;
                    }
    
                    resolve(null);
                    return null;
                }).catch(error => reject(error));
            });
          },
          videos() {
            provider._query(store => store.collection("videos")).then(videos => {
                return videos;
            });
          },
          links() {
            provider._query(store => store.collection("links")).then(links => {
                return links;
            });
          },
          images() {
            provider._query(store => store.collection("images")).then(images => {
                return images;
            });
          },
        },
        Author: {
          post(author) {
            return posts.filter(post => post.authorId === author.id)
          }
        },
        Post: {
          author(post) {
            return authors.find(author => author.id === post.authorId)
          }
        }
    }


}
const resolveFunctions = {
    Query: {
      posts() {
        return posts
      },
      author(_, { id }) {
        return authors.find(author => author.id === id)
      }
    },
    Mutation: {
      upvotePost(_, { postId }) {
        const post = posts.find(post => post.id === postId)
        if (!post) {
          throw new Error(`Couldn't find post with id ${postId}`)
        }
        post.votes += 1
         pubsub.publish('postUpvoted', post);
        return post
      }
    },
    Author: {
      posts(author) {
        return posts.filter(post => post.authorId === author.id)
      }
    },
    Post: {
      author(post) {
        return authors.find(author => author.id === post.authorId)
      }
    }
  }