const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://developersudhanshush:6is3VHfzIG1nw2jD@namastenode.jzksi.mongodb.net/Hackathon")
}

module.exports = connectDB;
