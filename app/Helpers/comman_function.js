/****************************************************
# commanFunction        
# Page/Class name : commanFunction
# Author : Dilip Kumar Shaw
# Created Date : 11/07/2019
# Functionality : onlyUnique
# Purpose : For create custom funcations.
*****************************************************/
//==================================================================

const commanFunction = {

    //================================================
    onlyUnique: function (value, index, self) {
        return self.indexOf(value) === index;
    }
    //================================================

};

module.exports = commanFunction;

//==================================================================