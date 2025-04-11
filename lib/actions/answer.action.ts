'use server';

import { CreateAnswerParams, GetAnswersParams } from "@/types";
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