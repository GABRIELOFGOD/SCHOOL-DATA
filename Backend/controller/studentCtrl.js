// ======= Calling the Requirements ======== //
const StudentReg = require('../models/studentReg')
const StudentAcc = require('../models/studentAcc')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// ======== Handling Errors ======== //
// const handleErrors = err => {
//     console.log(err.message, err.code)
//     let errors = {
//         fname: '',
//         lname: '',
//         email: '',
//         dob: '',
//         stuClass: '',
//         studentId: '',
//         mobile: '',
//         address: '',
//         parent: '',
//         parentOcc: '',
//         parentPhone: '',
//         password: ''
//     }

//     if (err.code === 11000) {
//         errors.mobile = "This Mobile Number Is Already Been Used by Another Student"
//     }
// }

const createdToken = (id) => {
    return jwt.sign({id}, process.env.JWT_STUDENT, {expiresIn: '3d'})
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
            res.status(401).json({errors: 'You are Not A Student, probably you\'re not admitted or your admission has been councilled'})
        }
    } catch (err) {
        console.log(err)
        res.status(401).json({ errors: 'Somethings When Wrong' })
    }
}

// ======= CREATING STUDENT LOGIN CONTROLLER ====== //
const studentLogin = async (req, res) => {
    const {studentId, password} = req.body

    // ======= CONFIRMING INPUTS ======== //
    if(!studentId, !password){
        return res.status(401).json({errors: 'All Fields Are required'})
    }

    const stillStaff = await StudentReg.findOne({studentId})
    if(!stillStaff){
        return res.status(401).json({errors: 'Sorry, You are not a student'})
    }

    if(stillStaff.admitted != true){
        return (res.status(401).json({errors: 'Sorry, You are not a student'}))
    }

    // ========= CHECKING IF STUDENTS EXISTS ========= //
    const finder = await StudentAcc.findOne({studentId})
    if(finder){

        // ========== COMPARING PASSWORD ========= //
        const comp = await bcrypt.compare(password, finder.password)
        if(comp){

            // ======== CREATING AND SENDING TOKEN ======== //
            const token = createdToken(finder._id)
            res.cookie('schToken', token, { httpOnly: true, maxAge: 1000*60*60*24*3 })
            res.status(201).json({student: finder._id})
        }else{
            res.status(401).json({errors: 'Invalid Credentials'})
        }
    }else{
        res.status(401).json({errors: 'Invalid Credentials'})

    }
}









// ====== Exporting Controllers ====== //
module.exports = { regStudent, stuCreate, studentLogin }

