// ======= Calling the Requirements ======== //
const StudentReg = require('../models/studentReg')
const StudentAcc = require('../models/studentAcc')
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

    if (err.code === 11000) {
        errors.mobile = "This Mobile Number Is Already Been Used by Another Student"
    }
}

// ======= Students Registration Controller ======= //
const regStudent = async (req, res) => {
    let { fname, lname, email, dob, stuClass, studentId, mobile, address, parent, parentOcc, parentPhone } = req.body
    const students = await StudentReg.find({})
    const forId = students.length + 1
    
    // ===== Checking if The Required Fields Are Properly filled ====== //
    if( !fname || !lname || !email || !dob || !stuClass || !mobile || !address || !parent || !parentOcc || !parentPhone){
        return (res.status(401).json({errors: 'All the Required Fields must be appropriately filled'}))
    }

    if(!validator.isEmail(email)){
        return (res.status(401).json({errors: 'This is Not a Valid Email'}))
    }

    // ====== Generating Student ID ======= //
    studentId = `ST_${Date.now()}_GB_${forId}_SDP`
    try {

        // ===== Check If Student Already Register ====== //
        const isExist = await StudentReg.findOne({ email })
        if (isExist) {
            return (res.status(401).json({ errors: 'This student is Already Registered' }))
        }

        const isNum = await StudentReg.findOne({ mobile })
        if (isNum) {
            return (res.status(401).json({ errors: 'This student is Already Registered' }))
        }
            
        // ====== Now Register The Student ====== //
        const newStudent = await StudentReg.create({ fname, lname, email, dob, stuClass, studentId, mobile, address, parent, parentOcc, parentPhone })
        res.status(201).json({student: newStudent._id})

    } catch (err) {
        res.status(401).json({errors: 'Something Went Wrong, If This Error Persists, Kindly Reach out to Our Support Team'})
        console.log(err)
    }

}

// ======== Creating Student Portfolio ========= //
const stuCreate = async (req, res) => {
    const { studentId, email, password } = req.body
    try {

        // ======== Checking If All Inputs is Filled ========= //
        if(!studentId || !email || !password){
            return (res.status(401).json({errors: 'All Fields Are required'}))
        }

        if(!validator.isEmail(email)){
            return (res.status(401).json({errors: 'Enter a Valid Email'}))
        }

        if(!validator.isStrongPassword(password)){
            return (res.status(401).json({errors: 'Your Password Must Include atleast a uppercase, a lowercase a number, a special character and must be at least 8 characters long'}))
        }

        // ======= Checking If It's an Admitted Student ======== //
        const isStudent = await StudentReg.findOne({ studentId })
        if(isStudent && isStudent.admitted == true) {

            // ===== Find If Student Already Created a Portfolio Already ====== //
            const isExist = await StudentAcc.findOne({ studentId })
            if (isExist) {
                res.status(401).json({ errors: 'This student already Have a Portfolio' })
            } else {

                // ======= Student Confirmed, Now Creating A Student Portfolio ======= //
                const newAcc = await StudentAcc.create({ studentId, email, password })
                res.status(201).json({ student: newAcc._id })
            }

        } else {
            res.status(401).json({errors: 'You are Not A Registered Student'})
        }
    } catch (err) {
        console.log(err)
        res.status(401).json({ errors: 'Somethings When Wrong' })
    }
}











// ====== Exporting Controllers ====== //
module.exports = { regStudent, stuCreate }

