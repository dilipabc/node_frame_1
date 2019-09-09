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
        console.log('Hi')
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
        console.log('Hi')   
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
        console.log('Hi')
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
        console.log('Hi')
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
        console.log('Hi')
    }
    //=====================================================
}
//==================================================================
module.exports = SampleController;
//==================================================================