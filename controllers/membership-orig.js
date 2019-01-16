const pool = require('../common/db');


module.exports.addMembership = (req, callback) => {
    var test = {
        membershipType: 'student',
        names: [{
            firstName: 'Bob',
            lastName: 'Smith'
        }],
        address: {
            addressLine1: '123 Main St',
            addressLine2: 'Aapt 4',
            city: 'Nyack',
            state: 'NY',
            postalCode: '10956'
        },
        homePhone: '123-456-7890',
        mobilePhone: '123-456-7890',
        otherPhone: '123-456-7890',
        emailAddress: 'bob.smith@test.com',
        otherDonation: '123.45'
    };

    console.log(req);

    pool.getConnection(function (err, connection) {
        if (err) {
            console.log('Pool Connection: ', err);
            callback()
            return res.status(201).json({
                error: err,
                success: false,
                message: 'connection error'
            });
        }

        if (connection) {
            console.log('in add membership controller: ', );

            var today = new Date;
            var thisYear = today.getFullYear();
            var thisMonth = today.getMonth() + 1;
            var thisDOM = today.getDate();
            /* 
                        thisMonth < 10 ? thisMonth = '0' + thisMonth : thisMonth;
                        thisDOM < 10 ? thisDOM = '0' + thisDOM : thisDOM;
             */
            var todayDate = thisYear + '-' + thisMonth + '-' + thisDOM;
            var expYear = thisYear + 1;
            var expirationDate = expYear + '-9-30';








            let values = [
                req.membershipType,
                req.names[0].firstName,
                req.names[0].lastName,
                req.address.addressLine1,
                req.address.city,
                req.address.state,
                req.address.postalCode,
                req.emailAddress,
                req.homePhone,
                req.mobilePhone,
                req.otherPhone,
                req.additionalDonation,
                todayDate,
                expirationDate,
                businessId
            ];

            var query = `insert into memberships (
                membershipTypes_membershipTypeId,
                firstName,
                lastName,
                addressLine1,
                city,
                state,
                postalCode,
                email,
                homePhone,
                mobilePhone,
                otherPhone,
                additionalDonation,
                signUpDate,
                expirationDate,
                businesses_businessId
            ) values(
                (select membershipTypeId from membershipTypes where membershipTypeName = ?),
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
            )`;




            connection.query(query, values, function (err, results) {
                if (err) {
                    console.log('Query error: ', err);
                    callback({
                        error: err,
                        success: false,
                        message: 'Query Error.',
                        query: query
                    });
                }

                if (results.length === 0) {
                    console.log('No results returned');
                    callback({
                        error: null,
                        success: false,
                        message: 'Need message details!',
                    });
                } else {
                    callback({
                        error: null,
                        success: true,
                        message: 'Thingy successful',
                        results: results
                    });
                }
            });

            connection.release();
        }
    });



}