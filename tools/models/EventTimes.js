(function () {
    var EventTimes, bookshelf;
    bookshelf = require("../../common/bookshelf");
    require("./EventTimes");
    EventTimes = bookshelf.model('EventTimes', {
        tableName: 'eventTimes',
        hasTimestamps: false,
        idAttribute: 'EventTimesId'
    });
    module.exports = EventTimes;
}).call(this);