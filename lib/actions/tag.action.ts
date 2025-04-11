'use server';

import { GetAllTagsParams, GetTopInteractedTagsParams } from "@/types";
import { connnectToDB } from "../database";
import User from "@/models/user.model";
import Tag from "@/models/tag.model";

export async function getTopInteractedTags(params:GetTopInteractedTagsParams){
    try{
        await connnectToDB();

        const {userId,limit = 3} = params;
        const user = await User.findById(userId);
        if(!user){
            throw new Error("user not found")
        }

        // future interaction

        return {
            success:true,
            tags:[{
                _id:'tag1',
                name:'tag1'
            }, {
                _id:'tag2',
                name:'tag2'
            },{
                _id:'tag3',
                name:'tag3'
            }]
        }
    }catch(error){
        return {
            success:false,
            message: error instanceof Error ? error?.message : "Something went wrong"
          }
    }
}


export async function getAllTags(params:GetAllTagsParams){
    try{
        await connnectToDB();

        const {page=1,limit = 10,filter,searchQuery} = params;
        const tags = await Tag.find();
        // future interaction

        return {
            success:true,
            tags
        }
    }catch(error){
        return {
            success:false,
            message: error instanceof Error ? error?.message : "Something went wrong"
          }
    }
}