/****************************************************
# CsrftokenVerifyMiddleware            
# Page/Class name : CsrftokenVerifyMiddleware
# Author : Dilip Kumar Shaw
# Created Date : 11/07/2019
# Functionality : 
# Purpose : For validate the Csrf token.
*****************************************************/
//==================================================================
const result = require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    let application_access_key = req.headers.application_access_key;
    let csrf_token = req.headers.csrf_token;

    //console.log(req.originalUrl) // '/admin/new'
    //console.log(req.baseUrl) // '/admin'
    //console.log(req.path) // '/new' 
    //==================================================================
    //==Allow these url for not validate csrf_token and application_access_key
    if (req.path != undefined) {
        let allowURLArray = ['/']
        let returnResults = allowURLArray.indexOf(req.path);
        if (returnResults != -1) {
            return next();
        }
    }
    //==================================================================
    //==Validate all url with csrf_token and application_access_key
    if (application_access_key !== undefined && application_access_key !== '') {

        if (process.env.APP_KEY == application_access_key) {
            if (csrf_token !== undefined && csrf_token !== '') {
                const bearer = csrf_token.split(' ');
                const bearerToken = bearer[1];
                jwt.verify(bearerToken, 'secretkey', (err, authData) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).json(res.fnError(err));
                    }
                });
            } else {
                return res.status(400).json(res.fnError('Csrf token is require.'));
            }
        } else {
            return res.status(400).json(res.fnError('Invalid application access key.'));
        }
    } else {
        return res.status(400).json(res.fnError('Application access key is require.'));
    }
    //==================================================================
    next();
}
//==================================================================