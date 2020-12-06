const router = require('express').Router();
const Users = require('./users-model.js');
const  restricted = require('./restriction-middleware.js');

router.get('/', restricted, async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'There was an error getting users'});
    }
})

module.exports = router;