// ===== Initializing The Requirements ====== //
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Mngmodel = require("../models/schoolMng");
const StudentReg = require('../models/studentReg')
const StaffReg = require('../models/staffForm')
const validator = require('validator')

// ==== Handling Errors ==== //

// ===== Timing ===== //
const maxAge = 3*24*60*60

// ===== Creating A JWT Token ====== //
const createdToken = (id) => {
    return jwt.sign({id}, process.env.JWT_TOKEN, {expiresIn: '3d'})
}


// ======== ADMIN HOME GET ========= //
const adminHome = async (req, res) => {
    const user = req.user
    try {
        if(!user){
            return res.status(401).json({errors: 'Access Denied'})
        }
        if(user){
            return res.status(201).json({user})
        }
    } catch (err) {
        res.status(401).json({errors: 'Something Went Wrong'})
    }
}

// ====== Middleware to Register Admin ===== //
const regAdmin = async (req, res) => {
    const { name, email, mobile, password } = req.body

    try {

        // ======= Checking if The name field Is empty ======== //
        if(!name || !email || !mobile || !password){
            return (res.status(401).json({errors: 'All field are Required'}))
        }

        // ======= Checking if The Email Is A Valid Email ======== //
        if(!validator.isEmail(email)){
            return (res.status(401).json({errors: 'This is not a valid Email'}))
        }

        // ======= Checking For Email From The Data Base ======== //
        const checkAdmin = await Mngmodel.findOne({ email: email })
        if(checkAdmin) {
            return (res.status(401).json({errors: 'This Email Already Exists'}))
        }

        // ====== Checking If Number Already Exists
        const checkNum = await Mngmodel.findOne({ mobile: mobile })
        if (checkNum) {
            return (res.status(401).json({errors: 'This Phone Number As Already Been Used'}))
        }

        // ====== checking if the password is strong enough ======= //
        if (!validator.isStrongPassword(password)){
            return (res.status(401).json({errors: 'Your Password Must Include atleast a uppercase, a lowercase a number, a special character and must be at least 8 characters long'}))
        }

        // ==== Creating New Admin ==== //
        const newAdmin = await Mngmodel.create({ name, email, mobile, password })
        res.status(201).json({admin: newAdmin})
    } catch (err) {
        console.log(err)
        res.status(401).json({ errors: 'Unable To Create An Admin Account If This Error Persists, Kindly Reach Our Support Team' })
    }
}

// ======= MiddleWare To Login Admin ====== //
const logInAdmin = async (req, res) => {
    const { email, password } = req.body
    
    try{
        if(!email || !password){
            return res.status(403).json({errors: 'All Fields are Required'})
        }
        const finder = await Mngmodel.findOne({email})

        if(finder){
            
            // ======= Comparing Password ======== //
            const comp = await bcrypt.compare(password, finder.password)
            if(comp){

                // ====== Creating JWT token ======== //
                const token = createdToken(finder._id)
                res.cookie('isAdmin', token, {maxAge: 1000*60*60*24*3, httpOnly:true})
                res.status(201).json({admin: finder._id})
            }else{
                res.status(404).json({errors: 'Invalid Credentials'})
            }
        }
        else{
            res.status(404).json({errors: 'Invalid Credentials'})
        }
    }
    catch(err){

        // ====== Sending The Catch Errors ===== //
        res.status(401).json({errors: "Something Went Wrong, If This Error persists, kindly reach out to us through our support team"})
    }

}

// ====== Getting All Admitted Students Data ====== //
const getStudents = async (req, res) => {
    try {
        const students = await StudentReg.find({})
        const admit = []

        // ====== Checking If Student is Admitted ======= //
        students.map((student, index)=>{
            if (student.admitted == true){
                admit.push(student)
            }
        })
        res.status(201).json({ students: admit })
    } catch (err) {
        res.status(401).json({ errors: err })
    }
}

// ====== Getting Not Admitted Students Data ====== //
const notAdmitted = async (req, res) => {
    try {
        const notAdmitted = []
        const notStudents = await StudentReg.find({})

        // ========= Checking If Student Is Not Admitted ======== //
        notStudents.map(notStudent => {
            if(notStudent.admitted == false){
                notAdmitted.push(notStudent)
            }
        })
        res.status(201).json({ students: notAdmitted })

    } catch (err) {
        res.status(401).json({ errors: 'Something Went Wrong' })
    }
}

// ====== Getting All Employed staffs Data ====== //
const getStaffs = async (req, res) => {
    try {
        const employed = []
        const staffs = await StaffReg.find({})

        // ====== Checking If Staff Is Employed ======= //
        staffs.map((staff, index)=>{
            if (staff.employed == true){
                employed.push(staff)
            }
        })
        res.status(201).json({ staffs: employed })
    } catch (err) {
        res.status(401).json({ errors: 'Something Went Wrong' })
    }
}

// ======== Getting Not Employed Staffs ======= //
const notEmployed = async (req, res) => {
    try {
        const notEmployed = []
        const notStaffs = await StaffReg.find({})

        // ========== Checking If Staff Is Not Employed ========== //
        notStaffs.map(notStaff =>{
            if(notStaff.employed == false){
                notEmployed.push(notStaff)
            }
        })
        res.status(201).json({ staffs: notEmployed })
    } catch (err) {
        res.status(401).json({ errors: 'Something Went Wrong' })
    }
}

// ======== Searching For One Student ======== //
const oneStudent = async (req, res) => {
    const {id} = req.params
    try {
        const result = await StudentReg.findById(id)
        res.status(201).json({ result })

    } catch (err) {
        res.status(401).json({errors: 'Something Went Wrong'})
    }

}

const oneStaff = async (req, res) => {
    const {id} = req.params
    try {
        const result = await StaffReg.findById(id)
        res.status(201).json({ result })

    } catch (err) {
        res.status(401).json({errors: 'something went wrong'})
    }
}

const deleteStudent = async (req, res) => {
    const {id} = req.params
    try {
        const finder = await StudentReg.findByIdAndDelete(id)
        res.status(201).json({ msg: 'student account deleted succesfully' })
    } catch (err) {
        res.status(401).json({ errors: 'Something Went Wrong, If this error persists, Kindly reach out to our support team' })
    }
}

const studentUpdate = async (req, res) => {
    const { id } = req.params
    const myBody = req.body
    try {
        const finder = await StudentReg.findByIdAndUpdate(id, myBody)
        res.status(201).json({ msg: 'SUCCESS'})
        
    } catch (err) {
        res.status(401).json({ errors: 'Something went wrong, if this eror persists, kindly reach out to our support team' })
    }
}

const staffUpdate = async (req, res) => {
    const {id} = req.params
    const myBody = req.body
    try {
        const finder = await StaffReg.findByIdAndUpdate(id, myBody)
        res.status(201).json({ msg: 'Success' })
    } catch (err) {
        res.status(401).json({ errors: 'Something went wrong, if this eror persists, kindly reach out to our support team' })
    }
}

const staffDelete = async (req, res) => {
    const {id} = req.params
    try {
        const finder = await StaffReg.findByIdAndDelete(id)
        res.status(201).json({ msg: 'Staff Account Deleted Successfully' })
    } catch (err) {
        res.status(401).json({ errors: 'Something went wrong, if this eror persists, kindly reach out to our support team' })
    }
}

const adminLogout = (req, res) => {
    try{
        res.cookie('isAdmin', '', { maxAge: 1 })
    }catch(err){
        console.log('error')
    }
}


module.exports = { adminLogout, adminHome, regAdmin, logInAdmin, getStudents, getStaffs, oneStudent, oneStaff, notAdmitted, notEmployed, deleteStudent, studentUpdate, staffUpdate, staffDelete }
