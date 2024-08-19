import mongoose from "mongoose"




const connection ={}


async function dbConnect(){
    if(connection.isConnected){
        console.log("Database already connectd")
        return
    }

    try {
      const db = await mongoose.connect(process.env.MONGO_URI || '' , {});
       connection.isConnected = db.connections[0].readyState;

       console.log('connected to MONGODB')
         
    } catch (error) {
        console.log("Database connectin failed" , error)

        process.exit()
    }
}

export default dbConnect;