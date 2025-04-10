'use server';

import Question from "@/models/question.model";
import { connnectToDB } from "../database";
import { AddQuestionType } from "../validator";
import Tag from "@/models/tag.model";
import { GetQuestionsParams } from "@/types";


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