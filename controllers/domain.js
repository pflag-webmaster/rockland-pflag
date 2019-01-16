const pool = require('../common/db');

module.exports.getMembershipTypes = function (callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log(err);
            callback({
                err: err,
                msg: 'connection error'
            });
        }
        if (connection) {
            var query = 'select * from membershipTypes order by sortOrder';
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