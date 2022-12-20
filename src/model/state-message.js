const dateTimeString = require('../utils/form-date-string');
const formTimePeriodstring = require('../js/calc-hours-mins')


module.exports = (ctx) => {
    return global.ConnectionState.alive 
    ? `Зв'язок та світло відновлені за ${formTimePeriodstring(global.ConnectionState.lostTime, global.ConnectionState.aliveTime)} .
     Життя поліпшало
    🌑 ${dateTimeString(global.ConnectionState.lostTime)}
    💡 ${dateTimeString(global.ConnectionState.aliveTime)}
      Cвітло переможе.
    `
    :
    `
    Зв'язок з будинком зник 
    Сподіваюсь  за ${formTimePeriodstring(global.ConnectionState.aliveTime, global.ConnectionState.lostTime)} всі встигли попрацювати та погрітись.
    💡 ${dateTimeString(global.ConnectionState.aliveTime)}
    🌑 ${dateTimeString(global.ConnectionState.lostTime)}
      Чекаємо на краще.
    `
}

// Світла та зв'язку не було ${global.ConnectionState.aliveTime - global.ConnectionState.lostTime} 
// 


//?  `Зв'язок та світло відновлені через ${formTimePeriodstring(global.ConnectionState.lostTime, global.ConnectionState.aliveTime)}.




// Сподіваюсь  за ${formTimePeriodstring(global.ConnectionState.aliveTime, global.ConnectionState.lostTime)} всі встигли попрацювати та погрітись.
// 