module.exports = async (_userId, { insertUser, deleteUser }) => {

    const mongoClient = await require('../../db-mongo')();

    const collection = mongoClient._db.collection("users");
    try {
        let resp
        if (insertUser) {

            resp = await collection.updateOne(
                {
                    "_id": _userId
                },
                {
                    $set: {
                        _id: _userId,
                        name: global.users[_userId]
                    }
                },
                {
                    upsert: true
                }
            )

        }

        if (deleteUser) {
            rest = await collection.deleteOne(
                { "_id": _userId }
            )
        }
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