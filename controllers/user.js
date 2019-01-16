const pool = require('../common/db');


module.exports.login = (req, res, next) => {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log('Pool Connection: ', err);
            return res.status(201).json({
                error: err,
                success: false,
                message: 'connection error'
            });
        }

        if (connection) {

            console.log('in user model (login): ', );
            var query = `select * from users where email=?`;
            connection.query(query, [req.body.email], function (err, results) {
                if (err) {
                    console.log('Query error: ', err);
                    return res.status(201).json({
                        error: err,
                        success: false,
                        message: 'Query Error.',
                        query: query
                    });
                }

                if (results.length === 0) {
                    console.log('No results returned');
                    return res.status(201).json({
                        error: null,
                        success: false,
                        message: 'That email address has not been registered. Please register for access.',
                    });
                } else {
                    console.log(results);








                    return res.status(201).json({
                        error: null,
                        success: true,
                        message: 'Login successful.',
                        results: results
                    });
                }
            });
            connection.release();
        }
    });
}


module.exports.login2 = function (login, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log('A: ', err);
            callback({
                err: err,
                msg: 'connection error'
            });
        }
        if (connection) {

            console.log('in user model (login): ', login);
            var query = `select * from users where email=?`;
            connection.query(query, [login.email], function (err, results) {
                if (err) {
                    console.log('B: ', err);
                    callback({
                        err: err,
                        msg: 'query error',
                        query: query
                    });
                }

                console.log('in user model (results): ', results);

                if (!results) {
                    console.log('No results returned');
                    callback({
                        err: false,
                        status: 'ok',
                        msg: 'No results returned',
                    });
                }

                if (results) {
                    console.log(results);
                    callback({
                        err: false,
                        status: 'ok',
                        msg: 'Results retured',
                        results: results
                    });
                }
                callback(null, results);

            });
            connection.release();
        } else {
            callback({
                err: true,
                msg: 'no connection established'
            });
        }
    });
}