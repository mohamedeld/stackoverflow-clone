'use server';

import { connnectToDB } from "../database";
import { AddQuestionType } from "../validator";


export const createQuestion =async(data:AddQuestionType)=>{
  try{
    await connnectToDB();
    return {
      success:true,
      message:'Question created successfully'
    }
  }catch(error){
    return {
      success:false,
      message: error instanceof Error ? error?.message : "Something went wrong"
    }
  }
}