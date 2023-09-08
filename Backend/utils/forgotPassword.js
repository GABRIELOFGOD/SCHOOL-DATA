const validator = require('validator')
const jwt = require('jsonwebtoken')
const Mngmodel = require('../models/schoolMng')
const bcrypt = require('bcrypt')

const adminForgot = async (req, res) => {
    try{
        const {id, token} = req.params

        const confirmLink = jwt.verify(token, process.env.JWT_TOKEN)
        if(!confirmLink){
            return (res.status(401).json({errors: 'Link is invalid or has expired, please try again later'}))
        }

        const userFinder = await Mngmodel.findById({_id: id})

        if(!userFinder){
            return (res.status(401).json({errors: 'Link is invalid or has expired, please try again later'}))
        }

        res.status(201).json({msg: 'enter a new password', email: userFinder.email, name: userFinder.name })

    }catch(err){
        return (res.status(401).json({errors: 'Link is invalid or has expired, please try again later'}))
    }

}

const getForgot = async (req, res) => {

}

const putAdminForgot = async (req, res) => {
    try{
        const {password} = req.body
        const {id, token} = req.params
        const verified = jwt.verify(token, process.env.JWT_TOKEN)
        if(verified){
            if(!password){
                return (res.status(401).json({errors: 'Type a new Password'}))
            }
    
            if(!validator.isStrongPassword(password)){
                return(res.status(401).json({errors: 'Your Password Must Include atleast a uppercase, a lowercase a number, a special character and must be at least 8 characters long'}))
            }
    
            // ========== ENCRYPTING PASSWORD ========== //
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
    
            const finder = await Mngmodel.findByIdAndUpdate(id, {
                $set: {
                    password: hashedPassword
                }
            })
            res.status(201).json({msg: 'Password reset successfully, go back to login your account now'})
        }else{
            res.status(401).json({errors: 'Link is invalid or has expired, please try again later'})
        }
    }catch(err){
        res.status(401).json({errors: 'Something Went Wrong'})
    }

}




module.exports = { putAdminForgot, adminForgot }
