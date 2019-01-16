const pool = require('../common/db');

var test = {
    membershipType: 'businessPremium',
    names: [{
            firstName: 'Jerry',
            lastName: 'Smith'
        },
        {
            firstName: 'Donna',
            lastName: 'Smith'
        },
        {
            firstName: 'Billy',
            lastName: 'Smith'
        },
        {
            firstName: 'Phil',
            lastName: 'Smith'
        }
    ],
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
    additionalDonation: '123.45',
    business: {
        businessName: 'Luken Consulting',
        businessPhoneNumber: '2121234567',
        businessEmailAddress: 'dennis@lukenconsulting.com',
        businessWebsite: 'www.lukenconsulting.com',
        businessAddress: {
            addressLine1: '123 Main St',
            addressLine2: 'Aapt 4',
            city: 'Nyack',
            state: 'NY',
            postalCode: '10956'
        }
    }
}

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

    let addMembershipResults = await pool.query(addMembershipSQL, membershipParams);
    let membershipId = addMembershipResults.insertId;

    // Add family members if membership is of type family
    if (req.membershipType === 'family') {

        console.log(req.names);

        for (var i = 1; i < req.names.length; i++) {

            let info = {
                membershipId: membershipId,
                firstName: req.names[i].firstName,
                lastName: req.names[i].lastName,
            }

            let addFamilyMemberDetails = buildList('addFamilyMembers', info);
            let familyMemberColumnList = addFamilyMemberDetails.columns.join(',');
            let familyMemberValueList = addFamilyMemberDetails.values.join(',');
            let familyMemberParams = addFamilyMemberDetails.params;

            var addFamilyMemberSQL = `insert into additionalMembers (${familyMemberColumnList}) values (${familyMemberValueList})`;

            let addFamilyMemberResults = await pool.query(addFamilyMemberSQL, familyMemberParams);
        }
    }
};

function getFamilyMembersDetails(req) {
    return [{
            column: 'memberships_membershipId',
            value: req.membershipId
        },
        {
            column: 'firstName',
            value: req.firstName
        },
        {
            column: 'lastName',
            value: req.lastName
        },
    ];
}

function getBusinessDetails(req) {
    if (req.business !== undefined) {
        return [{
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
        ];
    }
}

function getMembershipDetails(req) {
    return [{
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