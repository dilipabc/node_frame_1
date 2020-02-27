/****************************************************
# EmailTestController            
# Page/Class name : EmailTestController
# Author : Dilip Kumar Shaw
# Created Date : 
# Functionality :  doEmailTest,                      
# Purpose : SMTP Test
*****************************************************/

const emailTest = Mails('EmailTest');

const EmailTestController = {

    /****************************************************      
    # Function name : doEmailTest
    # Author : Dilip Kumar Shaw
    # Created Date :                  
    # Purpose :  SMTP Test 
    # Params : [Parameter list along with the data type]                                        
    *****************************************************/

    doEmailTest: function (req, res, next) {

        let contact = {
            name: 'Dilip Kumar Shaw',
            email: 'dilipabc@gmail.com',
            phone: '9903863458'
        }

        emailTest(contact).then((response) => {
            //console.log(response)
            return res.status(200).json(res.fnSuccess(response));
        }).catch((errors) => {
            //console.log(errors)
            return res.status(400).json(res.fnError(errors, 'API url is wrong. please check the documentation.'));
        });
    },   

};

module.exports = EmailTestController;