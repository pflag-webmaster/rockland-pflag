(function () {
    var RolePrivilege, bookshelf;
    bookshelf = require("../../common/bookshelf");
    require("./RolePrivilege");
    RolePrivilege = bookshelf.model('RolePrivilege', {
        tableName: 'rolePrivilege',
        hasTimestamps: false,
        idAttribute: 'rolePrivilegeId'
    });
    module.exports = RolePrivilege;
}).call(this);