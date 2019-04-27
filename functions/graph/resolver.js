const entities = require("./data/entities");

exports.resolver = {
  Query: {
    posts: (obj, args, { provider }, info) => {
      return provider.query(store => store.collection("posts")).then(dataObjects => {
          return dataObjects.map(dataObject => entities.post(dataObject));
      });
    },
    post: (obj, { id }, { provider }, info) => {
      return provider.query(store => store.collection("posts").doc(id)).then(dataObjects => {
        if (dataObjects.length > 0) {
          const dataObject = dataObjects[0];
          return entities.post(dataObject);
        }
        
        return null;
      });
    },
    videos: (obj, args, { provider }, info) => {
      return provider.query(store => store.collection("videos")).then(dataObjects => {
          return dataObjects.map(dataObject => entities.video(dataObject));
      });
    },
    links: (obj, args, { provider }, info) => {
      return provider.query(store => store.collection("links")).then(dataObjects => {
        return dataObjects.map(dataObject => entities.link(dataObject));
      });
    },
    images: (obj, args, { provider }, info) => {
      return provider.query(store => store.collection("images")).then(dataObjects => {
        return dataObjects.map(dataObject => entities.image(dataObject));
      });
    },
    topics: (obj, args, { provider }, info) => {
      return provider.query(store => store.collection("topics")).then(dataObjects => {
        return dataObjects.map(dataObject => entities.topic(dataObject));
      });
    },
    topic: (obj, { name }, { provider }, info) => {
      return provider.query(store => store.collection("topics").where("name", "==", name)).then(dataObjects => {
        if (dataObjects.length > 0) {
          const dataObject = dataObjects[0];

          return entities.topic(dataObject);
        }

        return null;
      });
    }
  },
  Topic: {
    videos: (obj, args, { provider }, info) => {
      return provider.query(store => store.collection("videos").where("topic", "==", topic.name)).then(dataObjects => {
        return dataObjects.map(dataObject => entities.video(dataObject));
      });
    },
    links: (obj, args, { provider }, info) => {
      return provider.query(store => store.collection("links").where("topic", "==", topic.name)).then(dataObjects => {
        return dataObjects.map(dataObject => entities.link(dataObject));
      });
    }
  },
};