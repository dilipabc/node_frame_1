/****************************************************
# RequestMiddlware            
# Page/Class name : RequestMiddlware
# Author : Dilip Kumar Shaw
# Created Date : 11/07/2019
# Functionality : 
# Purpose : For handling the all type of request.
*****************************************************/
//==================================================================

module.exports = function (req, res, next) {

    let remoteAddress = req.client._peername
    let port = remoteAddress.port;
    let ip = remoteAddress.address
    if (ip.substr(0, 7) == '::ffff:') {
        ip = ip.substr(7);
        ip = `${ip}:${port}`;
    }

    let dateTime = new Date().toISOString();
    let method = req.method;
    let full_url = req.originalUrl;
    let status_code = res.statusCode;
    let statusColor = (status_code == 200) ? '\x1b[32m' : '\x1b[31m';
    let methodColor = {
        POST: '\x1b[34m',
        GET: '\x1b[32m',
        PUT: '\x1b[33m',
        DELETE: '\x1b[31m'
    }

    console.log(`\x1b[0m[%s]\x1b[36m[%s]${statusColor}[%s]${methodColor[method]}[%s] \x1b[0m: %s \x1b[0m`, dateTime, ip, status_code, method, full_url);
    next();
}

//==================================================================