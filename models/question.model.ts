import {Schema,models,model,Document} from "mongoose"


export interface IQuestion extends Document{
  title:string;
  explanation:string;
  tags:Schema.Types.ObjectId[];
  views:number;
  upvoted:Schema.Types.ObjectId[];
  downvoted:Schema.Types.ObjectId[];
  author:Schema.Types.ObjectId;
  answers:Schema.Types.ObjectId[];
  createdAt:Date;
}

const questionSchema = new Schema({
  title:{
    type:String,
    required:[true,"title is required"]
  },
  explanation:{
    type:String,
    required:[true,"explanation is required"]
  },
  tags:[{
    type:Schema.Types.ObjectId,
    ref:'Tag'
  }],
  views:{
    type:Number,
    default:0
  },
  upvotes:[{
    type:Schema.Types.ObjectId,
    ref:'User'
  }],
  downvotes:[{
    type:Schema.Types.ObjectId,
    ref:'User'
  }],
  author:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  answers:[{
    type:Schema.Types.ObjectId,
    ref:'Answer'
  }],
  createdAt:{
    type:Date,
    default:Date.now
  } 
});

const Question = models?.Question || model("Question",questionSchema);

export default Question;

