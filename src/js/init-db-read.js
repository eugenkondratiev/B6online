const getCollection = require('./get-all-collection')
const getMainState = require('./get-main-state')

module.exports = async () => {
    try {
        const usersList = await getCollection("users");
        console.log("usersList - ", usersList);
        global.usersList = [...usersList];
        // global.usersList = formIdList(usersList, "_id");
        console.log("global USERS_LIST ", global.usersList);

        const { _id, ...restState } = await getMainState();

        global.ConnectionState = { ...restState };
        console.log("global ConnectionState", global.ConnectionState);

    } catch (error) {
        console.log("INITIAL READ ERROR");
    }
    finally {

    }
}
