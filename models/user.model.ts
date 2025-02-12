import {Schema,models,model,Document} from "mongoose"


export interface IUser extends Document{
  clerkId:string;
  name:string;
  username:string;
  email:string;
  password?:string;
  bio?:string;
  picture:string;
  location?:string;
  portfolioWebsite?:string;
  reputation?:number;
  saved:Schema.Types.ObjectId[]
  joinedAt:Date;
}

const userSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for OAuth users
  bio: { type: String, default: "" },
  picture: { type: String, required: true },
  location: { type: String },
  portfolioWebsite: { type: String },
  reputation: { type: Number, default: 0 },
  saved: [{ type: Schema.Types.ObjectId, ref: "Question" }], // Replace 'SomeModel' with the referenced model
  joinedAt: { type: Date, default: Date.now },  
},{timestamps:true});

const User = models?.User || model("User",userSchema);

export default User;

