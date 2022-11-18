
const COLLECTION = 'b6data'

async function getMainData() {
    const mongoClient = await require('../../db-mongo')();
    const collection = mongoClient._db.collection(COLLECTION);
    try {
        const _mainData = await collection.find({ _id: 4414414 }).toArray();

        console.log("_mainData", _mainData);

        return _mainData[0]
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


module.exports = getMainData;