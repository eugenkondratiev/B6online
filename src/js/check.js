const googleDNS = '8.8.8.8'
const B6ip = '178.158.233.3'
const testIP = '178.158.238.89'
const pingConfig = {
    timeout: 9
}

const performBroadcast = require('./broadcast-power-appear')
const checkPing = require('./ping')
const storeConnectionState = require('../model/upsert-connection-state')
const formDateString = require('../utils/form-date-string')

async function serverPing(ctx) {
    console.log("  ping --- global.ConnectionState  - ", global.ConnectionState)

    let checkResult = false;
    try {
        checkResult = await checkPing(B6ip, pingConfig)
        if (checkResult && !global.ConnectionState.alive) {
            console.log("RE alive");
            global.ConnectionState.alive = true;
            global.ConnectionState.aliveTime = Date.now()
            console.log("time",formDateString(global.ConnectionState.aliveTime));

            await storeConnectionState(ctx)
            await performBroadcast(ctx)
        }

        if (!checkResult && global.ConnectionState.alive) {
            console.log("Falling Edge alive - no connection");
            global.ConnectionState.alive = false;
            global.ConnectionState.lostTime = Date.now()
            await storeConnectionState(ctx)
            await performBroadcast(ctx)

        }
    } catch (error) {
        console.log("#### PING FUNCTION FAIL", error);
    }
    finally {

        global.ConnectionState.alive = checkResult;
        console.log("global.ConnectionState.alive", checkResult);
        return checkResult

    }


}



module.exports = serverPing;