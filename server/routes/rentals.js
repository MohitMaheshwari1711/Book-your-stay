const express = require('express');
const Rental = require('../models/rental');
const User = require('../models/user');
const router = express.Router();

const UserCtrl = require('../controllers/user');
const { normalizeErrors } = require('../helpers/mongoose');

router.get('/secret', UserCtrl.authMiddleware, function (req, res) {
    res.json({ "secret": true });
});


router.get('/manage', UserCtrl.authMiddleware, function (req, res) {
    const user = res.locals.user;

    Rental
        .where({ user })
        .populate('bookings')
        .exec(function (err, foundRentals) {

            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }

            return res.json(foundRentals);

        }
    );
});

router.get('/:_id', function (req, res) {
    const rentalId = req.params._id;

    Rental.findById(rentalId)
        .populate('user', 'username -_id')
        .populate('bookings', 'startAt endAt -_id')
        .exec(function (err, foundRental) {

            if (err) {
                return res.status(422).send({ errors: [{ title: 'Rental Error!', detail: 'Could not find Rental!' }] });
            }
            return res.json(foundRental);
        });
});




router.post('', UserCtrl.authMiddleware, function (req, res) {
    const { title, city, street, category, image, shared, bedrooms, description, dailyRate } = req.body;
    const user = res.locals.user;

    const rental = new Rental({
        title, city, street, category, image, shared, bedrooms, description, dailyRate
    });
    rental.user = user;

    Rental.create(rental, function (err, newRental) {
        if (err) {
            return res.status(422).send({
                errors: normalizeErrors(err.errors)
            });
        }

        User.update({ _id: user._id }, { $push: { rentals: newRental } }, function () { });
        return res.json(newRental);
    });
});




router.get('', function (req, res) {
    const city = req.query.city;
    const query = city ? { city: city.toLowerCase() } : {};

    Rental.find(query)
        .select('-bookings')
        .exec(function (err, foundRentals) {
            if (err) {
                return res.status(422).send({
                    errors: normalizeErrors(err.errors)
                });
            }
            if (city && foundRentals.length === 0) {
                return res.status(422).send({
                    errors: [{
                        title: 'No Rentals Found!',
                        detail: `There are no rentals for ${city}`
                    }]
                });
            }
            return res.json(foundRentals);
        }
        );
});




router.delete('/:_id', UserCtrl.authMiddleware, function (req, res) {
    const user = res.locals.user;

    Rental.findById(req.params._id)
        .populate('user', '_id')
        .populate({
            path: 'bookings',
            select: 'startAt',
            match: { startAt: { $gt: new Date() } }
        }).exec(function (err, foundRental) {
            if (err) {
                return res.status(422).send({
                    errors: normalizeErrors(err.errors)
                });
            }


            if ((user._id).toString() !== (foundRental.user._id).toString()) {
                return res.status(422).send({
                    errors: [{
                        title: 'Invalid User!',
                        detail: 'You are not rental owner!'
                    }]
                });
            }

            if (foundRental.bookings.length > 0) {
                return res.status(422).send({
                    errors: [{
                        title: 'Active Bookings!',
                        detail: 'Cannot delete rental with active bookings!'
                    }]
                });
            }

            foundRental.remove(function (err) {
                if (err) {
                    return res.status(422).send({
                        errors: normalizeErrors(err.errors)
                    });
                }
                return res.json({
                    'status': 'Deleted'
                })
            });
        }
        )
});


module.exports = router;