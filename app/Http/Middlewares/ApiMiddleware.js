/****************************************************
# ApiMiddleware            
# Page/Class name : ApiMiddleware
# Author : Dilip Kumar Shaw
# Created Date : 11/07/2019
# Functionality : 
# Purpose : For handling custom error and sucess messages formate.
*****************************************************/
//==================================================================

module.exports = function (req, res, next) {

    let method = req.method;

    let methodMessage = {
        POST: 'Record created successfully.',
        GET: 'Record fetched successfully.',
        PUT: 'Record updated successfully.',
        DELETE: 'Record removed successfully.'
    };

    let metaData = {
        method: method,
        url: req.protocol + '://' + req.get('host') + req.originalUrl,
        at: new Date().toISOString(),
    };

    res['fnSuccess'] = function (response, message = null) {

        let apidata = { status: 'success' };
        apidata['message'] = message || methodMessage[method];
        apidata['data'] = response || [];

        if (response && typeof response == 'object' && response.pagination) {
            apidata['pagination'] = response.pagination;
        }

        apidata['meta_data'] = metaData;

        try {
            return apidata;
        }
        catch (e) {
            return apidata;
        }

    };

    res['fnError'] = function (errors, message = null) {

        if (typeof errors !== 'string') {
            console.log(errors);
        }

        var message = (typeof errors === 'string' && message === null) ? errors : message;
        let apidata = { status: 'error' };
        if (message) {
            apidata['message'] = message;
        }

        if (Object.keys(errors).length > 0 && typeof errors === 'object') {
            apidata['errors'] = errors;
        }

        apidata['meta_data'] = metaData;

        try {
            return apidata;
        }
        catch (e) {
            return apidata;
        }
    };

    next();
}
//==================================================================