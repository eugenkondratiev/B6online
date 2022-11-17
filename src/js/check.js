const googleDNS = '8.8.8.8'
const B6ip = '178.158.233.3'
const testIP = '178.158.238.89'

const pingConfig = {
	timeout: 1
}

const checkPing = require('./ping')

async function serverPing(){

	let checkResult = false;
	try {
		checkResult = await checkPing(B6ip, pingConfig)
        if (checkResult || !global.ConnectionState.alive) {
            global.ConnectionState.aliveTime = Date.now()
        }

        if (!checkResult || global.ConnectionState.alive) {
            global.ConnectionState.lostTime = Date.now()
        }       
	} catch (error) {
		console.log("#### PING FUNCTION FAIL", error);
	}

    global.ConnectionState.alive = checkResult;


    return checkResult

} 



module.exports = serverPing;