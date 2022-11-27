const getCollection = require('./get-all-collection')
const getMainState = require('./get-main-state')
const arrToObj = require('../utils/arrToObj')

module.exports = async (ctx) => {
    try {
        const usersList = await getCollection("users");
        // console.log("usersList - ", usersList);
        global.usersList = [...usersList];
        const _initObj = {}
        global.users = global.usersList.reduce((result, element, index) => {
            const {_id, name}=element
            // console.log("###", _id, name, element);
            result[""+_id] = name;
            // console.log("result temp", result);
            return result
        }, _initObj);

        // global.users = arrToObj(global.usersList, "_id")

        // global.usersList = formIdList(usersList, "_id");
        console.log("ctx USERS_LIST ", global.usersList);
        console.log("ctx USERS", global.users);

        const { _id, ...restState } = await getMainState();

        global.ConnectionState = { ...restState };
        
        console.log("global ConnectionState", global.ConnectionState);

    } catch (error) {
        console.log("INITIAL READ ERROR");
    }
    finally {

    }
}

