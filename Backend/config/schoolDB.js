const mongoose = require('mongoose');

const dbConnect = async () =>{
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log(`DataBase Connected Successfully`))
    .catch(err => console.log(`DataBase connection Failed ${err}`))
}

module.exports = dbConnect;
