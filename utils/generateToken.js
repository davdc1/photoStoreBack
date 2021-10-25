const jwt = require('jsonwebtoken');

const generateToken = (_id) => {
    console.log('generatetoken');
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '30m'})
}

module.exports = generateToken;