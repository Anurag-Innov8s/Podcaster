const mongoose = require('mongoose');

exports.connectDatabase = async() =>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI,{
            dbName:"Podcaster",
            writeConcern:{w:'majority'}
        })
        console.log(`Database Connected: ${connection.connection.host}`);
    }
    catch(error){
        console.log(error)
    }
}