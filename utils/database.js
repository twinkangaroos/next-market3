import mongoose from "mongoose"

const connectDB = async() => {
    try{
        await mongoose.connect("mongodb+srv://admin:Take-1234@cluster0.85pz6k3.mongodb.net/appDataBase?retryWrites=true&w=majority")
        console.log("Success: Connected to MongoDB.")
    }catch(err){
        console.log("Failure: Unconnected to MongoDB.")
        console.error(err);
        //throw new Error("Connection to MongoDB failed.")
        process.exit(1);
    }
}

export default connectDB