(function () {
    var User, bookshelf;
    bookshelf = require("../../common/bookshelf");
    require("./User");
    User = bookshelf.model('User', {
        tableName: 'users',
        hasTimestamps: true,
        idAttribute: 'userId'
    });
    module.exports = User;
}).call(this);