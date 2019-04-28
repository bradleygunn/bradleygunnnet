const entities = require("./data/entities");

exports.resolver = {
  Query: {
    posts: (obj, args, { provider }, info) => {
      console.log(`[GRAPH RESOLVER] resolving posts`);
      return provider.query(store => store.collection("posts")).then(dataObjects => {
          return dataObjects.map(dataObject => entities.post(dataObject));
      }).catch(error => {
        throw error;
      });
    },
    post: (obj, { id }, { provider }, info) => {
      console.log(`[GRAPH RESOLVER] resolving post with id = ${id}`);
      return provider.query(store => store.collection("posts").doc(id)).then(dataObjects => {
        if (dataObjects.length > 0) {
          const dataObject = dataObjects[0];
          return entities.post(dataObject);
        }
        
        return null;
      }).catch(error => {
        throw error;
      });
    },
    videos: (obj, args, { provider }, info) => {
      console.log(`[GRAPH RESOLVER] resolving videos`);
      return provider.query(store => store.collection("videos")).then(dataObjects => {
          return dataObjects.map(dataObject => entities.video(dataObject));
      }).catch(error => {
        throw error;
      });
    },
    links: (obj, args, { provider }, info) => {
      console.log(`[GRAPH RESOLVER] resolving links`);
      return provider.query(store => store.collection("links")).then(dataObjects => {
        return dataObjects.map(dataObject => entities.link(dataObject));
      }).catch(error => {
        throw error;
      });
    },
    images: (obj, { group }, { provider }, info) => {
      if (group !== undefined)
      {
        console.log(`[GRAPH RESOLVER] resolving images with group = ${group}`);
        return provider.query(store => store.collection("images").where("group", "==", group)).then(dataObjects => {
          return dataObjects.map(dataObject => entities.image(dataObject));
        }).catch(error => {
          throw error;
        });
      } else {
        console.log(`[GRAPH RESOLVER] resolving images`);
        return provider.query(store => store.collection("images")).then(dataObjects => {
          return dataObjects.map(dataObject => entities.image(dataObject));
        }).catch(error => {
          throw error;
        });
      }
    },
    image: (obj, { name }, { provider }, info) => {
      console.log(`[GRAPH RESOLVER] resolving image with name = ${name}`);
      return provider.query(store => store.collection("images").where("name", "==", name)).then(dataObjects => {
        if (dataObjects.length > 0) {
          const dataObject = dataObjects[0];
          return entities.image(dataObject);
        }
        
        return null;
      }).catch(error => {
        throw error;
      });
    },
    topics: (obj, args, { provider }, info) => {
      console.log(`[GRAPH RESOLVER] resolving topics`);
      return provider.query(store => store.collection("topics")).then(dataObjects => {
        return dataObjects.map(dataObject => entities.topic(dataObject));
      }).catch(error => {
        throw error;
      });
    },
    topic: (obj, { name }, { provider }, info) => {
      console.log(`[GRAPH RESOLVER] resolving topic with name = ${name}`);
      return provider.query(store => store.collection("topics").where("name", "==", name)).then(dataObjects => {
        if (dataObjects.length > 0) {
          const dataObject = dataObjects[0];

          return entities.topic(dataObject);
        }

        return null;
      }).catch(error => {
        throw error;
      });
    },
  },
  Topic: {
    videos: (topic, args, { provider }, info) => {
      console.log(`[GRAPH RESOLVER] resolving videos for topic ${topic.name}`);
      return provider.query(store => store.collection("videos").where("topic", "==", topic.name)).then(dataObjects => {
        return dataObjects.map(dataObject => entities.video(dataObject));
      }).catch(error => {
        throw error;
      });
    },
    links: (topic, args, { provider }, info) => {
      console.log(`[GRAPH RESOLVER] resolving links for topic ${topic.name}`);
      return provider.query(store => store.collection("links").where("topic", "==", topic.name)).then(dataObjects => {
        return dataObjects.map(dataObject => entities.link(dataObject));
      }).catch(error => {
        throw error;
      });
    },
    images: (topic, { group }, { provider }, info) => {
      if (group !== undefined)
      {
        console.log(`[GRAPH RESOLVER] resolving images with group = ${group} for topic ${topic.name}`);
        return provider.query(store => store.collection("images").where("topic", "==", topic.name).where("group", "==", group)).then(dataObjects => {
          return dataObjects.map(dataObject => entities.image(dataObject));
        }).catch(error => {
          throw error;
        });
      } else {
        console.log(`[GRAPH RESOLVER] resolving images for topic ${topic.name}`);
        return provider.query(store => store.collection("images").where("topic", "==", topic.name)).then(dataObjects => {
          return dataObjects.map(dataObject => entities.image(dataObject));
        }).catch(error => {
          throw error;
        });
      }
    },
  },
};
