/*
|--------------------------------------------------------------------------
| Knex (ORM) Application Object Creating
|--------------------------------------------------------------------------
|
*/
const conn = require('../knexfile');
/*
|--------------------------------------------------------------------------
| Database connection creating with Knex (ORM)
|--------------------------------------------------------------------------
|
*/
const knex = require('knex')(conn);
global.knex = knex;
/*
|--------------------------------------------------------------------------
| Connect Knex (ORM) with bookshelf
|--------------------------------------------------------------------------
|
*/
const Bookshelf = require('bookshelf')(knex);

/*
|--------------------------------------------------------------------------
| Import bookshelf related plugins
|--------------------------------------------------------------------------
|
*/

//Bookshelf.plugin('registry');
Bookshelf.plugin('pagination');
//Bookshelf.plugin('visibility');
Bookshelf.plugin('virtuals');
//Bookshelf.plugin('processor');
//Bookshelf.plugin(require('bookshelf-eloquent'));
//Bookshelf.plugin(require('bookshelf-soft-delete'));
//Bookshelf.plugin(require('../app/Helpers/bookshelf-extends'));

module.exports = Bookshelf;