(function () {
    var Role, bookshelf;
    bookshelf = require("../../common/bookshelf");
    require("./Role");
    Role = bookshelf.model('Role', {
        tableName: 'roles',
        hasTimestamps: false,
        idAttribute: 'roleId'
    });
    module.exports = Role;
}).call(this);