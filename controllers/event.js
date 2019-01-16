const pool = require('../common/db');

module.exports.getAllEvents = function (callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log(err);
            callback({
                err: err,
                msg: 'connection error'
            });
        }
        if (connection) {
            var query = `
select

E.title,
E.description,
DATE_FORMAT(ET.eventDate,"%Y-%m-%d") date,
YEAR(ET.eventDate) as year,
MONTH(ET.eventDate) as month,
DAY(ET.eventDate) as dom,
ET.eventBegin,
ET.eventFinish,
ET.recurring,
ET.dayOfWeek dow,
ET.weekOfMonth wom

from

events E,
eventTimes ET

where

ET.events_eventId = E.eventId
            `;
            connection.query(query, function (err, results) {
                if (err) {
                    console.log(err);
                    callback({
                        err: err,
                        msg: 'query error',
                        query: query
                    });
                }

                callback(null, results);

            });
            connection.release();
        } else {
            callback({
                err: err,
                msg: 'no connection established'
            });
        }

    });

}