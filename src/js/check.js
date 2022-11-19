const googleDNS = '8.8.8.8'
const B6ip = '178.158.233.3'
const testIP = '178.158.238.89'
const pingConfig = {
    timeout: 5
}

const performBroadcat = require('./broadcast-power-appear')
const checkPing = require('./ping')
const storeConnectionState = require('../model/upsert-connection-state')


async function serverPing(ctx) {

    let checkResult = false;
    try {
        checkResult = await checkPing(B6ip, pingConfig)
        if (checkResult && !ctx.ConnectionState.alive) {
            console.log("RE alive");
            ctx.ConnectionState.alive = true;
            ctx.ConnectionState.aliveTime = Date.now()
            await storeConnectionState(ctx)
            await performBroadcat(ctx)
        }

        if (!checkResult && ctx.ConnectionState.alive) {
            console.log("Falling Edge alive - no connection");
            ctx.ConnectionState.alive = false;
            ctx.ConnectionState.lostTime = Date.now()
            await storeConnectionState(ctx)
        }
    } catch (error) {
        console.log("#### PING FUNCTION FAIL", error);
    }
    finally {

        ctx.ConnectionState.alive = checkResult;
        console.log("ctx.ConnectionState.alive", checkResult);
        return checkResult

    }


}



module.exports = serverPing;