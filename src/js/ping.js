


const ping = require('ping')
async function serverPing(host, cfg){

    const resp = await ping.promise.probe(host, cfg)
    
    // console.log("RESP - ", resp);
    return resp.alive
} 



module.exports = serverPing;



