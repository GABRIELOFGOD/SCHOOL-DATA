const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var staffRegSchema = new mongoose.Schema({
    fname:{
        type:String,
        required: true,
    },
    lname:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        requred: true,
        unique: true,
    },
    dob:{
        type:String,
        required: true,
    },
    staffId:{
        type:String,
        required: true,
        unique:true,
    },
    office:{
        type:String,
        required: true,
    },
    mobile:{
        type:Number,
        unique: true,
    },
    address:{
        type:String,
        required: true,
    },
    employed:{
        type:Boolean,
        default: false
    },
}, { timestamps: true } );

//Export the model
const StaffReg = mongoose.model('Staff-Reg', staffRegSchema);

module.exports = StaffReg
