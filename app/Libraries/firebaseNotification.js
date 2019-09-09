/****************************************************
# FirebaseNotification            
# Page/Class name : FirebaseNotification
# Author : Dilip Kumar Shaw
# Created Date : 04/09/2019
# Functionality : 
# Purpose : For send Firebase Notification to (ios android and website)
*****************************************************/
//==================================================================
const admin = require("firebase-admin");
const fs = require('fs');

let payload = {
    notification: {
        title: '',
        body: '',
        image: '',
    },
    data: {},
};

let options = {
    priority: 'high',
    timeToLive: 1,
    badge: 2,
    click_action: 'FCM_PLUGIN_ACTIVITY',
    icon: 'Default Icon',
    sound: 'Default sound',
    sendBatchSize: 1,
    keepNotifications: false,
    clearBadge: true
};

let firebaseInitializeApp = false;

module.exports = class FirebaseNotification {

    //======================================================
    constructor(fireBaseFileFullPath, databaseUrl) {       
        this.fireBaseFileFullPath = fireBaseFileFullPath;
        this.databaseUrl = databaseUrl;
        if (firebaseInitializeApp == false) {
            this.appInitialize();
        }
    }
    //======================================================     
    appInitialize() {
        if (this.fireBaseFileFullPath == '' || this.fireBaseFileFullPath == undefined || this.databaseUrl == '' || this.databaseUrl == undefined) {
            console.error('Please provide a valid json files and database URL');            
        } else {
            if (this.jsonFileExist()) {
                firebaseInitializeApp = true;
                admin.initializeApp({
                    credential: admin.credential.cert(this.fireBaseFileFullPath),
                    databaseURL: this.databaseUrl
                });
            } else {
                console.error('Please provide a valid json files.');               
            }
        }
    }
    //======================================================
    jsonFileExist() {
        return fs.existsSync(this.fireBaseFileFullPath);
    }
    //======================================================
    send(notification, registrationToken, callback) {

        if (firebaseInitializeApp == true) {
            payload.notification.title = notification.title ? notification.title : '';
            payload.notification.body = notification.body ? notification.body : '';
            payload.notification.image = notification.image ? notification.image : '';
            payload.data = notification.data ? notification.data : {};

            admin.messaging().sendToDevice(registrationToken, payload, options).then((response) => {
                if (callback) {
                    callback(response);
                } else {
                    return response;
                }
            }).catch((error) => {
                if (callback) {
                    callback(error);
                } else {
                    return error;
                }
            });
        } else {
            if (callback) {
                callback('Invalid firebase settings.');
            } else {
                return 'Invalid firebase settings.';
            }
        }
    }
    //======================================================
    sendAll(notification, registrationToken, callback) {
        if (firebaseInitializeApp == true) {
            payload.notification.title = notification.title ? notification.title : '';
            payload.notification.body = notification.body ? notification.body : '';
            payload.notification.image = notification.image ? notification.image : '';
            payload.data = notification.data ? notification.data : {};

            admin.messaging().sendToDevice(registrationToken, payload, options).then((response) => {
                if (callback) {
                    callback(response);
                } else {
                    return response;
                }
            }).catch((error) => {
                if (callback) {
                    callback(error);
                } else {
                    return error;
                }
            });
        } else {
            if (callback) {
                callback('Invalid firebase settings.');
            } else {
                return 'Invalid firebase settings.';
            }
        }
    }
    //======================================================
};