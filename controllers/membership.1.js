const pool = require('../common/db');


module.exports.addMembership = (req, callback) => {
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
            console.log('in add membership controller: ', req);

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

            let addBusinessDetails = buildList('addBusiness', req);
            let columnList = addBusinessDetails.columns.join(',');
            let valueList = addBusinessDetails.values.join(',');
            let params = addBusinessDetails.params;

            var addBusinessSQL = `insert into businesses (${columnList}) values (${valueList})`;

            connection.query(addBusinessSQL, params, function (err, results) {
                let SQLresults = handleSQL(err, results, callback, SQL, 'insert');

                /* results:
                OkPacket {
                  fieldCount: 0,
                  affectedRows: 1,
                  insertId: 2,
                  serverStatus: 34,
                  warningCount: 0,
                  message: '',
                  protocol41: true,
                  changedRows: 0 } } */
             



                let addMembershipDetails = buildList('addMembership', req);
                
                let columnList = addMembershipDetails.columns.join(',');
                let valueList = addMembershipDetails.values.join(',');
                let params = addMembershipDetails.params;

                var SQL = `insert into memberships (${columnList}) values (${valueList})`;

                connection.query(SQL, params, function (err, results) {
                    if (err) {
                        console.log('Query error: ', err);
                        callback({
                            error: err,
                            success: false,
                            message: 'SQL Error.',
                            query: SQL
                        });
                    }

                    if (results !== undefined || results.length === 0) {
                        console.log('No results returned');
                        callback({
                            error: null,
                            success: true,
                            message: 'SQL did not return any rows.',
                            results: results
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
            });
            connection.release();
        }
    });
}

function getInsertDetails(type, req) {
    var formInfo = {
        addBusiness: [{
                column: 'businessName',
                value: req.business.businessName
            },
            {
                column: 'email',
                value: req.business.businessEmailAddress
            },
            {
                column: 'phone',
                value: req.business.businessPhoneNumber
            },
            {
                column: 'website',
                value: req.business.businessWebsite
            },
            {
                column: 'addressLine1',
                value: req.business.businessAddress.addressLine1
            },
            {
                column: 'addressLine2',
                value: req.business.businessAddress.addressLine2
            },
            {
                column: 'city',
                value: req.business.businessAddress.city
            },
            {
                column: 'state',
                value: req.business.businessAddress.state
            },
            {
                column: 'postalCode',
                value: req.business.businessAddress.postalCode
            }
        ],
        addMembership: [{
                column: 'membershipTypes_membershipTypeId',
                value: req.membershipType,
                select: '(select membershipTypeId from membershipTypes where membershipTypeName = ?)'
            }, {
                column: 'firstName',
                value: req.names[0].firstName
            },
            {
                column: 'lastName',
                value: req.names[0].lastName
            },
            {
                column: 'addressLine1',
                value: req.address.addressLine1
            },
            {
                column: 'addressLine2',
                value: req.address.addressLine2
            },
            {
                column: 'city',
                value: req.address.city
            },
            {
                column: 'state',
                value: req.address.state
            }, {
                column: 'postalCode',
                value: req.address.postalCode
            },
            {
                column: 'homePhone',
                value: req.homePhone
            },
            {
                column: 'mobilePhone',
                value: req.mobilePhone
            },
            {
                column: 'otherPhone',
                value: req.otherPhone
            },
            {
                column: 'emailAddress',
                value: req.emailAddress
            },
            {
                column: 'additionalDonation',
                value: req.additionalDonation
            }
        ]
    }

    return formInfo[type];
}

function buildList(type, req) {

    var formInfo = getInsertDetails(type, req);

    var columns = [];
    var values = [];
    var params = [];

    for (var item of formInfo) {
        var value = '';
        var column = '';
        if (item.column !== null && item.column !== '' && item.value !== undefined) {
            console.log(item.column, item.value, item.select);
            if (item.select !== undefined && (item.select !== null || item.select !== 'undefined')) {
                console.log('A');
                columns.push(item.column);
                values.push(item.select);
                params.push(`${item.value}`)
            } else if (item.value !== null) {
                columns.push(item.column)
                values.push('?');
                console.log('B');
                params.push(`${item.value}`)
            } else {

                console.log('C');
            }
        }
    }

    console.log('values: ', values)
    return {
        columns: columns,
        values: values,
        params: params
    }

}

function handleSQL(err, results, callback, SQL, SQLtype) {
    if (err) {
        console.log('SQL: ', SQL)
        console.log('SQL error: ', err);

        callback({
            error: err,
            success: false,
            message: 'SQL Error.',
            query: SQL
        });
    }

    if (results !== undefined || results.length === 0) {

        var message = 'SQL did not return any rows.';
        if (SQLtype === 'insert') message = 'Insert sucessful.'

        callback({
            error: null,
            success: true,
            message: message,
            results: results
        });
    } else {
        callback({
            error: null,
            success: true,
            message: 'Query successful.',
            results: results
        });
    }
}