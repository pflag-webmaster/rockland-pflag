const express = require('express');
const router = express.Router();

// Get Membership Controller
const Membership = require('../controllers/membership')


/*
 * GET Check Email
 */
router.get('/check-email', function (req, res) {

    console.log('in routes: req ', req.query.email);

    Membership.checkEmail(req.query.email, (err, exists) => {

        if (err) {
            console.log(err);
            res.json({
                err: err
            })
        } else {
            if (exists) {
                console.log('in routes: email exists: ', exists)
                res.json(exists);
            } else {
                res.json(exists);
            }
        }
    });

});





/*
 * POST Add Membership 
 */
router.post('/add', function (req, res) {
    if (req.body) {
        Membership.addMembership(req.body, (result) => {
            if (result.err) {
                console.log(err);
                res.json({
                    err: err
                })
            }


            console.log(result);

            res.status(200);

            /* if (result.results) {
                res.json(result.results);
            } else {
                res.json({
                    results: null
                });
            } */
        });

    }
});

// Exports
module.exports = router;