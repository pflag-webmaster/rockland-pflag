(function () {
    var UserRole, bookshelf;
    bookshelf = require("../../common/bookshelf");
    require("./UserRole");
    UserRole = bookshelf.model('UserRole', {
        tableName: 'userRoles',
        hasTimestamps: false,
        idAttribute: 'userRoleId'
    });
    module.exports = UserRole;
}).call(this);