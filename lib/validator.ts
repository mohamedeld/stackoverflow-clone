
import z from "zod";

export const addQuestionSchema = z.object({
  title:z.string().min(3,{message:"max title should be at least 3 characters"}),
  explanation:z.string().min(100),
  tags:z.array(z.string().min(1).max(15)).min(1).max(3)
})


export type AddQuestionType = z.infer<typeof addQuestionSchema> & {
  author:string;
  path:string;
}