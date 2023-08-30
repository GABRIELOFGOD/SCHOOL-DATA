const jwt = require('jsonwebtoken')

const forAdmin = async (req, res, next) => {
    const {authorization} = req.headers
    console.log(authorization)
}

module.exports = { forAdmin }