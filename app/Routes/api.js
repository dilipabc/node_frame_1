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
| Application All API Routes
|--------------------------------------------------------------------------
|
*/
//==Define a api group
Router._group('/api', function (Router) {
    //=====================================================================
    //==sample test urls
    Router.get('/test', (req, res, next) => {
        res.status(200).json(res.fnSuccess('Node JS V1.0 API Running ........'));
    });  

    Router._get('/testEmail', 'EmailTestController.doEmailTest');
    //========================================================
    //Router._get('/example-fetch-all', 'SampleController.index');
    //Router._post('/example-insert-data', 'SampleController.store');
    //Router._get('/example-fetch/:id', 'SampleController.show');
    //Router._post('/example-update', 'SampleController.update');
    //Router._post('/example-delete', 'SampleController.destroy');
    //Router._resource_api('/yourURL', 'SampleController');
    //========================================================

});
//=========================================================================
module.exports = Router;