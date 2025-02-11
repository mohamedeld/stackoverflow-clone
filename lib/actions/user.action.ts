'use server';

import User from "@/models/user.model";
import { connnectToDB } from "../database";


export async function getOneUser(userId:string){
  try{
    await connnectToDB();
    if(!userId){
      return{
        success:false,
        error:"user is not found"
      }
    }
    const user = await User.findOne({clerkId:userId});
    if(!user){
      return{
        success:false,
        error:"user is not found"
      }
    }
    return {
      success:true,
      user
    }
  }catch(error){
    return {
      success:false,
      message: error instanceof Error ? error?.message : "Something went wrong"
    }
  }
}