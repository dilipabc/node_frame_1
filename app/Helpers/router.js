/****************************************************
# router     
# Page/Class name : router
# Author : Dilip Kumar Shaw
# Created Date : 11/07/2019
# Functionality : 
# Purpose : For create custom routes with extends the express router.
*****************************************************/
//==================================================================

/*
|--------------------------------------------------------------------------
| Application Router Create
|--------------------------------------------------------------------------
|
*/
const Router = express.Router();
//============================================================================

/*
|--------------------------------------------------------------------------
| This function seperate the router argument as (path, middleware and controller)   
|--------------------------------------------------------------------------
|
*/
const routerParamSetup = function () {

    var path = arguments[0];
    var middleware = arguments[2] ? arguments[1] : [];
    var controller = arguments[2] ? arguments[2] : arguments[1];

    if (controller.indexOf('.') >= 0) {
        let [controllerName, methodName] = controller.split('.');
        controller = Controllers(controllerName)[methodName];
    } else {
        controller = Controllers(controller);
    }

    return [path, middleware, controller];
};
//============================================================================
/*
|--------------------------------------------------------------------------
| Add our _get function in Express Application  
|--------------------------------------------------------------------------
|
*/
express.application._get = express.Router._get = function (argument1, argument2, argument3) {
    let [Path, Middleware, Method] = routerParamSetup(argument1, argument2, argument3)
    this.get(Path, Middleware, Method);
};
//============================================================================
/*
|--------------------------------------------------------------------------
| Add our _post function in Express Application  
|--------------------------------------------------------------------------
|
*/
express.application._post = express.Router._post = function (argument1, argument2, argument3) {
    let [Path, Middleware, Method] = routerParamSetup(argument1, argument2, argument3)
    this.post(Path, Middleware, Method);
};
//============================================================================
/*
|--------------------------------------------------------------------------
| Add our _put function in Express Application  
|--------------------------------------------------------------------------
|
*/
express.application._put = express.Router._put = function (argument1, argument2, argument3) {
    let [Path, Middleware, Method] = routerParamSetup(argument1, argument2, argument3)
    this.put(Path, Middleware, Method);
};
//============================================================================
/*
|--------------------------------------------------------------------------
| Add our _delete function in Express Application  
|--------------------------------------------------------------------------
|
*/
express.application._delete = express.Router._delete = function (argument1, argument2, argument3) {
    let [Path, Middleware, Method] = routerParamSetup(argument1, argument2, argument3)
    this.delete(Path, Middleware, Method);
};
//============================================================================
/*
|--------------------------------------------------------------------------
| Add our _all function in Express Application  
|--------------------------------------------------------------------------
|
*/
express.application._all = express.Router._all = function (argument1, argument2, argument3) {
    let [Path, Middleware, Method] = routerParamSetup(argument1, argument2, argument3)
    this.all(Path, Middleware, Method);
};
//============================================================================

express.application._resource = express.Router._resource = function (argument1, argument2, argument3) {

    let [Path, Middleware, Controller] = routerParamSetup(argument1, argument2, argument3);

    this.get(`${Path}`, Middleware, Controller.index);
    this.get(`${Path}/create`, Middleware, Controller.create);
    this.post(`${Path}`, Middleware, Controller.store);
    this.get(`${Path}/:id`, Middleware, Controller.show);
    this.get(`${Path}/:id/edit`, Middleware, Controller.edit);
    this.put(`${Path}/:id`, Middleware, Controller.update);
    this.delete(`${Path}/:id`, Middleware, Controller.destroy);
};
//============================================================================

express.application._resource_api = express.Router._resource_api = function (argument1, argument2, argument3) {

    let [Path, Middleware, Controller] = routerParamSetup(argument1, argument2, argument3);

    this.get(`${Path}`, Middleware, Controller.index);
    this.post(`${Path}`, Middleware, Controller.store);
    this.get(`${Path}/:id`, Middleware, Controller.show);
    this.put(`${Path}/:id`, Middleware, Controller.update);
    this.delete(`${Path}/:id`, Middleware, Controller.destroy);
};
//============================================================================

express.application._group = express.Router._group = function (arg1, arg2) {

    let fn, path;

    if (arg2 === undefined) {
        path = "/";
        fn = arg1;
    } else {
        path = arg1;
        fn = arg2
    }

    let router = express.Router();
    fn(router);

    router.prefix = path;

    this.use(path, router);
    return router;
};
//============================================================================
module.exports = Router;