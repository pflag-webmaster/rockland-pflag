const express = require('express');
const router = express.Router();

// Get Events Model
const Event = require('../controllers/event')


/*
 * GET All Events 
 */
router.get('/getAllEvents', function (req, res) {
    Event.getAllEvents((err, results) => {
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