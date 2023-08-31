// ======= Calling The Needed Requirements ======== //
const bcrypt = require('bcrypt')
const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var stAccSchema = new mongoose.Schema({
    studentId:{
        type:String,
        required:[true, 'Name is Required'],
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:[true, 'This Email is Already Used by Another Student'],
    },
    role:{
        type:String,
        default: 'student'
    },
    password:{
        type:String,
        required:[true, 'Password Field is Required'],
    },
}, { timestamps: true });


// ======= Hashing Student Password ======= //
stAccSchema.pre('save', async function(next){

    // ======= Generating Salt ======== //
    const salt = await bcrypt.genSalt(10)

    // ======== Now Hashing The Password ======== //
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

// ======= Student Login Function ======== //
stAccSchema.statics.LogIn = async (studentId, password) => {

    try {
        // ======= Checking If The Student Account Exists ======= //
        const exists = await StudentAcc.findOne({ studentId })
        if(exists){

            // ====== Comparing Hashed Password ====== //
            const test = await bcrypt.compare(password, exists.password)
            if(test) {
                return exixts;
            } else {
                throw Error('Invalid Credentials')
            }
        } else {
            throw Error('Invalid Credentials')
        }
    }
    catch (err) {

    }
}

//Export the model
const StudentAcc = mongoose.model('StudentAccount', stAccSchema);

module.exports = StudentAcc

