const provider = require("../data/provider");
const entities = require("../data/entities");

exports.graphQlResolver = {
    Query: {
      posts() {
        return new Promise((resolve, reject) => {
          provider.query(store => store.collection("posts")).then(dataObjects => {
              const returnVal = dataObjects.map(dataObject => entities.post(dataObject));

              resolve(returnVal);
              return returnVal;
          }).catch(error => reject(error));
        });
      },
      post(_, { id }) {
        return new Promise((resolve, reject) => {
            provider.query(store => store.collection("posts").doc(id)).then(dataObjects => {
                if (dataObjects.length > 0) {
                    const dataObject = dataObjects[0];
                    const returnVal = entities.post(dataObject);

                    resolve(returnVal);
                    return returnVal;
                }

                resolve(null);
                return null;
            }).catch(error => reject(error));
        });
      },
      videos() {
        return new Promise((resolve, reject) => {
          provider.query(store => store.collection("videos")).then(dataObjects => {
            const returnVal = dataObjects.map(dataObject => entities.video(dataObject));

            resolve(returnVal);
            return returnVal;
          }).catch(error => reject(error));
        });
      },
      links() {
        return new Promise((resolve, reject) => {
          provider.query(store => store.collection("links")).then(dataObjects => {
            const returnVal = dataObjects.map(dataObject => entities.link(dataObject));

            resolve(returnVal);
            return returnVal;
          }).catch(error => reject(error));
        });
      },
      images() {
        return new Promise((resolve, reject) => {
          provider.query(store => store.collection("images")).then(dataObjects => {
            const returnVal = dataObjects.map(dataObject => entities.image(dataObject));

            resolve(returnVal);
            return returnVal;
          }).catch(error => reject(error));
        });
      },
      topics() {
        return new Promise((resolve, reject) => {
          provider.query(store => store.collection("topics")).then(dataObjects => {
            const returnVal = dataObjects.map(dataObject => entities.topic(dataObject));

            resolve(returnVal);
            return returnVal;
          }).catch(error => reject(error));
        });
      },
      topic(_, { name }) {
        return new Promise((resolve, reject) => {
          provider.query(store => store.collection("topics").where("name", "==", name)).then(dataObjects => {
            if (dataObjects.length > 0) {
              const dataObject = dataObjects[0];

              const returnVal = entities.topic(dataObject);

              resolve(returnVal);
              return returnVal;
            }

            resolve(null);
            return null;
          }).catch(error => reject(error));
        });
      }
    },
    Topic: {
      videos() {
        return new Promise((resolve, reject) => {
          provider.query(store => store.collection("videos").where("topic", "==", topic.name)).then(dataObjects => {
            const returnVal = dataObjects.map(dataObject => entities.video(dataObject));

            resolve(returnVal);
            return returnVal;
          }).catch(error => reject(error));
        });
      },
      links() {
        return new Promise((resolve, reject) => {
          provider.query(store => store.collection("links").where("topic", "==", topic.name)).then(dataObjects => {
            const returnVal = dataObjects.map(dataObject => entities.link(dataObject));

            resolve(returnVal);
            return returnVal;
          }).catch(error => reject(error));
        });
      }
    }
};

export default graphQlResolver;