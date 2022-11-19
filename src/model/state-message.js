const dateTimeString = require('../utils/form-date-string');


module.exports = (ctx) => {
    return `Зв'язок${ctx.ConnectionState.alive ? " Є" : " відсутній"}
    🌑 ${dateTimeString(ctx.ConnectionState.lostTime)}
    💡 ${dateTimeString(ctx.ConnectionState.aliveTime)}
    Але світло переможе.
    `
}

// Світла та зв'язку не було ${ctx.ConnectionState.aliveTime - ctx.ConnectionState.lostTime} 
// 