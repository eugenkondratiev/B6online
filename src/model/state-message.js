const dateTimeString = require('../utils/form-date-string');


module.exports = (ctx) => {
    return `Зв'язок${global.ConnectionState.alive ? " Є" : " відсутній"}
    🌑 ${dateTimeString(global.ConnectionState.lostTime)}
    💡 ${dateTimeString(global.ConnectionState.aliveTime)}
    Cвітло переможе.
    `
}

// Світла та зв'язку не було ${global.ConnectionState.aliveTime - global.ConnectionState.lostTime} 
// 