
module.exports = async (ctx) => {
    const mongoClient = await require('../../db-mongo')();
    const formDateTimeString = await require('../../src/utils/form-date-string');

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

        await collection.updateOne(
            {
                "_id": Date.now()
            },
            {
                $set: {
                    aliveStore: formDateTimeString(global.ConnectionState.aliveTime),
                    lostStore: formDateTimeString(global.ConnectionState.lostTime),
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
