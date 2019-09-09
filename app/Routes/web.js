/*
|--------------------------------------------------------------------------
| Application Helper Router Import
|--------------------------------------------------------------------------
|
*/
const Router = Helper('router');
//=========================================================================
/*
|--------------------------------------------------------------------------
| Application All Web Routes
|--------------------------------------------------------------------------
|
*/
//==Home Page Define
Router.get('/', (req, res, next) =>{    
    res.status(200).json(res.fnSuccess('Node JS Frame v0.1 Web is Running ........')); 
});
//=========================================================================
module.exports = Router;