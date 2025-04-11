import {Schema,models,model,Document} from "mongoose"


export interface IAnswer extends Document{
  author:Schema.Types.ObjectId;
  question:Schema.Types.ObjectId;
  content:string;
  upvotes:Schema.Types.ObjectId[];
  downvotes:Schema.Types.ObjectId[];
  createdAt:Date;
}

const answerSchema = new Schema({
    author:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    question:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Question'
    },
    content:{
        type:String,
        required:true
    },
    upvotes:[{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }],
    downvotes:[
        {
            type:Schema.Types.ObjectId,
            required:true,
            ref:'User'
        }
    ],
  createdAt: { type: Date, default: Date.now },
},{timestamps:true});

const Answer = models?.Answer || model("Answer",answerSchema);

export default Answer;

