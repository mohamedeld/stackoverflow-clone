'use server';

import Question from "@/models/question.model";
import { connnectToDB } from "../database";
import { AddQuestionType } from "../validator";
import Tag from "@/models/tag.model";
import { GetQuestionByIdParams, GetQuestionsParams, QuestionVoteParams } from "@/types";
import { revalidatePath } from "next/cache";


export const createQuestion =async(data:AddQuestionType)=>{
  try{
    await connnectToDB();
    const question = await Question.create({
      title:data?.title,
      explanation:data?.explanation,
      author:data?.author
    })
    const tagDocuments = [];
    for(const tag of data?.tags){
      const existingTag = await Tag.findOneAndUpdate({
        name:{$regex: new RegExp(`^${tag}$`,"i")}
      },{
        $setOnInsert:{name:tag},$push:{
          question:question?._id
        }
      },{upsert:true,new:true})
      tagDocuments.push(existingTag?._id);
    }
    await Question.findByIdAndUpdate(question?._id,{
      $push:{tags:{$each:tagDocuments}}
    })
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


export async function getAllQuestions(params:GetQuestionsParams){
  try{
    await connnectToDB();
    const questions = await Question.find({}).populate({path:'tags',model:'Tag'}).populate({path:'author',model:'User'});
    return {
      success:true,
      questions
    }
  }catch(error){
    return {
      success:false,
      message: error instanceof Error ? error?.message : "Something went wrong"
    }
  }
}


export async function getQuestion(params:GetQuestionByIdParams){
  try{
    await connnectToDB();
    const {questionId} = params;
    const question = await Question.findById(questionId).populate({path:'tags',model:'Tag',select:'_id name'}).populate({path:'author',model:'User',select:'_id username name picture'});
    return {
      success:true,
      question
    }
  }catch(error){
    return {
      success:false,
      message: error instanceof Error ? error?.message : "Something went wrong"
    }
  }
}
export async function upvoteQuestion(params:QuestionVoteParams){
  try{
    await connnectToDB();
    const {questionId,userId,hasdownVoted,hasupVoted,path} = params;

    let updateQuery = {};
    if(hasupVoted){
      updateQuery = { $pull : {upvotes:userId}}
    }else if(hasdownVoted){
      updateQuery = {$pull : {downvotes:userId},
      $push: {upvotes:userId}
    }
    }else{
      updateQuery = {$addToSet: {upvotes:userId}}
    }
    const question = await Question.findByIdAndUpdate(questionId,updateQuery,{new:true})
    if(!question){
      return {
        success:false,
        message:"Question not found"
      }
    }
    // increment author's reputation
    revalidatePath(path); 
    return {
      success:true,
      question,
      message:"Upvoted successfully"
    }
  }catch(error){
    return {
      success:false,
      message: error instanceof Error ? error?.message : "Something went wrong"
    }
  }
}
export async function downvoteQuestion(params:QuestionVoteParams){
  try{
    await connnectToDB();
    const {questionId,userId,hasdownVoted,hasupVoted,path} = params;

    let updateQuery = {};
    if(hasdownVoted){
      updateQuery = { $pull : {downvotes:userId}}
    }else if(hasupVoted){
      updateQuery = {$pull : {upvotes:userId},
      $push: {downvotes:userId}
    }
    }else{
      updateQuery = {$addToSet: {downvotes:userId}}
    }
    const question = await Question.findByIdAndUpdate(questionId,updateQuery,{new:true})
    if(!question){
      return {
        success:false,
        message:"Question not found"
      }
    }
    // increment author's reputation
    revalidatePath(path); 
    return {
      success:true,
      question
    }
  }catch(error){
    return {
      success:false,
      message: error instanceof Error ? error?.message : "Something went wrong"
    }
  }
}