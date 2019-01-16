(function () {
    var Privilege, bookshelf;
    bookshelf = require("../../common/bookshelf");
    require("./Privilege");
    Privilege = bookshelf.model('Privilege', {
        tableName: 'privileges',
        hasTimestamps: false,
        idAttribute: 'privilegeId'
    });
    module.exports = Privilege;
}).call(this);