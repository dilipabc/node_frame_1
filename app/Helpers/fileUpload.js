/****************************************************
# fileUploadHelper     
# Page/Class name : fileUploadHelper
# Author : Dilip Kumar Shaw
# Created Date : 24/02/2020
# Functionality : fileUpload
# Purpose : This is a custom file upload helper functions.
*****************************************************/
//==================================================================
const multer = require('multer');
const fileTypeAllow = ['txt', 'doc', 'docs', 'pdf', 'jpg', 'png', 'gif', 'jpeg', 'bmp'];
const fileUploadHelper = {
    f_upload: function (req, res, path) {
        let targetPath = path ? path : './public/uploads/';
        const storage = multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, targetPath);
            },
            filename: (req, file, callback) => {
                let fileType = '';
                if (file.originalname) {
                    let fileArr = file.originalname.split(".");
                    if (fileArr.length > 0) {
                        let totalLength = fileArr.length - 1;
                        fileType = fileArr[totalLength];
                    }
                }
                callback(null, Date.now() + '_file' + '.' + fileType);
            }
        });
        const upload = multer({
            storage: storage,
            fileFilter: (req, file, cb) => {
                let fileType = '';
                if (file.originalname) {
                    let fileArr = file.originalname.split(".");
                    if (fileArr.length > 0) {
                        let totalLength = fileArr.length - 1;
                        fileType = fileArr[totalLength];
                    }
                }
                let type = fileType.toLowerCase();
                if (fileTypeAllow.indexOf(type) < 0) {
                    cb(null, false);
                    return cb(new Error('Only txt, doc, docs, pdf, jpg, png, gif, jpeg, bmp format allowed!'));
                } else {
                    cb(null, true);
                }
            }
        }).any('file');
        return new Promise(function (resolve, reject) {
            upload(req, res, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    var uploadData = [];
                    if (req.files.length) {
                        req.files.map((file) => {
                            uploadData.push(file.filename);
                        });
                        resolve(uploadData);
                    }

                }
            })
        })
    }
}

module.exports = fileUploadHelper;
//==================================================================