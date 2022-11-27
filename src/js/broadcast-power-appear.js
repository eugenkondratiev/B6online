
const formStateMesssage = require('../model/state-message');

module.exports = async (ctx) => {
    ;
    console.log("broadcast to -", global.usersList, "context - ", ctx, ctx.telegram);
    console.log("ctx.telegram.sendMessage - ", ctx.telegram.sendMessage)

    for (user of global.usersList) {
        console.log("sending to -", user)
        try {
            await ctx.telegram.sendMessage(user._id, formStateMesssage(ctx))
            console.log("send to ", user, "DONE")

        } catch (error) {
            console.log('broadcast error ', error)
        }

    }
}