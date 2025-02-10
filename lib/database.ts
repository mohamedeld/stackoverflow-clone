import mongoose from "mongoose";

let isConnected:boolean = false;

export const connnectToDB = async ()=>{
  try{
    mongoose.set("strictQuery",true);
    if(!process.env.DB_URL){
      return console.log("missing db url");
    }
    if(isConnected){
      console.log("mongodb is already connected");
      return;
    }
    await mongoose.connect(process.env.DB_URL);
    isConnected = true;
    console.log("Mongo db is connected successfully");
  }catch(error){  
    console.log("error when connecting to db",error);
  }
}