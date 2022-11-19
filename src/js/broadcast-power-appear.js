
const formStateMesssage = require('../model/state-message');

module.exports = async (ctx) => {
    ;
    console.log("broadcast to -", global.usersList);
    for (user of global.usersList) {
        await ctx.telegram.sendMessage(user._id, formStateMesssage(ctx))

    }
}