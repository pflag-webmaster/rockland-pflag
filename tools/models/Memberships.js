(function () {
    var Memberships, bookshelf;
    bookshelf = require("../../common/bookshelf");
    require("./Memberships");
    Memberships = bookshelf.model('Memberships', {
        tableName: 'memberships',
        hasTimestamps: true,
        idAttribute: 'membershipId'
    });
    module.exports = Memberships;
}).call(this);