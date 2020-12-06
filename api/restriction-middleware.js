const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';
        
        if(token) {
            jwt.verify(token, secret, (err, decodedToken) => {
                console.log(secret);
                if(err) {
                    res.status(401).json({message: 'You shall not pass!'})
                } else {
                    req.decodedToken = decodedToken;
                    next();
                }
            })
        } else {
            res.status(401).json({message: 'You shall not pass!'})
        }
    } catch (err) {
        res.status(500).json({message: 'There was an error fetching users'});
    }
};