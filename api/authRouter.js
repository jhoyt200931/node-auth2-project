const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../jwtConfig/secrets.js');
const users = require('./users-model.js');

const router = require('express').Router();

router.post('/register', async (req, res) => {
    const credentials = req.body;

    try {
        const hash = bcrypt.hashSync(credentials.password, 12);
        credentials.password = hash;

        const user = await users.add(credentials);
        const token = generateToken(user);

        res.status(201).json({data: user, token: token });
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'There was an error registering the user', err})
    }
})

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    try {
        const [user] = await users.findBy({username});

        if(user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({message: `Welcome ${username}`, token: token})
        } else {
            res.status(401).json({message: 'You shall not pass!'})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'There was an error logging in'})
    }
})

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    };
    const options = {
        expiresIn: '2m'
    };
    const token = jwt.sign(payload, secrets.jwtSecret, options);

    return token;
}


module.exports = router;