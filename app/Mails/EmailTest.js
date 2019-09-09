const Mail = Helper('mail');

module.exports = function(details){    
    const mailOptions = {
        to:getConfig('applicationSettings.email.contact'), 
        subject:`${details.email} has been contacted.`,
        template:{
            path : 'emailTemplateTest',
            data : {contact:details}
        }
    };
    return Mail(mailOptions);
}