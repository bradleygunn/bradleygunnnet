const entities = require("./entities");

/**
 * @description provides basic query execution logic and data extraction
 */
class BaseProvider {
    /**
     * @param {FirebaseFirestore.Firestore} store 
     */
    constructor(store) {
        /**
         * @description The reference to the Firestore object
         * @type {FirebaseFirestore.Firestore}
         */
        this._store = store;
    }

    /**
     * @description takes a QuerySnapshot or QueryDocumentShapshot and casts the results into an object array
     * @param {FirebaseFirestore.QuerySnapshot | FirebaseFirestore.QueryDocumentSnapshot} snapshot 
     * @typedef Data
     * @type {object}
     * @property {string} id
     * @property {object} data
     * @returns {Array<Data>} array of Data
     */
    _extractData(snapshot) {
        const data = [];

        //if the snapshot is a QueryShapshot it will have an empty flag
        if (snapshot.empty !== undefined) {
            if (snapshot.empty) {
                return data;
            }

            snapshot.forEach(dso => {
                data.push({ id: dso.id, data: dso.data() });
            });
        }
        //if the snapshot is a QueryDocumentShapshot it will have an exists flag
        else if (snapshot.exists !== undefined) {
            if (!snapshot.exists) {
                return data;
            }

            data.push({ id: snapshot.id, data: snapshot.data() });
        }

        //always returns an array as this makes it easier to interact with the result
        return data;
    }

    /**
     * @description runs a query against the firestore and retrieves data
     * @param {function(FirebaseFirestore.Firestore) => FirebaseFirestore.Query} queryFn
     * @returns {Promise<Array>}
     */
    _query(queryFn) {
        return new Promise((resolve, reject) => {
            console.log(`running query: ${queryFn}`);

            queryFn(this._store).get().then(snapshot => {
                const result = this._extractData(snapshot);

                console.log(`query executed with ${result.length} results`);

                resolve(result)
                return result;
            }).catch(error => reject(error));
        })
    }
}

/**
 * @description provider to use to get Posts from the Firestore
 */
class PostProvider extends BaseProvider {
    /**
     * 
     * @param {FirebaseFirestore.Firestore} store 
     */
    constructor(store) {
        super(store);
    }

    /**
     * @description get a list of posts
     * @param {number} limit how many posts to get (leave null if no limit)
     * @returns {Promise<Post[]>} posts
     */
    getPosts(limit) {
        return new Promise((resolve, reject) => {
            console.log("calling database for getPosts");

            const query = limit !== null
                ? store => store.collection("posts").limit(limit)
                : store => store.collection("posts");

            this._query(query).then(queryResults => {
                const returnVal = queryResults.map(result => entities.post(result.id, result.data.Title, result.data.Text, result.data.Date.seconds));

                resolve(returnVal);
                return returnVal;
            }).catch(error => reject(error));
        });
    }

    /**
     * @description get a single post
     * @param {string} postId
     * @returns {Promise<Post>} post
     */
    getPost(postId) {
        return new Promise((resolve, reject) => {
            console.log("calling database for getPost");

            this._query(store => store.collection("posts").doc(postId)).then(queryResults => {
                if (queryResults.length > 0) {
                    const result = queryResults[0];
    
                    const returnVal = entities.post(result.id, result.data.Title, result.data.Text, result.data.Date.seconds);

                    resolve(returnVal);
                    return returnVal;
                }

                reject(new Error("not found"));
                return null;
            }).catch(error => reject(error));
        });
    }
}

/**
 * @param {FirebaseFirestore.Firestore} store
 * @returns {PostProvider}
 */
exports.postProvider = function(store) {
    return new PostProvider(store);
}

exports.provider = function(store) {
    return new BaseProvider(store);
}