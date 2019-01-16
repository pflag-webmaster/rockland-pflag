(function () {
    var Businesses, bookshelf;
    bookshelf = require("../../common/bookshelf");
    require("./Businesses");
    Businesses = bookshelf.model('Businesses', {
        tableName: 'businessess',
        hasTimestamps: false,
        idAttribute: 'businessId'
    });
    module.exports = Businesses;
}).call(this);