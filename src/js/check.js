const googleDNS = '8.8.8.8'
const B6ip = '178.158.233.3'
const testIP = '178.158.238.89'

const pingConfig = {
    timeout: 5
}

const checkPing = require('./ping')
const storeConnectionState = require('../model/upsert-connection-state')


async function serverPing() {

    let checkResult = false;
    try {
        checkResult = await checkPing(B6ip, pingConfig)
        if (checkResult && !global.ConnectionState.alive) {
            console.log("RE alive");
            global.ConnectionState.alive = true;
            global.ConnectionState.aliveTime = Date.now()
            await storeConnectionState()
        }

        if (!checkResult && global.ConnectionState.alive) {
            console.log("Falling Edge alive - no connection");
            global.ConnectionState.alive = false;

            global.ConnectionState.lostTime = Date.now()
            await storeConnectionState()

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