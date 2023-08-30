// ====== Calling All Requirements ====== //
const StaffReg = require('../models/staffForm')
const StaffAcc = require('../models/staffAcc')
const jwt = require('jsonwebtoken')
const validator = require('validator')

// ======== Handling Errors ======== //
const handleErrors = err => {
    console.log(err.message, err.code)
    let errors = {
        fname: '',
        lname: '',
        email: '',
        dob: '',
        stuClass: '',
        studentId: '',
        mobile: '',
        address: '',
        parent: '',
        parentOcc: '',
        parentPhone: '',
        password: ''
    }

}

// ====== Reusable Constant ======= //
const maxAge = 5*24*60*60

// ====== Creating JWT Token ====== //
const createdToken = id => {
    jwt.sign({id}, process.env.JWT_TOKEN, { expiresIn: maxAge })
}


// ======= Staff Data Registration Controller ======= //
const regStaff = async (req, res) => {
    let { fname, lname, email, dob, staffId, office, mobile, address } = req.body;
    const allStaff = await StaffReg.find({})

    // ====== creating Staff Id ======= //
    const forId = allStaff.length + 1
    staffId = `SDP_GB_${Date.now()}_${forId}_ST`    // Where SDP is School Data Project, GB is GABRIEL, ST is Staff

    // ======= Checking if The Required fields are Empty ======= //
    if(!fname || !lname || !email || !dob || !office || !mobile || !address){
        return (res.status(401).json({errors: 'All The Required Fields Must be Filled Appropriately'}))
    }

    if(!validator.isEmail(email)){
        return (res.status(401).json({errors: 'This is Not a Valid Email'}))
    }

    try{
        
        // ======== Checking If Staff Is Already Registered ======= //
        const isStaff = await StaffReg.findOne({ email })

        if(isStaff) {
            return (res.status(401).json({ errors: "This Staff Is Already Registered" }))
        }

        const isNum = await StaffReg.findOne({ mobile })

        if(isNum) {
            return (res.status(401).json({ errors: "This Staff Is Already Registered" }))
        }

            // ======== Registering New Staff ======== //
        const newStaff = await StaffReg.create({ fname, lname, email, dob, staffId, office, mobile, address })
        res.status(201).json({staff: newStaff._id})
    }
    catch (err) {
        console.log(err)
        res.status(401).json({errors: 'Something Went Wrong, If This Error Persists, Kindly Report To Our Support Team'})
    }

}


// ====== Creating Staff Personal ACoount ====== //
const createStaff = async (req, res) => {
    const { staffId, email, password } = req.body
    try {

        if(!staffId || !email || !password){
            return(res.status(401).json({ errors: 'All Input Fields Must Be Filled Appropriately' }))
        }

        if(!validator.isEmail(email)){
            return(res.status(401).json({ errors: 'This is not a Valid Email' }))
        }

        if(!validator.isStrongPassword(password)){
            return(res.status(401).json({ errors: 'Your Password Must Include atleast a uppercase, a lowercase a number, a special character and must be at least 8 characters long' }))
        }

        // ===== Checking If The Staff is Registered ===== //
        const isStaff = await StaffReg.findOne({ staffId })
        if (isStaff && isStaff.employed == true){
            
            // ====== Checking If Staff Already Create a Portfolio ====== //
            const isCreate = await StaffAcc.findOne({ email })
            if (isCreate) {
                res.status(401).json({ errors: "This Staff Already Creates Staff Portal" })
            } else {

                // ===== Creating Staff Portfolio ====== //
                const staffAcc = await StaffAcc.create({ staffId, email, password })
                res.status(201).json({staff: staffAcc._id})
            }

        } else {

            // ====== Registered Staff Not Verified ====== //
            res.json({ errors: 'Staff Membership Not Verified' })
        }

    } catch (err) {
        res.status(401).json({errors: 'something went wrong, if this error persists, kindly reach out to our support team'})
    }
}

// ====== Creating Staff Login Controller ======= //
const staffLogIn = async (req, res) => {
    const { staffId, password } = req.body
    try {
        const staff = await StaffAcc.Login(staffId, password)

        // ===== Generating Token and Sending it with Cookie ===== //
        const token = await createdToken(staff._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ staff: staff._id })
    } catch (err) {
        console.log(err)
        res.status(401).json(err)
    }
}




// ====== Exporting Controllers ======== //
module.exports = { regStaff, createStaff, staffLogIn }
