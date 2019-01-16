const express = require('express');
const router = express.Router();

// Get Events Model
const Domain = require('../controllers/domain')


/*
 * GET Membership Types 
 */
router.get('/membership-types', function (req, res) {
    Domain.getMembershipTypes((err, results) => {
        if (err) {
            console.log(err);
            res.json({
                err: err
            })
        }

        if (results) {
            res.json(results);
        } else {
            res.json({
                results: null
            });
        }
    });
});

// Exports
module.exports = router;