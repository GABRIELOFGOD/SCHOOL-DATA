const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var stRegSchema = new mongoose.Schema({
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
        unique: true,
        required: true
    },
    dob:{
        type:String,
        required: true,
    },
    stuClass:{
        type:String,
        required: true,
    },
    studentId:{
        type:String,
        required: true,
        unique:true,
    },
    mobile:{
        type:Number,
        unique: true,
    },
    address:{
        type:String,
        required: true,
    },
    admitted:{
        type:Boolean,
        default: false
    },
    parent:{
        type:String,
        required: true,
    },
    parentOcc:{
        type:String,
        required: true,
    },
    parentPhone:{
        type:Number,
        required: true,
    },
}, { timestamps: true } );

//Export the model
const StudentReg = mongoose.model('StudentReg', stRegSchema);

module.exports = StudentReg
