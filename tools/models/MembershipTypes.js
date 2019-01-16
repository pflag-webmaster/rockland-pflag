(function () {
    var MembershipTypes, bookshelf;
    bookshelf = require("../../common/bookshelf");
    require("./MembershipTypes");
    MembershipTypes = bookshelf.model('MembershipTypes', {
        tableName: 'MembershipTypes',
        hasTimestamps: true,
        idAttribute: 'membershipTypeId'
    });
    module.exports = MembershipTypes;
}).call(this);