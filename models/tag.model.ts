import {Schema,models,model,Document} from "mongoose"


export interface ITag extends Document{
  name:string;
  description:string;
  questions:Schema.Types.ObjectId[];
  followers:Schema.Types.ObjectId[];
  createdOn:Date;
}

const tagSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }], // Reference to questions
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }], // Users following the tag
  createdOn: { type: Date, default: Date.now },
},{timestamps:true});

const Tag = models?.Tag || model("Tag",tagSchema);

export default Tag;

