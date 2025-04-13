'use server';

import { AnswerVoteParams, CreateAnswerParams, GetAnswersParams } from "@/types";
import { connnectToDB } from "../database";
import Answer from "@/models/answer.model";
import { revalidatePath } from "next/cache";
import Question from "@/models/question.model";

export async function createAnswer(params:CreateAnswerParams){
  try{
    await connnectToDB();
    const {content,author,question,path} = params;
    const answer = await Answer.create({
        content,
        author,
        question
    })
    await Question.findByIdAndUpdate(question,{
        $push:{
            answers:answer?._id
        }
    },{new:true})
    revalidatePath(path);
    return {
        success:true,
        answer
    }
}catch(error){
    return {
      success:false,
      message: error instanceof Error ? error?.message : "Something went wrong"
    }
  }
}

export async function getAnswers(params:GetAnswersParams){
    try{
      await connnectToDB();
      const {questionId} = params;
      const answers = await Answer.find({
          question:questionId
      }).populate("author","_id username name picture").sort({createdAt:-1 })
      
      return {
          success:true,
          answers
      }
  }catch(error){
      return {
        success:false,
        message: error instanceof Error ? error?.message : "Something went wrong"
      }
    }
  }

export async function upvoteAnswer(params:AnswerVoteParams){
  try{
    await connnectToDB();
    const {answerId,userId,hasdownVoted,hasupVoted,path} = params;

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
    const answer = await Answer.findByIdAndUpdate(answerId,updateQuery,{new:true})
    if(!answer){
      return {
        success:false,
        message:"Answer not found"
      }
    }
    // increment author's reputation
    revalidatePath(path); 
    return {
      success:true,
      answer,
      message:"Answer Upvoted successfully"
    }
  }catch(error){
    return {
      success:false,
      message: error instanceof Error ? error?.message : "Something went wrong"
    }
  }
}