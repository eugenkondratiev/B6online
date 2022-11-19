module.exports = (ctx)=>{
    return `Зв'язок${ctx.ConnectionState.alive? " Є" : " відсутній" }
    ${ctx.ConnectionState.aliveTime}
    ${ctx.ConnectionState.lostTime}
    `
}