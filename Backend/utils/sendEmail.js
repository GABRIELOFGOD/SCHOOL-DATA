const jwt = require('jsonwebtoken')
const validator = require('validator')
const Mngmodel = require('../models/schoolMng')

const createdToken = (id) => {
    return jwt.sign({id}, process.env.JWT_TOKEN, {expiresIn: '5m'})
}

const adminForgotPassword = async (req, res) => {
   try{
    const {email} = req.body
    if(!email){
        return(res.status(401).json({errors: 'Input an Email to receive your reset link'}))
    }

    // if(!validator.isEmail(email)){
    //     return(res.status(401).json({errors: 'This is Mot a valid email, kindly enter a valid one'}))
    // }

    // ======== LET'S CHECK IF THE EMAIL EXISTS IN OUR DATABASE =========== //
    const isExist = await Mngmodel.findOne({email})
    if(!isExist){
        return(res.status(401).json({errors: 'No accout is bound with email'}))
    }

    const token = createdToken(isExist._id)

    const link = `http://localhost:5173/forgot-password/${isExist._id}/${token}`
    
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aletechglobal@gmail.com',
        pass: ''
    }
    });

    var mailOptions = {
    from: 'aletechglobal@gmail.com',
    to: email,
    subject: 'Password Reset Link',
    text: link
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});

    res.status(201).json({msg: `A reset link has been sent to ${email}` })
   }catch(err){
    res.status(401).json({errors: 'Something went wrong, if this error persists, kindly reach out to us through our support team'})
   }
}

module.exports = { adminForgotPassword }