const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        //mongodb connection string
        const con = await mongoose.connect(process.env.MONGO_URl, {
            //these properties will stop unwanted warning in the console.
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`Mongodb connected:${con.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);  //exit 1 which means true
    }
}
module.exports = connectDB
