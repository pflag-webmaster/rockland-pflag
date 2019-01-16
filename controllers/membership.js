const pool = require('../common/db');
// const randomstring = require('randomstring');

module.exports.checkEmail = async (email, callback) => {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log(err);
            callback({
                err: err,
                msg: 'connection error'
            });
        }
        if (connection) {
            var query = 'select membershipId from memberships where emailAddress = ?';
            connection.query(query, [email], function (err, results) {
                if (err) {
                    console.log(err);
                    callback({
                        err: err,
                        msg: 'query error',
                        query: query
                    });
                } else {
                    callback(null, results.length);
                }
            });
            connection.release();
        } else {
            callback({
                err: err,
                msg: 'no connection established'
            });
        }

    });
};

module.exports.addMembership = async (req, callback) => {
    console.log(req);

    // Create Business if necessary
    var businessId = null;
    var businessExists = false;
    if (req.membershipType === 'businessPremium' || req.membershipType === 'business') {
        const businessName = req.business.businessName;
        let businessExistsResults = await pool.query('SELECT * FROM businesses where businessName = ?', businessName);

        if (businessExistsResults.length === 0) { // Business Does Not Exist
            let addBusinessDetails = buildList('addBusiness', req);
            let businessColumnList = addBusinessDetails.columns.join(',');
            let businessValueList = addBusinessDetails.values.join(',');
            let businessParams = addBusinessDetails.params;

            var addBusinessSQL = `insert into businesses (${businessColumnList}) values (${businessValueList})`;

            let addBusinessResults = await pool.query(addBusinessSQL, businessParams);
            businessId = addBusinessResults.insertId
            console.log(addBusinessResults.insertId, addBusinessResults);
        } else if (businessExistsResults.length === 1) { // Business Exists Once
            businessExists = true;
            businessId = businessExistsResults[0].businessId;
        } else if (businessExistsResults.length > 1) { // Business is in there a few times
            // DO SOMETHING
        }
    }


    // Create Membership
    let addMembershipDetails = buildList('addMembership', req);

    if (businessId !== null && businessId !== '') {
        addMembershipDetails.columns.push('businesses_businessId');
        addMembershipDetails.values.push('?');
        addMembershipDetails.params.push(businessId)
    }

    let membershipColumnList = addMembershipDetails.columns.join(',');
    let membershipValueList = addMembershipDetails.values.join(',');
    let membershipParams = addMembershipDetails.params;

    var addMembershipSQL = `insert into memberships (${membershipColumnList}) values (${membershipValueList})`;

    console.log(addMembershipSQL);

    let addMembershipResults = await pool.query(addMembershipSQL, membershipParams);
    let membershipId = addMembershipResults.insertId;

    // Add family members if membership is of type family
    if (req.membershipType === 'family') {
        for (var i = 1; i < req.familyMembers.length; i++) {
            let info = {
                membershipId: membershipId,
                firstName: req.familyMembers[i].familyMemberFirstName,
                lastName: req.familyMembers[i].familyMemberLastName,
                phoneNumber: req.familyMembers[i].familyMemberPhoneNumber,
                email: req.familyMembers[i].familyMemberEmail,
                ofAge: req.familyMembers[i].familyMemberOfAge
            }

            let addFamilyMemberDetails = buildList('addFamilyMembers', info);
            let familyMemberColumnList = addFamilyMemberDetails.columns.join(',');
            let familyMemberValueList = addFamilyMemberDetails.values.join(',');
            let familyMemberParams = addFamilyMemberDetails.params;

            var addFamilyMemberSQL = `insert into additionalMembers (${familyMemberColumnList}) values (${familyMemberValueList})`;

            let addFamilyMemberResults = await pool.query(addFamilyMemberSQL, familyMemberParams);
        }
    }



    // Send Registration Email
    const email = import('./email.js');

    email.sendEmail();




};

function getFamilyMembersDetails(info) {
    info.ofAge === true ? info.ofAge = 1 : info.ofAge = 0;

    return [{
            column: 'memberships_membershipId',
            value: info.membershipId
        },
        {
            column: 'firstName',
            value: info.firstName
        }, {
            column: 'lastName',
            value: info.lastName
        }, {
            column: 'phoneNumber',
            value: info.phoneNumber
        }, {
            column: 'email',
            value: info.email
        }, {
            column: 'ofAge',
            value: info.ofAge
        }
    ];
}

function getBusinessDetails(req) {
    if (req.business !== undefined) {
        return [{
                column: 'businessName',
                value: req.businessName
            },
            {
                column: 'phone',
                value: req.businessPhoneNumber
            },
            {
                column: 'website',
                value: req.businessWebsite
            },
            {
                column: 'addressLine1',
                value: req.businessAddress
            },
            {
                column: 'addressLine2',
                value: req.businessOther
            },
            {
                column: 'city',
                value: req.businessCity
            },
            {
                column: 'state',
                value: req.businessState
            },
            {
                column: 'postalCode',
                value: req.businessPostalCode
            }
        ];
    }
}

function getMembershipDetails(info) {
    info.ofAge === true ? info.ofAge = 1 : info.ofAge = 0;


    console.log(info);


    return [{
            column: 'membershipTypes_membershipTypeId',
            value: info.membershipType,
            select: '(select membershipTypeId from membershipTypes where membershipTypeName = ?)'
        }, {
            column: 'firstName',
            value: info.firstName
        }, {
            column: 'lastName',
            value: info.lastName
        }, {
            column: 'ofAge',
            value: info.ofAge
        },
        {
            column: 'addressLine1',
            value: info.address
        },
        {
            column: 'addressLine2',
            value: info.other
        },
        {
            column: 'city',
            value: info.city
        },
        {
            column: 'state',
            value: info.state
        }, {
            column: 'postalCode',
            value: info.postalCode
        }, {
            column: 'emailAddress',
            value: info.email
        },
        {
            column: 'homePhone',
            value: info.homePhone
        },
        {
            column: 'mobilePhone',
            value: info.mobilePhone
        },
        {
            column: 'otherPhone',
            value: info.otherPhone
        },
        {
            column: 'additionalDonation',
            value: info.additionalDonation
        }
    ];
}

function buildList(type, req) {

    switch (type) {
        case 'addBusiness':
            formInfo = getBusinessDetails(req);
            break;

        case 'addMembership':
            formInfo = getMembershipDetails(req);
            break;

        case 'addFamilyMembers':
            formInfo = getFamilyMembersDetails(req);
            break;

    }


    var columns = [];
    var values = [];
    var params = [];

    for (var item of formInfo) {
        var value = '';
        var column = '';
        if (item.column !== null && item.column !== '' && item.value !== undefined) {
            if (item.select !== undefined && (item.select !== null || item.select !== 'undefined')) {
                columns.push(item.column);
                values.push(item.select);
                params.push(`${item.value}`)
            } else if (item.value !== null) {
                columns.push(item.column)
                values.push('?');
                params.push(`${item.value}`)
            }
        }
    }

    return {
        columns: columns,
        values: values,
        params: params
    }

}