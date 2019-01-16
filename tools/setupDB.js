(function () {
    var knex = require('../common/knex');
    var co = require('co');

    var dropTable = co.wrap(function* (table) {
        yield knex.schema.dropTableIfExists(table);
    });

    var tables, dropTables, roles, privileges, rolesPrivileges, users, countries, regions, events, eventTimes, keywords, eventKeywords, additionalMembers, memberships, membershipTypes, businesses, membershipPayments, adminComments

    tables = 'rolePrivilege,userRoles,privileges,roles,eventTimes,eventkeywords,events,keywords,members,regions,countries,additionalMembers,membershipPayments,memberships,businesses,membershipTypes,adminComments,users';

    dropTables = tables.split(',');

    setup = co.wrap(function* () {
        // Drop existing tables
        console.log('Dropping existing Tables');
        for (var d of dropTables) {
            console.log("\tdropping " + d);
            yield knex.schema.dropTableIfExists(d);
        }
        console.log('\nDone Dropping Tables\n\n');

        console.log('Creating Tables\n');
        if (1) {
            // Roles
            yield(roles = knex.schema.createTable('roles', function (t) {
                t.increments('roleId');
                t.string('name').unique().notNullable();
                t.string('description');
                t.string('sortOrder', 3);
                t.timestamps(true, true);
                return console.log('\tcreated countries');
            }));

            // Privileges
            yield(privileges = knex.schema.createTable('privileges', function (t) {
                t.increments('privilegeId');
                t.string('name', 50).notNullable();
                t.text('description');
                return console.log('\tcreated privileges');
            }));


            // Role Privileges
            yield(rolePrivilege = knex.schema.createTable('rolePrivilege', function (t) {
                t.increments('rolePrivilegeId');
                t.integer('roles_roleId').unsigned();
                t.foreign('roles_roleId').references('roles.roleId');
                t.integer('privileges_privilegeId').unsigned();
                t.foreign('privileges_privilegeId').references('privileges.privilegeId');
                return console.log('\tcreated rolePrivilege');
            }));

            // Users
            yield(users = knex.schema.createTable('users', function (t) {
                t.increments('userId');
                t.string('email').unique().notNullable();
                t.string('password', 20);
                t.string('firstName', 50);
                t.string('lastName', 50);
                t.integer('createdBy').unsigned();
                t.timestamps(true, true);
                return console.log('\tcreated users');
            }));

            // User Roles
            yield(userRoles = knex.schema.createTable('userRoles', function (t) {
                t.increments('userRoleId');
                t.integer('users_userId').unsigned();
                t.foreign('users_userId').references('users.userId');
                t.integer('roles_roleId').unsigned();
                t.foreign('roles_roleId').references('roles.roleId');
                t.timestamps(true, true);
                return console.log('\tcreated userRoles');
            }));

            // Countries
            yield(countries = knex.schema.createTable('countries', function (t) {
                t.increments('countryId');
                t.string('name').unique().notNullable();
                t.string('regionTypeName').notNullable();
                t.string('postalCodeName').notNullable();
                t.string('abbr', 3).unique().notNullable();
                t.string('sortOrder', 3);
                t.timestamps(true, true);
                return console.log('\tcreated countries');
            }));

            // Regions
            yield(regions = knex.schema.createTable('regions', function (t) {
                t.increments('regionId');
                t.string('name').notNullable();
                t.string('abbr', 3).notNullable();
                t.integer('countries_countryId').unsigned();
                t.foreign('countries_countryId').references('countries.countryId');
                return console.log('\tcreated regions');
            }));

            // Keywords
            yield(keywords = knex.schema.createTable('keywords', function (t) {
                t.increments('keywordId');
                t.string('keyword').notNullable();
                t.string('description');
                t.timestamps(true, true);
                return console.log('\tcreated regions');
            }));

            // Events
            yield(events = knex.schema.createTable('events', function (t) {
                t.increments('eventId');
                t.string('title').notNullable();
                t.string('subTitle');
                t.text('description', 'longtext');
                t.string('shortDescription');
                t.string('streetAdress1');
                t.string('streetAdress2');
                t.string('city');
                t.integer('regions_regionId').unsigned();
                t.foreign('regions_regionId').references('regions.regionId');
                t.integer('countries_countryId').unsigned();
                t.foreign('countries_countryId').references('countries.countryId');
                t.string('contactName');
                t.string('contactEmail');
                t.string('contactPhoneNumber');
                t.string('website');
                t.integer('users_userId').unsigned();
                t.foreign('users_userId').references('users.userId');
                t.timestamps(true, true);
                return console.log('\tcreated events');
            }));

            // Event Times
            yield(eventTimes = knex.schema.createTable('eventTimes', function (t) {
                t.increments('eventTimeId');
                t.integer('events_eventId').unsigned();
                t.foreign('events_eventId').references('events.eventId');
                t.date('eventDate');
                t.time('eventBegin');
                t.time('eventFinish');
                t.integer('dayOfWeek').unsigned();
                t.integer('weekOfMonth').unsigned();
                t.boolean('recurring').defaultTo(false);
                t.timestamps(true, true);
                return console.log('\tcreated eventTimes');
            }));

            // Event Keywords
            yield(eventKeywords = knex.schema.createTable('eventKeywords', function (t) {
                t.increments('eventKeywordId');
                t.integer('events_eventId').unsigned();
                t.foreign('events_eventId').references('events.eventId');
                t.integer('eventKeywords_eventKeywordId').unsigned();
                t.foreign('eventKeywords_eventKeywordId').references('eventKeywords.eventKeywordId');
                t.timestamps(true, true);
                return console.log('\tcreated eventKeywords');
            }));


            // membershipTypes
            yield(membershipTypes = knex.schema.createTable('membershipTypes', function (t) {
                t.increments('membershipTypeId');
                t.string('membershipTypeName');
                t.string('membershipTypeDisplayName');
                t.string('membershipCost');
                t.integer('sortOrder');
                t.timestamps(true, true);
                return console.log('\tcreated membershipTypes');
            }));

            // businesses
            yield(businesses = knex.schema.createTable('businesses', function (t) {
                t.increments('businessId');
                t.string('businessName').notNullable();
                t.string('phone');
                t.string('website');
                t.string('addressLine1');
                t.string('addressLine2');
                t.string('city');
                t.string('state');
                t.string('postalCode');
                t.timestamps(true, true);
                return console.log('\tcreated businesses');
            }));


            // memberships
            yield(memberships = knex.schema.createTable('memberships', function (t) {
                t.increments('membershipId');
                t.integer('membershipTypes_membershipTypeId').unsigned();
                t.foreign('membershipTypes_membershipTypeId').references('membershipTypes_membershipTypeId');
                t.string('firstName');
                t.string('lastName');
                t.boolean('ofAge');
                t.string('addressLine1');
                t.string('addressLine2');
                t.string('city');
                t.string('state');
                t.string('postalCode');
                t.string('emailAddress');
                t.string('emailAddressConfirmationString');
                t.datetime('emailConfirmationStringExpires');
                t.date('emailAddressConfirmedOn');
                t.boolean('emailAddressConfirmed').defaultTo(false);
                t.string('homePhone');
                t.string('mobilePhone');
                t.string('otherPhone');
                t.decimal('additionalDonation', 11, 2);
                t.date('signUpDate');
                t.date('expirationDate');
                t.integer('businesses_businessId').unsigned();
                t.foreign('businesses_businessId').references('businesses_businessId');
                t.boolean('membershipCurrent').defaultTo(false);
                t.timestamps(true, true);
                return console.log('\tcreated memberships');
            }));

            // membershipPayments
            yield(membershipPayments = knex.schema.createTable('membershipPayments', function (t) {
                t.increments('membershipPaymentId');
                t.integer('memberships_membershipId').unsigned();
                t.foreign('memberships_membershipId').references('memberships.membershipId');
                t.date('paidOnDate');
                t.decimal('amount', 11, 2);
                t.string('source');
                t.string('confirmation');
                t.text('comment');
                t.integer('users_userId').unsigned();
                t.foreign('users_userId').references('users_userId');
                t.timestamps(true, true);
                return console.log('\tcreated membershipPayments');
            }));



            // additionalMembers
            yield(additionalMembers = knex.schema.createTable('additionalMembers', function (t) {
                t.increments('additionalMemberId');
                t.integer('memberships_membershipId').unsigned();
                t.foreign('memberships_membershipId').references('memberships.membershipId');
                t.string('firstName');
                t.string('lastName');
                t.string('phoneNumber');
                t.string('email');
                t.boolean('ofAge');
                t.timestamps(true, true);
                return console.log('\tcreated additionalMembers');
            }));

            // adminComments
            yield(adminComments = knex.schema.createTable('adminComments', function (t) {
                t.increments('adminCommentId');
                t.string('table');
                t.string('tableItemId');
                t.text('comment');
                t.integer('users_userId').unsigned();
                t.foreign('users_userId').references('users.userId');
                t.timestamps(true, true);
                return console.log('\tcreated additionalMembers');
            }));

            // Next Table here

        }

    });

    setup().then(function () {
        return console.log('ok');
    })["catch"](function (e) {
        return console.log(e);
    }).then(function () {
        return knex.destroy().then(function () {
            return console.log('closing');
        });
    });
}).call(this);