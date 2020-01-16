/*
|--------------------------------------------------------------------------
| Application All Web and API Routes imports
|--------------------------------------------------------------------------
|
*/
const webRoute = Routes('web');
const apiRoute = Routes('api');
const ApiMiddleware = Middlewares('ApiMiddleware');
const RequestMiddlware = Middlewares('RequestMiddlware');
const IpMiddleware = Middlewares('IpMiddleware');
const CsrftokenVerifyMiddleware = Middlewares('CsrftokenVerifyMiddleware');
//=======================================================================
module.exports = function (app) {
    //=======================================================================
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    });
    //=======================================================================
    /*
    |------------------------------------------------------------------------
    | Application All API Routes imports
    |------------------------------------------------------------------------
    |
    */
    app.use('/api', [
        ApiMiddleware,              // To Bring API Response Funtion with MetaData.  
        RequestMiddlware,           // To Log each request URL with details.
        //IpMiddleware,               // To White List and Black List Ip address.
        //CsrftokenVerifyMiddleware,  // To validate all url with csrf-token.
    ], apiRoute);
    //=======================================================================
    /*
    |------------------------------------------------------------------------
    | Application All Web Routes imports
    |------------------------------------------------------------------------
    |
    */
    app.use('/', [
        ApiMiddleware,              // To Bring API Response Funtion with MetaData.  
        RequestMiddlware,           // To Log each request URL with details.
        //IpMiddleware,               // To White List and Black List Ip address.
        //CsrftokenVerifyMiddleware,  // To validate all url with csrf-token.
    ], webRoute);
    //=======================================================================    
    /*
    |------------------------------------------------------------------------
    | Application All API List
    |------------------------------------------------------------------------
    |
    */
    app.get('/routes', (req, res, next) => {
        res.render('routes', { routes: routeList(apiRoute) });
    });
    //=======================================================================
    /*
    |------------------------------------------------------------------------
    | Application 404 Error Page
    |------------------------------------------------------------------------
    |
    */
    app.all('**', ApiMiddleware, (req, res, next) => {
        res.status(400).json(res.fnError('API url is wrong. please check the documentation.'));
    });
    //=======================================================================
};
//=======================================================================