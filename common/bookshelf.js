var knex = require('./knex');

var bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');
bookshelf.plugin('virtuals');

module.exports = bookshelf;