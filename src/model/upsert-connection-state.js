
module.exports = async (ctx)=> {
    const mongoClient = await require('../../db-mongo')();

    const collection = mongoClient._db.collection("b6data");
    try {

        await collection.updateOne(
            {
                "_id": Date.now()
            },
            {
                $set: {
                    ...ctx.ConnectionState
                }
            },
            {
                upsert: true
            }
        )

        const resp = await collection.updateOne(
            {
                "_id": 4414414
            },
            {
                $set: {
                   // _id: 4414414,
                    ...ctx.ConnectionState
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
