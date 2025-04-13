'use server';

import User from "@/models/user.model";
import { connnectToDB } from "../database";
import { CreateUserParams, DeleteUserParams, GetAllUsersParams, ToggleSaveQuestionParams, UpdateUserParams } from "@/types";
import { revalidatePath } from "next/cache";
import Question from "@/models/question.model";


export async function getOneUser(userId:string){
  try{
    await connnectToDB();
    if(!userId){
      return{
        success:false,
        error:"user is not found"
      }
    }
    const user = await User.findById(userId);
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


export async function createUser(data:CreateUserParams){
  try{
    await connnectToDB();
  
    const user = await User.findOne({email:data?.email});
    if(user){
      return{
        success:false,
        error:"email of this user is already exist"
      }
    }
    const newUser = await User.create(data);
    return {
      success:true,
      newUser
    }
  }catch(error){
    return {
      success:false,
      message: error instanceof Error ? error?.message : "Something went wrong"
    }
  }
}
export async function updateUser(data:UpdateUserParams){
  try{
    await connnectToDB();
  
    const user = await User.findById(data?.clerkId);
    if(!user){
      return{
        success:false,
        error:"user is not found"
      }
    }
    const updatedUser = await User.findByIdAndUpdate(data?.clerkId,data?.updateData,{new:true});
    revalidatePath(data?.path);
    return {
      success:true,
      updatedUser
    }
  }catch(error){
    return {
      success:false,
      message: error instanceof Error ? error?.message : "Something went wrong"
    }
  }
}
export async function deleteUser(data:DeleteUserParams){
  try{
    await connnectToDB();
  
    const user = await User.findById(data?.clerkId);
    if(!user){
      return{
        success:false,
        error:"user is not found"
      }
    }
    const deletedUser = await User.findByIdAndDelete(data?.clerkId);
    const userQuestionsIds = await Question.find({
      author:deletedUser?._id
    }).distinct('_id');
    await Question.deleteMany({author:deletedUser?._id});
    console.log(userQuestionsIds)
    // delete answers
    return {
      success:true,
      deletedUser
    }
  }catch(error){
    return {
      success:false,
      message: error instanceof Error ? error?.message : "Something went wrong"
    }
  }
}

export const getAllUsers = async (params?:GetAllUsersParams)=>{
    try{
        const {page = 1,pageSize=10,filter,searchQuery} = params;
        const users = await User.find({}).sort({createdAt:-1});
        console.log("users ",users)
        return {
            success:true,
            users
        }
    }catch(error){
    return {
      success:false,
      message: error instanceof Error ? error?.message : "Something went wrong"
    }
  }
}

export async function toggleSaveQuestion(params:ToggleSaveQuestionParams){
    try{
      await connnectToDB();
      const {userId,questionId,path} = params;
      const user = await User.findById(userId);
      if(!user){
        return {
            success:false,
            message:"user not found"
        }
      }
      const isQuestionSaved = user?.saved?.some((id:string)=> id?.toString() === questionId?.toString());
      if(isQuestionSaved){
          await User.findByIdAndUpdate(userId,{
            $pull:{saved:questionId}
        },{new:true})
      }else{
        await User.findByIdAndUpdate(userId,{
            $addToSet:{saved:questionId?.toString()}
        },{new:true})
    }
      revalidatePath(path);
    }catch(error){
        return {
          success:false,
          message: error instanceof Error ? error?.message : "Something went wrong"
        }
      }
    }