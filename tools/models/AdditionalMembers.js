(function () {
    var AdditionalMembers, bookshelf;
    bookshelf = require("../../common/bookshelf");
    require("./AdditionalMembers");
    AdditionalMembers = bookshelf.model('AdditionalMembers', {
        tableName: 'additionalMembers',
        hasTimestamps: true,
        idAttribute: 'additionalMemberId'
    });
    module.exports = AdditionalMembers;
}).call(this);