class Provider {
    constructor(firestore) {
        this.firestore = firestore;
    }

    extractData = function(snapshot) {
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
    };
    
    query = function(queryFn) {
        return new Promise((resolve, reject) => {
            console.log(`running query: ${queryFn}`);
    
            queryFn(this.firestore).get().then(snapshot => {
                const result = extractData(snapshot);
    
                console.log(`query executed with ${result.length} results`);
    
                resolve(result)
                return result;
            }).catch(error => reject(error));
        });
    };
};

exports.createProvider = (firestore) => new Provider(firestore);