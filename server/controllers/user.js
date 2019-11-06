const User = require('../models/user');
const MongooseHelpers = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

exports.auth = function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (!password || !email) {
        return res.status(422).send({
            errors: [{title: 'Data Missing!', detail: 'Provide email and password'}]
        });
    }

    User.findOne({email}, function(err, user) {
        if (err) {
            return res.status(422).send({
                errors: MongooseHelpers.normalizeErrors(err.errors)
            });
        }

        if (!user) {
            return res.status(422).send({
                errors: [{title: 'Invalid User!', detail: 'User does not exist'}]
            });
        }

        if (user.hasSamePassword(password)) {
            const token = jwt.sign({
                userId: user.id,
                username: user.username 
            }, config.SECRET, { expiresIn: '1h' });

            return res.json(token); 
        } else {
            return res.status(422).send({
                errors: [{title: 'Wrong Data!', detail: 'Wrong email or password'}]
            });
        }
    });
}

exports.register = function(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirmation = req.body.passwordConfirmation;

    if (!password || !email) {
        return res.status(422).send({errors: [{title: 'Data Missing!', detail: 'Provide email and password'}]});
    }

    if (password !== passwordConfirmation) {
        return res.status(422).send(
            {errors: [{title: 'Invalid Password!', detail: 'Password is not same as confirmation!'}]}
        );
    }

    User.findOne({email}, function(err, existingUser) {
        if (err) {
            return res.status(422).send({
                errors: MongooseHelpers.normalizeErrors(err.errors)
            });
        }

        if (existingUser) {
            return res.status(422).send({
                errors: [{
                    title: 'Invalid email',
                    detail: 'User with this email already exist'
                }]
            });
        }

        const user = new User({
            username: username,
            email: email,
            password: password
        });

        user.save(function(err) {
            if (err) {
                return res.status(422).send({
                    errors: MongooseHelpers.normalizeErrors(err.errors)  
                });
            }
            return res.json({'registerd': true});
        });
    });
}