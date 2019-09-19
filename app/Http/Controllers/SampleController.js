/****************************************************
# SampleController            
# Page/Class name : SampleController
# Author : 
# Created Date : 
# Functionality : index, store, show, update, destroy
# Purpose : For All crud operation
*****************************************************/
//==================================================================
//==Include requre modules and files.
const Validator = Helper('validator');
const md5 = require('md5');
const slugify = require('slug-generator');
const base64Img = require('base64-img');
const Sample = Models('Sample');
//==================================================================
const SampleController = {
    /****************************************************      
    # Function name : index
    # Author : 
    # Created Date :                
    # Purpose :  For show all.
    # Params : []  
    *****************************************************/
    index: async function (req, res, next) {
        //Your Statement
        // Sample.fetchAll().then((Response) => {
        //     let responses = Response.toJSON();
        //     //console.log(responses);
        //     return res.status(200).json(res.fnSuccess(Response));
        // }).catch((errors) => {
        //     return res.status(400).json(res.fnError(errors));
        // });

    },
    //=====================================================
    /****************************************************      
    # Function name : store
    # Author :
    # Created Date :                    
    # Purpose :  For store.
    # Params : [] 
    *****************************************************/
    store: async function (req, res, next) {
        //Your Statement
        // let formData = req.body;

        // let validation = new Validator(formData, {
        //     name : 'required|string',
        //     username: 'required|string',
        //     password: 'required|minLength:8|maxLength:15',
        //     dob: 'required',            
        // });

        // let matched = await validation.check();

        // if (!matched) {
        //     return res.status(200).json(res.fnError(validation.errors));
        // }
       
        // let insertData = {
        //     name : formData.name,
        //     username : formData.username,
        //     password : formData.password,
        //     dob : formData.dob,
        // }

        // new Sample(insertData).save().then((Response) => {
        //     let responses = Response.toJSON();
        //     //console.log(responses);
        //     return res.status(200).json(res.fnSuccess(Response));
        // }).catch((errors) => {
        //     return res.status(400).json(res.fnError(errors));
        // });

    },
    //=====================================================
    /****************************************************      
    # Function name : show
    # Author : 
    # Created Date :                  
    # Purpose :  For show.
    # Params : []  
    *****************************************************/
    show: function (req, res, next) {
        //Your Statement
        // let id = _.toInteger(req.params.id) ? req.params.id : false;

        // Sample.where('id', id).fetchAll().then((Response) => {
        //     let responses = Response.toJSON();
        //     //console.log(responses);
        //     return res.status(200).json(res.fnSuccess(Response));
        // }).catch((errors) => {
        //     return res.status(400).json(res.fnError(errors));
        // });
        
    },
    //=====================================================
    /****************************************************      
    # Function name : update
    # Author : 
    # Created Date :                  
    # Purpose :  For update.
    # Params : []  
    *****************************************************/
    update: async function (req, res, next) {
        //Your Statement
        // let formData = req.body;

        // let validation = new Validator(formData, {
        //     id : 'required|numeric',
        //     name : 'required|string',
        //     username: 'required|string',
        //     password: 'required|minLength:8|maxLength:15',
        //     dob: 'required',            
        // });

        // let matched = await validation.check();

        // if (!matched) {
        //     return res.status(200).json(res.fnError(validation.errors));
        // }
       
        // let updateData = {
        //     name : formData.name,
        //     username : formData.username,
        //     password : formData.password,
        //     dob : formData.dob,
        // }

        // Sample.where('id', formData.id).save(updateData, { patch: true }).then((Response) => {
        //     let responses = Response.toJSON();
        //     //console.log(responses);
        //     return res.status(200).json(res.fnSuccess(Response));
        // }).catch((errors) => {
        //     return res.status(400).json(res.fnError(errors));
        // });
    },
    //=====================================================
    /****************************************************      
    # Function name : destroy
    # Author : 
    # Created Date :                 
    # Purpose :  For delete.
    # Params : []  
    *****************************************************/
    destroy: function (req, res, next) {
        //Your Statement
        // let id = req.body.id;
        // Sample.where('id', id).destroy({ require: false }).then((response) => {
        //     return res.status(200).json(res.fnSuccess(response));
        // }).catch((errors) => {
        //     return res.status(400).json(res.fnError(errors));
        // });
    }
    //=====================================================
}
//==================================================================
module.exports = SampleController;
//==================================================================