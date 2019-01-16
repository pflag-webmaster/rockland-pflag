const express = require('express');
const router = express.Router();


const cors = require('cors')
router.options('*', cors())


// Get User Controller
const User = require('../controllers/user')

/*
 * POST login
 */
router.post('/login', User.login);



/* router.post('/login', function (req, res) {

    console.log('login route: ', req.body);

    if (req.body.email !== '' && req.body.password !== '') {
        var login = {
            email: req.body.email,
            password: req.body.password
        }

        User.login(login, (results) => {

            console.log('returning from API: ', results);
            if (results.err) {
                console.log(results.err);
                return res.status(201).json({
                    error: results.err,
                    success: false,
                    message: 'Login Error',
                    data: null
                });
            }

            if (results) {
                return res.status(201).json({
                    error: null,
                    success: true,
                    message: 'Results returned',
                    data: results
                });
            } else {
                return res.status(200).json({
                    error: null,
                    success: false,
                    message: 'No Results returned',
                    data: null
                });
            }
        });
    } else {
        console.log('err: missing email and or password');

        return res.status(200).json({
            error: null,
            success: false,
            message: 'missing email and/or password',
            data: null
        });
    }

}); */

/*
 * POST register user 
 */
/* router.get('/registerUser', function (req, res) {


        Event.getAllEvents((err, results) => {
                     if (err) {
                console.log(err);
                res.json({å
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
}); */

// Exports
module.exports = router;