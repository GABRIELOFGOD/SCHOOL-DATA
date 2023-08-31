// ====== Calling Requirements ====== //
const bcrypt = require('bcrypt')
const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var staffAccSchema = new mongoose.Schema({
    staffId:{
        type:String,
        required:[true, 'Staff ID is Required'],
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:[true, 'This Email is Already Used by Another Staff'],
    },
    role:{
        type:String,
        default: 'staff'
    },
    password:{
        type:String,
        required:[true, 'Password Field is Required'],
    },
}, { timestamps: true });

// ======= Hashing Password Before sending it to The Data Base ====== //
staffAccSchema.pre('save', async function(next){
    try {
        
        // ========= Generating Salt =========== //
        const salt = await bcrypt.genSalt(10)
        
        // ====== Now Hashing The Password ====== //
        this.password = await bcrypt.hash(this.password, salt)
        next();
    } catch (err) {
        console.log(err)
    }
})

// ===== Initializing Login And Comparing Password ===== //
staffAccSchema.statics.LogIn = async (staffId, password) => {
    const staff = await this.findOne({staffId})

    // ====== Checking If Staff Information is valid ====== //
    if (staff){

        // ========= Comparing Password ========= //
        const check = await bcrypt.compare(password, staff.password)
        if (check) {
            return staff;
        } else{
            throw Error('Invalid Information')
        }
    } else {
        throw Error('Invalid Information')
    }

}



//Export the model
const StaffAcc = mongoose.model('Staff-Account', staffAccSchema);

module.exports = StaffAcc

