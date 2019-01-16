(function () {
    var Region, bookshelf;
    bookshelf = require("../../common/bookshelf");
    require("./Region");
    Region = bookshelf.model('Region', {
        tableName: 'regions',
        hasTimestamps: false,
        idAttribute: 'regionId'
    });
    module.exports = Region;
}).call(this);