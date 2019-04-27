class Provider {
    constructor(store) {
        this.store = store;
    }

    extractData(snapshot) {
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
    
    query(queryFn) {
        return new Promise((resolve, reject) => {
            console.log(`running query: ${queryFn}`);
    
            queryFn(this.store).get().then(snapshot => {
                const result = this.extractData(snapshot);
    
                console.log(`query executed with ${result.length} results`);
    
                resolve(result)
                return result;
            }).catch(error => reject(error));
        });
    }
}

exports.initProvider = function(store) {
    return new Provider(store);
}