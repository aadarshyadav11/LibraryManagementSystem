const mongoose = require('mongoose')

// 1st method
function connectToDatabase(){
    const DB_URL = process.env.MONGO_URI;
    mongoose.connect(DB_URL, {
        // useNewUrlParser : true,
        // useUnifiedTopology : true

        /**      
        * Note : useNewUrlParser : true      
        *        useUnifiedTopology : true      deprecated they do not support      
        */
    })

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "Connetion Error"))
    db.once("open", function(){
        console.log("DB Connected...")
    })
}


// 2nd method
// const connectToDatabase = () => {
//     const DB_URL = process.env.MONGO_URI;

//     mongoose.connect(DB_URL)
//     .then(() => console.log("Connected to MongoDB successfully"))
//     .catch(err => console.error("Connection Error : ", err))
// }

// according to 1st method
module.exports = connectToDatabase;

// according to 2nd method
// module.exports = connectToDatabase;