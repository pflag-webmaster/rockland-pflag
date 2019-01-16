(function () {
    var Country, bookshelf;
    bookshelf = require("../../common/bookshelf");
    require("./Country");
    Country = bookshelf.model('Country', {
        tableName: 'countries',
        hasTimestamps: true,
        idAttribute: 'countryId'
    });
    module.exports = Country;
}).call(this);