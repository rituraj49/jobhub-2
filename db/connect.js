import mongoose from "mongoose";

const connectDb = (url) => {
    try {
        console.log('database connected');
        return mongoose.connect(url);
    } catch (error) {
        console.log(error);
    }
}

export default connectDb;