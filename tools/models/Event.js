(function () {
    var Event, bookshelf;
    bookshelf = require("../../common/bookshelf");
    require("./Event");
    Event = bookshelf.model('Event', {
        tableName: 'events',
        hasTimestamps: true,
        idAttribute: 'eventId'
    });
    module.exports = Event;
}).call(this);