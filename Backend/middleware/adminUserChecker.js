const jwt = require('jsonwebtoken')
const Mngmodel = require('../models/schoolMng')


const currentAdmin = async (req, res, next) => {
    try {
        const {id} = req.user
        const {role, name, email} = await Mngmodel.findById(id)
        if(!role === 'admin'){
            return (res.status(401).json({ errors: 'sorry, you are not allowed to perform this Operation' }))
        }
        req.user = {role, name, email}
        next()
    } catch (error) {
        res.status(401).json({errors: 'something went wrong, please try again later'})
    }
}

const naAdmin = async (req, res, next) => {
    try{
        const {id} = req.admin
        const {role, name, email} = await Mngmodel.findById(id)
        if(role !== 'admin'){
            return(res.status(401).json({errors: 'Access Denied'}))
        }
        req.admin = {role, name, email}
        next()
    }
    catch(err){
        res.status(401).json({errors: 'something went wrong, try again later'})
    }
}


module.exports = {currentAdmin, naAdmin}