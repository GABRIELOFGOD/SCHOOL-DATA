// ====== importing Requirements ======= //
const bcrypt = require('bcrypt')

const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var mngSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    role:{
        type:String,
        default: 'admin'
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
        minlength: 6
    },
    password:{
        type:String,
        required: true,
        minlength: 6
    },
}, { timestamps: true });


mngSchema.pre('save', async function(next){

    // ===== Hashing Password ===== //
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

// ======= Creating Login Function ========= //
mngSchema.statics.logIn = async function(email, password){
    let error = null

    // ======== checking if all Inputs Valids ======== //
    if (!email || !password){
        error = 'All Fields are Required'
        throw Error(error)
    }

    // ======== Checking If User Exists ======== //
    const finder = await Mngmodel.findOne({ email })
    if (finder){

        // ======= Unhashing Password ======== //
        const checkPass = await bcrypt.compare(password, finder.password)
        if(checkPass){
            return finder;
        } else {

            // ======= Incorrect Password ======= //
            error = 'Invalid Credentials'
            throw Error(error)
        }
    } else{

        // ======== Cant't Find User in The Data Base ========= //
        error = 'Invalid Credentials'
        throw Error(error)
    }
}



//Export the model
const Mngmodel = mongoose.model('Management', mngSchema);

module.exports = Mngmodel;