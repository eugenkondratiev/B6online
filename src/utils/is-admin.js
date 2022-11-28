const botConfig = require('../../config.json')

module.exports = (ctx)=> {
    return +ctx.message.chat.id == botConfig.KES

}