
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

export const loginSchema = z.object({
    username:z.string({message:"username is required"}),
    email:z.string({message:"email is required"}).email({message:"email is required"}),
    password:z.string({message:"password is required"}).min(3,{message:"password should be at least 6 characters"})
  })

  export const answerSchema = z.object({
    answer:z.string({message:"Answer is required"}).min(100,{message:"Answer should be at least 100 characters"})
  })