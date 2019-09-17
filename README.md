# node_frame_1

Easy to work with Node Js. This is a Node Js framework with you can easy make any type of rest API and website. 



## Requirements
A advance label understanding of JavaScript (variables, functions, loop, objects, arrays, if statements, promise, callback, modules, arrow function, basic understanding of any framework etc).
A computer on which have (8 GB RAM, i3 Processor, 100 GB HHD)

## Installation

Make sure you have [NodeJs](https://NodeJs.org/) and [NPM](https://www.npmjs.com/) installed.

1. Clone or Download the repository

    ```
	$ git clone https://github.com/dilipabc/node_frame_1.git
	$ cd node_frame_1
	```

2. Install Dependencies

	```
	$ npm install
	```

3. Edit .env file in root folder with your credentials.

    * Mysql Database Access Setup
    * SMTP Setup
    * Others Setup as per your application.

4. Edit Site Configuration app.js and applicationSettings.js file in ./config/ folder

5. Install Dependencies as Globally

    ```
	$ npm install nodemon -g
    $ npm install knex -g
    $ npm install node-cmd -g
    $ npm install forever -g
	```

6. Start the application 

    ```
    //This is for development server
    $ nodemon app.js
    //This is for live server
    $ forever start -c nodemon app.js
    ```

## Dependencies

With the Help of following node modules we are create this Node Js framework. These modules are very power full and easy to handle in NodeJs.

    * base64-img              * body-parser               * bookshelf
    * bookshelf-eloquent      * bookshelf-soft-delete     * commander
    * cors                    * crypto                    * currency-formatter
    * dotenv                  * ejs                       * email-templates
    * express                 * generate-password         * jsonwebtoken
    * knex                    * lodash                    * md5 
    * moment                  * morgan                    * mysql 
    * node-cmd                * node-cron                 * node-input-validator 
    * nodemailer              * reload                    * rotating-file-stream
    * slug-generator          * uniqid

## Folder Structure

    * app
        * Console
        * Helpers
        * Http
            * Controllers
            * Middleware’s
            * Models
        * Libraries
        * Mails
        * Providers
        * Routes
        * Views
    * config
        * app.js
        * applicationSettings.js
        * db_connection.js
        * include.js
        * schedule.js        
    * migrations
    * node_modules
    * public
    * app.js
    * knexfile.js
    * package.json
    * README.md
    * .env
    * .gitignore

## Features

* [Database](#database)
    * MYSQL
        * [Connection](#connection)
        * [Model](#model)
        * [Migration](#migration)
* [Router](#router)
* [Controller](#controller)    
* [View](#view)
* [Libraries](#libraries)        
* [SMTP](#smtp)
* CRON
* [Middleware](#middleware)
* [Helper](#helper)    
* [HTTP](#http)
* [HTTPS](#https)
* Custom Command
* [FCM Notification](#notification)

## Database 

1. Database <a name="configurations"></a> 

This framework use the knex and bookshelf modules for access the database. This modules are provide more control on database. In these ORM very easy to create models and access relations data from database. For more information about these ORM [Knex](http://knexjs.org/) and [Bookshelf](https://bookshelfjs.org/tutorial-many-to-many.html). You are also free for use any bookshelf related addons/plugin.

    * Process to use bookshelf plugin
    
    If you want to use the any bookshelf related addons then install the plugin and add 'Bookshelf.plugin('pluginName');' in config/db_connection.js file.

2. Connection <a name="connection"></a>

Database connection related information save in the .env file. Connection initialization declared in "config/db_connection.js" file.

3. Model <a name="model"></a>

You can easily create a model file in this framework.

* Process
Create any model "FileName.js" file in app/Http/Models. For easily handling model name Create as table name and first character is capital save with the file as .js extension.

* Sample file name

```
FileName.js
```

* Define a Model 

```js
let FileName = dbConn.Model.extend({
    tableName: 'table_One',
});

module.exports = FileName;
```

* Relationship

    Types of Relation

    * hasMany
    * belongsTo
    * hasOne
    * belongsToMany

Find More Details [Bookshelf](https://bookshelfjs.org/tutorial-many-to-many.html).

```js
let FileName = dbConn.Model.extend({
    tableName: 'table_One',
});

modelTwoFileName: function () {
    return this.hasMany(Models('ModelTwoFileName'), 'table_one_id');
},           

module.exports = FileName;
```

* Virtual Fields

```js
let FileName = dbConn.Model.extend({
    tableName: 'table_One',
});

virtuals: {   
    full_name: function () {
        return this.get('first_name') + ' ' + this.get('last_name');
    }
}  

module.exports = FileName;
```



* How to Use Model In Controller

    * Fetch One

    ```js
    const ModelObj = Models('ModelFileName');

    ModelObj.fetch().then((Response) => {
        let responses = Response.toJSON();
        console.log(responses);
    }).catch((errors) => {
        return res.status(400).json(res.fnError(errors));
    });
    ```

    * Fetch All

    ```js
    const ModelObj = Models('ModelFileName');

    ModelObj.fetchAll().then((Response) => {
        let responses = Response.toJSON();
        console.log(responses);
    }).catch((errors) => {
        return res.status(400).json(res.fnError(errors));
    });
    ```

    * With Where

    ```js
    const ModelObj = Models('ModelFileName');

    ModelObj.where('id', 1).fetchAll().then((Response) => {
        let responses = Response.toJSON();
        console.log(responses);
    }).catch((errors) => {
        return res.status(400).json(res.fnError(errors));
    });
    ```

    * Create relation with others models

    ```js
    const ModelObj = Models('ModelFileName');


    ModelObj.where('id', 1).fetchAll({withRelated: ['table_1', 'table_2']}).then((Response) => {
        let responses = Response.toJSON();
        console.log(responses);
    }).catch((errors) => {
        return res.status(400).json(res.fnError(errors));
    });
    ```

    * Create relation with others models with condition

    ```js
    const ModelObj = Models('ModelFileName');
    
    let relationShip = [];

    let Table_1 = {
        'table_1': function () {
            this.where('status', 'A');
        },                
    };
    relationShip.push(Table_1);

    let relation_params = Object.assign(
        { withRelated: relationShip }
    );


    ModelObj.where('id', 1).fetchAll(relation_params).then((Response) => {
        let responses = Response.toJSON();
        console.log(responses);
    }).catch((errors) => {
        return res.status(400).json(res.fnError(errors));
    });
    ```
    Find More Details [Knex](http://knexjs.org/) 

* Migration <a name="migration"></a>      

For migration handling we are use knex. This ORM is more powerfull and proper documentation available in [knex](https://devhints.io/knex#migrations-1) website.

* Command for migration

    ```
    knex init //please not use this command knex config file 'knexfile.js' all ready available with proper configration.
    knex migrate:make migration_name
    knex migrate:latest
    knex migrate:rollback
    ```

* Create knexfile.js

    ```
    knex init
    ```
* Knex configration file 'knexfile.js'
   
   ```js
    /*
    |--------------------------------------------------------------------------
    | Include dotenv plugin for get .env object
    |--------------------------------------------------------------------------
    |
    */
    require('dotenv').config();

    /*
    |--------------------------------------------------------------------------
    | This Object return database connection object 
    |--------------------------------------------------------------------------
    |
    */

    module.exports = {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            charset: 'utf8'
        },
        pool: { min: 2, max: 10 },
        migrations: {
            tableName: 'migrations'
        }
    };
   ```

* For create a migration file

    ```
    knex migrate:make table_1    
    knex migrate:make table_1 --env production

    ```  
* Add your table field details

    ```js
    exports.up = function(knex, Promise) {

        return knex.schema.createTable('table_1', function (table) {
            table.increments();
            table.string('first_name');
            table.string('middle_name');
            table.string('last_name');
            table.float('age');
            table.string('email');
            table.string('password');        
            table.integer('mobile_no');
            table.date('birthday');       
            table.boolean('is_login');        
            table.enu('status',['A', 'I', 'D']).defaultTo('I');
            table.time('created_at');
            table.integer('created_by');
            table.timestamp('updated_at');
            table.string('ip_address');
        })
    
    };

    exports.down = function(knex, Promise) {
        return knex.schema.dropTableIfExists('table_1');
    };

    ```  

* For create table with migration file

    ```
    knex migrate:latest
    knex migrate:latest --env production

    ```

* For rollback

    ```
    knex migrate:rollback
    knex migrate:rollback --env production

    ```
For more detail [click here](https://devhints.io/knex).


## Router <a name="router"></a> 

We are create the router with the [express js](https://expressjs.com/en/guide/routing.html). We add some more feature to use the router easily. 

* File Paths

    * Web 
        Create your website related routes in this file 'app/Routes/web.js'

    * API 
        Create your API related routes in this file 'app/Routes/api.js'

* Methods

    * _group

        * Definition
            If are you want to create any group of URL so please use this function
        * Example

            ```js
            Router._group('/groupName', function (Router) {
            
            });
            ```

    * _get / get

        * Definition
            If are you want to create any get URL so please use this function
        * Example

            ```js
            Router._get('/yourURL', 'ControllerName.FunctionName');

            ```

            ```js
            Router.get('/yourURL', 'ControllerName.FunctionName');
            ```

    * _post / post

        * Definition
            If are you want to create any post URL so please use this function
        * Example

            ```js
            Router._post('/yourURL', 'ControllerName.FunctionName');
            ```

            ```js
            Router.post('/yourURL', 'ControllerName.FunctionName');
            ```
    * _resource_api

        * Definition
            If are you want to create a single url and use app response type like (GET, GET with ID, POST, PUT, DELETE) then please use this functions.If are create any URL with this function then please create all these (index, store, show, update, destroy) function in your controller.

            * index
                This function create for get url. With this function you are able to get all the data with help of get request.

            * store
                This function create for post url. With this function you are able to store the data with help of post request.

            * show
                This function create for get with id url. With this function you are able to get a singal data with help of get request.

            * update
                This function create for put url. With this function you are able to update the data with help of put request.

            * destroy
                This function create for delete url. With this function you are able to update the data with help of delete request.

        * Example

            ```js
            Router.get('/yourURL', 'ControllerName');
            ```

## Controller <a name="controller"></a>

You can easily create a controller file in this framework.

* Process
    Create any controller "FileNameController.js" / "FileName.js" file in app/Http/Controllers. For easily handling the controller name Create as table name, first character is capital and add 'Controller' text save with the file as .js extension.

    * Example with best practice

        ```
        "FileNameController.js"
        ```

    * FileNameController.js

        * Define a Controller

        ```js
        const FileNameController = {
        
        };
        module.exports = FileNameController;
        ```

        ```js
        module.exports = {

        });
        ```
        ```js
        module.exports = class FirebaseNotification {

        };
        ```
        
        * With All Resources

        ```js
        const FileNameController = {
            index: function (req, res, next) {
                // function Definition ....
            },

            store: function (req, res, next) {
                // function Definition ....
            },

            show: function (req, res, next) {
                // function Definition ....
            },

            update: function (req, res, next) {
                // function Definition ....
            },

            destroy: function (req, res, next) {
                // function Definition ....
            },
        };

        module.exports = FileNameController;
        ```

* Handdle the requests in controller

    * GET

    How to received the data in Node Js with get method.

    ```js
    const FileNameController = {
        yourFunctionName: function (req, res, next) {
            // function Definition ....
            let data = req.query;
            console.log(data);
        },                
    };
    module.exports = FileNameController;
    ```

    * POST

    How to received the data in Node Js with post method.

    ```js
    const FileNameController = {
        yourFunctionName: function (req, res, next) {
            // function Definition ....
            let data = req.body;
            console.log(data);
        },                
    };
    module.exports = FileNameController;
    ```

    * URL Params

    How to received the data in Node Js from url's.

    ```js
    const FileNameController = {
        yourFunctionName: function (req, res, next) {
            // function Definition ....
            let data = req.params;
            console.log(data);
        },                
    };
    module.exports = FileNameController;
    ```

* How to include Libraries file in conntroller

    ```js
    const LibrariesObject = Libraries('LibrariesFileName');
    ```
* How to include Mails file in conntroller

    ```js
    const MailsObject = Mails('MailsFileName');
    ```

* How to include Providers file in conntroller

    ```js
    const ProvidersObject = Providers('ProvidersFileName');
    ```

* How to include Helper file in conntroller

    ```js
    const HelperObject = Helper('HelperFileName');
    ```

* How to include Models file in conntroller

    ```js
    const ModelsObject = Models('ModelsFileName');
    ```

* Validation

    * Example

    ```js
    const Validator = Helper('validator');

    const FileNameController = {
        yourFunctionName: async function (req, res, next) {

            let formData = req.body;
            let validation = new Validator(formData, {
                username: 'required|string|unique:users', //table name 'users'
                email: 'required|email|unique:users', //table name 'users'
                password: 'required|minLength:8|maxLength:15',
                first_name: 'required|string|maxLength:250',
                last_name: 'required|string|maxLength:250',
                dob: 'required|dateFormat:YYYY-MM-DD',
                gender: 'required|maxLength:1',
                phone_number: 'required|numeric',
                address: 'required|string|maxLength:255',
                emirate_id: 'required|numeric',
                role_id: 'required|numeric',
                restaurant_id: 'required|integer',
                table_no: 'required|string',
                order_type: 'required|string|maxLength:6',
                user_id: 'required|integer',
                item_id: 'required|integer',
                item_type: 'required|string|maxLength:1',
                item_quantity: 'required|integer',
                special_instraction: 'string|maxLength:255',
                serving_options: 'required',
                addOns: 'required',
            });

            let matched = await validation.check();

            if (!matched) {
                return res.status(200).json(res.fnError(validation.errors));
            }

            // function Definition ....                
        },                
    };
    module.exports = FileNameController;
    ```

* HTTP/HTTPS Response 

    * HTTP Response
        ```js
        res.send('Hello World!');
        ```  

    * Empty Response

        ```js
        res.end();
        ```   

     * Set the HTTP Response with status

        ```js
        
        res.status(404).end();
        //Proper Json Format
        res.status(404).json(res.fnError('Your Error Message/YourErrorObject'));        

        //OR
        
        // === res.status(200).send('OK')        
        res.sendStatus(200);
        //Proper Json Format
        res.status(200).json(res.fnSuccess(YourObject));

        //OR

        // === res.status(403).send('Forbidden')
        res.sendStatus(403);
        //Proper Json Format
        res.status(403).json(res.fnError('Your Error Message/YourErrorObject'));  

        //OR
        
        // === res.status(404).send('Not Found')
        res.sendStatus(404);
        //Proper Json Format
        res.status(404).json(res.fnError('Your Error Message/YourErrorObject'));

        //OR

        // === res.status(500).send('Internal Server Error')
        res.sendStatus(500);
        //Proper Json Format
        res.status(500).json(res.fnError('Your Error Message/YourErrorObject'));

        // Example
        let YourErrorObject = {            
            "status": "error",
            "errors": {
                "name": {
                    "message": "The name field is mandatory.",
                    "rule": "required"
                },
                "email": {
                    "message": "The email field is mandatory.",
                    "rule": "required"
                },
                "mobile_no": {
                    "message": "The mobile no field is mandatory.",
                    "rule": "required"
                },
                "message": {
                    "message": "The message field is mandatory.",
                    "rule": "required"
                }
            },
            "meta_data": {
                "method": "POST",
                "url": "http://localhost:5032/api/test",
                "at": "2019-09-17T06:30:36.503Z"
            }            
        }
        ```        

For more details [click here](https://www.npmjs.com/package/node-input-validator).

## View <a name="view"></a> 

For view control we are use the EJS. In ejs very easily to use thiming. For more detail [click here](https://ejs.co/#features). You are free to create multiple layouts.

* Process
Create the your thiming files in 'app/Views' folder

* Example 

    ```
    app/Views/elements/header.ejs
    app/Views/elements/menu.ejs
    app/Views/elements/footer.ejs

    app/Views/layout.ejs
    ```
    
    Process to include file in ejs

    ```js
    <%- include('elements/header'); %>
    <%- include('elements/menu'); %>

        //Working Area

        <%= variable %>            

    <%- include('elements/footer'); %>
    ```
    
For more details [click here](https://github.com/mde/ejs).
    

## Libraries <a name="libraries"></a>

You can easily create a libraries file in this framework.

* Process
Create the your libraries files in 'app/Libraries' folder.

* Example

    TestLibraries.js

    ```js
    const TestLibraries = {
        yourFunctionName: function () {
            // function Definition ....
            
        },                
    };
    module.exports = TestLibraries;
    ```

    ```js
    module.exports = class TestLibraries {

    };
    ```
    


## SMTP <a name="smtp"></a>

For send mail we are use the [nodemailer](https://github.com/nodemailer/nodemailer). For email templating we are use the [email-templates](https://github.com/niftylettuce/email-templates). These modules are very easy to handle. you are free to create you mail sender file as per requirement.

* Process

    * Step 1
    Configure the .env file with your smtp details in application root.

    * Step 2
    Create a mail sender file in 'app/Mails' folder. 

        Example : 'EmailTest.js'

        ```js
        const Mail = Helper('mail');

        module.exports = function(details){    
            const mailOptions = {
                to:details.to, 
                subject:details.subject,
                template:{
                    path : 'emailTemplateTest',
                    data : {myData:details}
                }
            };
            return Mail(mailOptions);
        }
        ```     
    * Step 3
    Call this function in controller

        ```js
        const EmailTest = Helper('EmailTest');

        const FileNameController = {
            yourFunctionName: function (req, res, next) {
                let data = {
                    to : 'aaa@test.com',
                    subject : 'My subjects',
                    title : 'My title',
                    message : 'my content',
                }
                EmailTest(data).then(function(responce){
                    console.log(responce);
                });
            },                
        };
        module.exports = FileNameController;
        ```       
    * Step 4
    Create template file in 'app/Views/email' folder with .ejs extension.
        
        * Example
            emailTemplateTest.ejs  

        ```
        <h1><%= myData.title %>,</h1>

        <p><%= myData.message %></p>
        ```     

## CRON

Coming Soon...

## Middleware <a name="middleware"></a>

You can easily create a middleware file in this framework.

* Process
Create the your helper files in 'app/Http/Middlewares' folder.

* Example

    Middlewares.js

    ```js
    module.exports = function (req, res, next) {
        //Your statement
        next();
    };
    ```

For more detail [click here](https://expressjs.com/en/guide/using-middleware.html)


## Helper <a name="helper"></a>    

You can easily create a helper file in this framework.

* Process
Create the your helper files in 'app/Helpers' folder.

* Example

    TestHelpers.js

    ```js
    const TestHelpers = {
        yourFunctionName: function () {
            // function Definition ....
            
        },                
    };
    module.exports = TestHelpers;
    ```

    ```js
    module.exports = class TestHelpers {

    };
    ```

## HTTP <a name="http"></a>
This application by default run with http. For More details [click here](https://expressjs.com/en/guide/routing.html)

## HTTPS <a name="htpps"></a>
If are you want run your application with https then follow this steps.

* Step 1

Configure .env file in root.

```
APP_SECURE = true
```

* Step 2

Configure app.js file in root. Add path of ssl-cert-snakeoil.key and ssl-cert-snakeoil.pem from you server.

```js
var options = {
    key: fs.readFileSync('/etc/ssl/private/ssl-cert-snakeoil.key'),
    //ssl key file path
    cert: fs.readFileSync('/etc/ssl/certs/ssl-cert-snakeoil.pem'),
    //ssl pem file path
    requestCert: true,
    rejectUnauthorized: false
};
```

For More details [click here](https://expressjs.com/en/guide/routing.html)

## Custom Command

Coming Soon...

## FCM Notification <a name="notification"></a> 

Send firebase notification with this framework in android, ios, and website.

* Process

1. Send Single Notification

    ```js
    const firebaseNotification = Libraries('firebaseNotification');

    let databaseUrl = '';
    let fireBaseFileFullPath = publicPath + '';
    fcm = new firebaseNotification(fireBaseFileFullPath, databaseUrl);
    let deviseId = '';
    let notification = {
        title: 'Test',
        body: 'This is a test message'
    }
    fcm.send(notification, deviseId, function (response) {
        console.log(response);
    });

    ```

2. Send Multiple Notification

    ```js
    const firebaseNotification = Libraries('firebaseNotification');

    let databaseUrl = '';
    let fireBaseFileFullPath = publicPath + '';
    fcm = new firebaseNotification(fireBaseFileFullPath, databaseUrl);
    let deviseId = [];
    let notification = {
        title: 'Test',
        body: 'This is a test message'
    }
    fcm.sendAll(notification, deviseId, function (response) {
        console.log(response);
    });

    ```

* How to get databaseUrl and fireBaseFileFullPath.

    * First Login with your gmail account in [firebase cosole](https://console.firebase.google.com/).
    * Create a project in firebase.
    * Click on Settings Button from left panel.
    * Then click on Project settings Links.
    * Then click on Service accounts Links.
    * On bottom on the page you can find the databaseURL.
    * After click on Generate new private key you can find the file.
    * Copy this file in public folder.
    * Add your file with full file path.


## License

This framework creating for help the all developer. Our aim is not make money from this framework. Developer are free to use this framework. If you have any suggestion or comment please send me as mail.