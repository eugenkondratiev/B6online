
async function getArray(_collection) {
    const mongoClient = await require('../../db-mongo')();
    
    const collection = mongoClient._db.collection(_collection);
    try {
        const _clubsList = await collection.find({}).toArray();
        return _clubsList
    } catch (err) {
        console.error(err);
        return err;
    }
    finally {
        setTimeout(() => {
            mongoClient.client.close();
        }, 3000);
    }
}
module.exports = getArray;