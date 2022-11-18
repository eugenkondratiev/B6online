
module.exports = async ()=> {
    const mongoClient = await require('../../db-mongo')();

    const collection = mongoClient._db.collection("b6data");
    try {

        const resp = await collection.updateOne(
            {
                "_id": 4414414
            },
            {
                $set: {
                   // _id: 4414414,
                    ...global.ConnectionState
                }
            },
            {
                upsert: true
            }
        )

        return resp
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
