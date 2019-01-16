var bootstrapType = 'dev'; //'prod'; 

(function () {

    console.log('\n\n\n\n\n\n\n=============================================\n\n');
    var knex = require('../common/knex');
    var co = require('co');

    var Country = require('./models/Country');
    var Region = require('./models/Region');
    var Role = require('./models/Role');
    var Privilege = require('./models/Privilege');
    var RolePrivilege = require('./models/RolePrivilege');
    var User = require('./models/User');
    var UserRole = require('./models/UserRole');
    var Event = require('./models/Event');
    var EventTimes = require('./models/EventTimes');
    var MembershipTypes = require('./models/MembershipTypes');

    bootstrap = co.wrap(function* () {

        var tables = 'regions,countries,rolePrivilege,privileges,userRoles,roles,eventTimes,events,additionalMembers,membershipPayments,memberships,businesses,membershipTypes,adminComments,users';

        var truncateTables = tables.split(',');

        var countryLookup = {};
        var countryData = getCountries();
        var regionsData = getRegions();

        var roleLookup = {};
        var roles = getRoles();

        var privilegeLookup = {};
        var privileges = getPrivileges();

        var rolesPrivileges = getRolesPrivileges();

        var userLookup = {};
        var users = getUsers();
        var userRoles = getUsersRoles();

        var eventLookup = {};
        var events = getEvents();
        var eventTimes = getEventTimes();

        var membershipTypes = getMembershipTypes();


        // Drop existing tables
        console.log('Truncating Tables');
        for (var table of truncateTables) {
            console.log("\ttruncating " + table);
            yield knex(table).del();
        }
        console.log('\nDone Truncating Tables\n\n');

        // Populate Tables  

        // Countries
        for (var country of countryData) {
            var c = (yield new Country(country).save());
            countryLookup[country.abbr] = c.id;
        }
        console.log('Countries populated');


        // Regions
        for (var regionSet of regionsData) {
            var cId = countryLookup[regionSet.country];
            for (region of regionSet.regions) {
                region.countries_countryId = cId;
                var r = (yield new Region(region).save());
            }
        }
        console.log('Regions populated');

        // Roles
        for (var role of roles) {
            var r = (yield new Role({
                name: role
            }).save());
            roleLookup[role] = r.id;
        }
        console.log('Roles populated');

        // Privileges
        for (var privilege of privileges) {
            var p = (yield new Privilege({
                name: privilege
            }).save());
            privilegeLookup[privilege] = p.id;
        }
        console.log('Privileges populated');

        // RolesPrivilege
        for (var rp of rolesPrivileges) {
            var roleId = roleLookup[rp.role];
            var privList = rp.privs.split(',');
            for (var pr of privList) {
                var privilegeId = privilegeLookup[pr];
                var p = (yield new RolePrivilege({
                    roles_roleId: roleId,
                    privileges_privilegeId: privilegeId
                }).save());
            }
        }
        console.log('RolePrivileges populated');


        // Users
        for (var user of users) {
            var u = (yield new User(user).save());
            userLookup[user.email] = u.id;
        }
        console.log('Users populated');

        // UserRoles
        for (var uR of userRoles) {
            var userId = userLookup[uR.email];
            var roles = uR.roles.split(',');
            for (var role of roles) {
                var roleId = roleLookup[role];
                var p = (yield new UserRole({
                    users_userId: userId,
                    roles_roleId: roleId
                }).save());
            }
        }
        console.log('UserRoles populated');

        //Events
        for (var event of events) {
            var e = (yield new Event(event).save());
            eventLookup[event.title] = e.id;
        }
        console.log('Events populated');

        // EventTimes
        for (var eT in eventTimes) {
            if (eventTimes[eT] !== undefined) {
                eventTimes[eT].events_eventId = eventLookup[eT];
                yield new EventTimes(eventTimes[eT]).save();
            }
        }
        console.log('EventTimes populated');

        // MembershipTypes
        for (var mT of membershipTypes) {
            yield new MembershipTypes(mT).save();
        }
        console.log('MembershipTypes populated');


    });
    bootstrap().then(function () {
        return console.log('ok');
    })["catch"](function (e) {
        return console.log(e);
    }).then(function () {
        return knex.destroy().then(function () {
            return console.log('closing');
        });
    });

}).call(this);

function getMembershipTypes() {
    return [{
            membershipTypeName: 'student',
            membershipTypeDisplayName: 'Student',
            membershipCost: '25',
            sortOrder: 0
        },
        {
            membershipTypeName: 'individual',
            membershipTypeDisplayName: 'Individual',
            membershipCost: '40',
            sortOrder: 1
        },
        {
            membershipTypeName: 'family',
            membershipTypeDisplayName: 'Family',
            membershipCost: '75',
            sortOrder: 2
        },
        {
            membershipTypeName: 'business',
            membershipTypeDisplayName: 'Business',
            membershipCost: '100',
            sortOrder: 3
        },
        {
            membershipTypeName: 'businessPremium',
            membershipTypeDisplayName: 'Business Premium',
            membershipCost: '250',
            sortOrder: 4
        }
    ]


}

function getEventTimes() {
    return {
        'Pearl River Walk': {
            eventDate: '2018-10-06',
            eventBegin: '10:00:00',
            recurring: false,
            eventFinish: ''
        },
        'Rockland Pride Ball': {
            eventDate: '2018-10-13',
            recurring: false,
            eventBegin: '18:00:00',
            eventFinish: '11:59:59',
        },
        'PFLAG Meeting': {
            dayOfWeek: 3,
            weekOfMonth: 1,
            recurring: true,
            eventBegin: '19:30:00',
            eventFinish: '21:00:00'
        },
        'Transparent Meeting': {
            dayOfWeek: 3,
            weekOfMonth: 3,
            recurring: true,
            eventBegin: '20:00:00',
            eventFinish: '21:30:00'
        }
    };
}

function getEvents() {
    return [{
            title: 'Pearl River Walk',
            description: 'Come by and visit PFLAG Rockland at Pearl River Day!',
            website: 'http://pearlriverny.org/pearl-river-day-2018/'
        },
        {
            title: 'Rockland Pride Ball',
            description: 'Imagine this&helliup; visual delights curated by local artists under a vintage big top circus tent on the shores of Rockland Lake.',
            website: 'http://rocklandpridecenter.org/events/the-pride-ball/'
        },
        {
            title: 'PFLAG Meeting',
            description: 'For meeting locations in Rockland County contact info@rocklandpflag.org or call us at  (845)-353-6300.'
        },
        {
            title: 'Transparent Meeting',
            description: 'For meeting locations in Rockland County contact info@rocklandpflag.org or call us at  (845)-353-6300.'
        },
    ];
}


function getUsersRoles() {
    return [{
        user: 'dpluken@gmail.com',
        roles: 'WebMaster'
    }, {
        user: 'chrisbarry@gmail.com',
        roles: 'Master'
    }, {
        user: 'megsullivan@gmail.com',
        roles: 'Admin'
    }, {
        user: 'scottbosley@gmail.com',
        roles: 'Admin,ShopKeep'
    }, {
        user: 'ellenwoods@gmail.com',
        roles: 'ShopKeep'
    }, ];
}

function getUsers() {
    return [{
        email: 'dpluken@gmail.com',
        password: 'password',
        firstName: 'Dennis',
        lastName: 'Luken'
    }, {
        email: 'chrisbarry@gmail.com',
        password: 'password',
        firstName: 'Chris',
        lastName: 'Barry'
    }, {
        email: 'scottbosley@gmail.com',
        password: 'password',
        firstName: 'Scott',
        lastName: 'Bosley'
    }, {
        email: 'megsullivan@gmail.com',
        password: 'password',
        firstName: 'Meg',
        lastName: 'Sullivan'
    }, {
        email: 'ellenwoods@gmail.com',
        password: 'password',
        firstName: 'Ellen',
        lastName: 'Woods'
    }];
}


function getRolesPrivileges() {
    return [{
            role: 'Master',
            privs: 'Add-Master,Remove-Master,Add-Admin,Remove-Admin,Add-Member,Edit-Member,Remove-Member,Add-User,Remove-User,View-Reports,Make-Post,Review-Post,Login-Admin,Login-Private'
        },
        {
            role: 'Admin',
            privs: 'Add-Master,Remove-Master,Add-Admin,Remove-Admin,Add-Member,Edit-Member,Remove-Member,Add-User,Remove-User,View-Reports,Make-Post,Review-Post,Login-Admin,Login-Private'
        },
        {
            role: 'Member',
            privs: 'View-Reports,Make-Post,Login-Private'
        }, {
            role: 'ShopKeep',
            privs: 'Add-Master,Remove-Master,Add-Admin,Remove-Admin,Add-Member,Edit-Member,Remove-Member,Add-User,Remove-User,View-Reports,Make-Post,Review-Post,Login-Admin,Login-Private'
        }, {
            role: 'BusinessSponsor',
            privs: 'Add-Master,Remove-Master,Add-Admin,Remove-Admin,Add-Member,Edit-Member,Remove-Member,Add-User,Remove-User,View-Reports,Make-Post,Review-Post,Login-Admin,Login-Private'
        }, {
            role: 'User',
            privs: 'Make-Post,Login-Private'
        }
    ];
}

function getPrivileges() {
    return [
        'Add-Master',
        'Remove-Master',
        'Add-Admin',
        'Remove-Admin',
        'Add-Member',
        'Edit-Member',
        'Remove-Member',
        'Add-User',
        'Remove-User',
        'View-Reports',
        'Make-Post',
        'Review-Post',
        'Login-Admin',
        'Login-Private'

    ];
}

function getRoles() {
    return [
        'WebMaster',
        'Master',
        'Admin',
        'ShopKeep',
        'Member',
        'User',
        'BusinessSponsor',
    ];
}

function getCountries() {

    return [{
            name: 'United States of America',
            abbr: 'USA',
            regionTypeName: 'State',
            postalCodeName: 'Zip Code',
            sortOrder: 1
        },
        {
            name: 'Canada',
            abbr: 'CAN',
            regionTypeName: 'Province',
            postalCodeName: 'Postal Code',
            sortOrder: 2
        },
        {
            name: 'Mexico',
            abbr: 'MEX',
            regionTypeName: 'State',
            postalCodeName: 'Postal Code',
            sortOrder: 2
        }
    ];

}

function getRegions() {
    return [{
            country: 'USA',
            regions: [{
                    name: 'Alabama',
                    abbr: 'AL'
                },
                {
                    name: 'Missouri',
                    abbr: 'MO'
                },
                {
                    name: 'Alaska',
                    abbr: 'AK'
                },
                {
                    name: 'Montana',
                    abbr: 'MT'
                },
                {
                    name: 'Arizona',
                    abbr: 'AZ'
                },
                {
                    name: 'Nebraska',
                    abbr: 'NE'
                },
                {
                    name: 'Arkansas',
                    abbr: 'AR'
                },
                {
                    name: 'Nevada',
                    abbr: 'NV'
                },
                {
                    name: 'California',
                    abbr: 'CA'
                },
                {
                    name: 'New Hampshire',
                    abbr: 'NH'
                },
                {
                    name: 'Colorado',
                    abbr: 'CO'
                },
                {
                    name: 'New Jersey',
                    abbr: 'NJ'
                },
                {
                    name: 'Connecticut',
                    abbr: 'CT'
                },
                {
                    name: 'New Mexico',
                    abbr: 'NM'
                },
                {
                    name: 'Delaware',
                    abbr: 'DE'
                },
                {
                    name: 'New York',
                    abbr: 'NY'
                },
                {
                    name: 'District of Columbia',
                    abbr: 'DC'
                },
                {
                    name: 'North Carolina',
                    abbr: 'NC'
                },
                {
                    name: 'Florida',
                    abbr: 'FL'
                },
                {
                    name: 'North Dakota',
                    abbr: 'ND'
                },
                {
                    name: 'Georgia',
                    abbr: 'GA'
                },
                {
                    name: 'Ohio',
                    abbr: 'OH'
                },
                {
                    name: 'Hawaii',
                    abbr: 'HI'
                },
                {
                    name: 'Oklahoma',
                    abbr: 'OK'
                },
                {
                    name: 'Idaho',
                    abbr: 'ID'
                },
                {
                    name: 'Oregon',
                    abbr: 'OR'
                },
                {
                    name: 'Illinois',
                    abbr: 'IL'
                },
                {
                    name: 'Pennsylvania',
                    abbr: 'PA'
                },
                {
                    name: 'Indiana',
                    abbr: 'IN'
                },
                {
                    name: 'Rhode Island',
                    abbr: 'RI'
                },
                {
                    name: 'Iowa',
                    abbr: 'IA'
                },
                {
                    name: 'South Carolina',
                    abbr: 'SC'
                },
                {
                    name: 'Kansas',
                    abbr: 'KS'
                },
                {
                    name: 'South Dakota',
                    abbr: 'SD'
                },
                {
                    name: 'Kentucky',
                    abbr: 'KY'
                },
                {
                    name: 'Tennessee',
                    abbr: 'TN'
                },
                {
                    name: 'Louisiana',
                    abbr: 'LA'
                },
                {
                    name: 'Texas',
                    abbr: 'TX'
                },
                {
                    name: 'Maine',
                    abbr: 'ME'
                },
                {
                    name: 'Utah',
                    abbr: 'UT'
                },
                {
                    name: 'Maryland',
                    abbr: 'MD'
                },
                {
                    name: 'Vermont',
                    abbr: 'VT'
                },
                {
                    name: 'Massachusetts',
                    abbr: 'MA'
                },
                {
                    name: 'Virginia',
                    abbr: 'VA'
                },
                {
                    name: 'Michigan',
                    abbr: 'MI'
                },
                {
                    name: 'Washington',
                    abbr: 'WA'
                },
                {
                    name: 'Minnesota',
                    abbr: 'MN'
                },
                {
                    name: 'West Virginia',
                    abbr: 'WV'
                },
                {
                    name: 'Mississippi',
                    abbr: 'MS'
                },
                {
                    name: 'Wisconsin',
                    abbr: 'WI'
                },
                {
                    name: 'Wyoming',
                    abbr: 'WY'
                }
            ]
        },
        {
            country: 'CAN',
            regions: [{
                    name: 'Alberta',
                    abbr: 'AL'
                },
                {
                    name: 'British Columbia',
                    abbr: 'BC'
                },
                {
                    name: 'Manitoba',
                    abbr: 'MB'
                },
                {
                    name: 'New Brunswick',
                    abbr: 'NB'
                },
                {
                    name: 'Newfoundland and Labrador',
                    abbr: 'NL'
                },
                {
                    name: 'Nova Socia',
                    abbr: 'NS'
                },
                {
                    name: 'Northwest Territories',
                    abbr: 'NT'
                },
                {
                    name: 'Nunavut',
                    abbr: 'NU'
                },
                {
                    name: 'Ontario',
                    abbr: 'ON'
                },
                {
                    name: 'Prince Edwards Island',
                    abbr: 'PE'
                },
                {
                    name: 'Quebec',
                    abbr: 'QC'
                },
                {
                    name: 'Saskatchewan',
                    abbr: 'SK'
                },
                {
                    name: 'Yukon',
                    abbr: 'YT'
                },
            ]
        },
        {
            country: 'MEX',
            regions: [{
                    name: 'Aguascalientes',
                    abbr: 'AG'
                },
                {
                    name: 'Baja California',
                    abbr: 'BC'
                },
                {
                    name: 'Baja California Sur',
                    abbr: 'BS'
                },
                {
                    name: 'Chihuahua',
                    abbr: 'CH'
                },
                {
                    name: 'Colima',
                    abbr: 'CL'
                },
                {
                    name: 'Campeche',
                    abbr: 'CM'
                },
                {
                    name: 'Coahuila',
                    abbr: 'CO'
                },
                {
                    name: 'Chiapas',
                    abbr: 'CS'
                },
                {
                    name: 'Federal District',
                    abbr: 'DF'
                },
                {
                    name: 'Durango',
                    abbr: 'DG'
                },
                {
                    name: 'Guerrero',
                    abbr: 'GR'
                },
                {
                    name: 'Guanajuato',
                    abbr: 'GT'
                },
                {
                    name: 'Hidalgo',
                    abbr: 'HG'
                },
                {
                    name: 'Jalisco',
                    abbr: 'JA'
                },
                {
                    name: 'Mexico State',
                    abbr: 'ME'
                },
                {
                    name: 'Michoacan',
                    abbr: 'MI'
                },
                {
                    name: 'Morelos',
                    abbr: 'MO'
                },
                {
                    name: 'Nayarit',
                    abbr: 'NA'
                },
                {
                    name: 'Nuevo Leon',
                    abbr: 'NL'
                },
                {
                    name: 'Oaxaca',
                    abbr: 'OA'
                },
                {
                    name: 'Puebla',
                    abbr: 'PB'
                },
                {
                    name: 'Queretaro',
                    abbr: 'QE'
                },
                {
                    name: 'Quintana Roo',
                    abbr: 'QR'
                },
                {
                    name: 'Sinaloa',
                    abbr: 'SI'
                },
                {
                    name: 'San Luis Potosi',
                    abbr: 'SL'
                },
                {
                    name: 'Sonora',
                    abbr: 'SO'
                },
                {
                    name: 'Tabasco',
                    abbr: 'TB'
                },
                {
                    name: 'Tlaxcala',
                    abbr: 'TL'
                },
                {
                    name: 'Tamaulipas',
                    abbr: 'TM'
                },
                {
                    name: 'Veracruz',
                    abbr: 'VE'
                },
                {
                    name: 'Yucatan',
                    abbr: 'YU'
                },
                {
                    name: 'Zacatecas',
                    abbr: 'ZA'
                },
            ]
        }
    ];
}