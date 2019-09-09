/*
|--------------------------------------------------------------------------
| Application Global Variable Define
|--------------------------------------------------------------------------
|
*/

global._ = require('lodash');
global._fs = require('fs');

//=========================================================================

/*
|--------------------------------------------------------------------------
| Application crypto token genarator
|--------------------------------------------------------------------------
|
*/

global.crypto = require('crypto');

//=========================================================================

/*
|--------------------------------------------------------------------------
| Application currency formator
|--------------------------------------------------------------------------
|
*/

global.cFormatter = require('currency-formatter');

//=========================================================================

/*
|--------------------------------------------------------------------------
| Application Router Helper Function
|--------------------------------------------------------------------------
|
*/

global.routeList = function(routes, path=''){

    var routeListAr = [];
    var path        = path || '';

    let getRouteList = function(routes, prefix){
        var prefix = prefix || '';
        _.each(routes.stack,(r)=>{
            if(r.route){
                let object = {
                    path    :`${path}${prefix}${r.route.path}`,
                    method  :(r.route.stack[0].method).toUpperCase(),
                }
                routeListAr.push(object)

            }else{
                getRouteList(r.handle,r.handle.prefix) 
            }
        })
    }
    
    getRouteList(routes);

    return routeListAr;
}
//=========================================================================

/*
|--------------------------------------------------------------------------
| Application database connection creating globali
|--------------------------------------------------------------------------
|
*/

global.dbConn = require('./db_connection');

//=========================================================================
/*
|--------------------------------------------------------------------------
| Application created_at date creating a globali var
|--------------------------------------------------------------------------
|
*/

const moment = require("moment");
let now = moment(new Date());
let date = now.format("DD");
let year = now.format("YYYY");
let month = now.format("MM");
let time = now.format("HH:mm:ss");
global.created_at = year + '-' + month + '-' + date + ' ' + time;

//=========================================================================

/*
|--------------------------------------------------------------------------
| Application created_at date creating a globali var
|--------------------------------------------------------------------------
|
*/
global.publicPath = __dirname + '/../public'
//=========================================================================

/*
|--------------------------------------------------------------------------
| Application PATH Define Function
|--------------------------------------------------------------------------
|
*/

//=Config
global.Config = function (config) {
    return require(`./${config}`);
}

//=Console
global.Console = function (Console) {
    return require(`../app/Console/${Console}`);
}

//=Helper
global.Helper = function (Helper) {
    return require(`../app/Helpers/${Helper}`);
}

//=Http
global.Http = function (Http) {
    return require(`../app/Http/${Http}`);
}

//=Controllers
global.Controllers = function (Controllers) {
    return require(`../app/Http/Controllers/${Controllers}`);
}

//=Middlewares
global.Middlewares = function (Middlewares) {
    return require(`../app/Http/Middlewares/${Middlewares}`);
}

//=Models
global.Models = function (Models) {
    return require(`../app/Http/Models/${Models}`);
}

//=Libraries
global.Libraries = function (Libraries) {
    return require(`../app/Libraries/${Libraries}`);
}

//=Mails
global.Mails = function (Mails) {
    return require(`../app/Mails/${Mails}`);
}

//=Providers
global.Providers = function (Providers) {
    return require(`../app/Providers/${Providers}`);
}

//=Routes
global.Routes = function (Routes) {
    return require(`../app/Routes/${Routes}`);
}


//=========================================================================
/*
|--------------------------------------------------------------------------
| Application Config Function
|--------------------------------------------------------------------------
|
*/
global.getConfig = function (string) {

    try {
        if (!_.contain(string, '.')) {
            return Config(string);
        }
    } catch (e) {
        return null;
    }

    let stringAr = _.split(string, '.');
    let fileName = _.head(stringAr);
    let objPath = _.pull(stringAr, fileName);

    try {

        let fileObject = Config(fileName);
        _.each(objPath, (key) => {
            if (_.isEmpty(fileObject[key])) {
                fileObject = null;
            } else {
                fileObject = fileObject[key];
            }
        });

        return fileObject;
    } catch (e) {
        return null;
    }
}
//=========================================================================