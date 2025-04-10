import { auth } from "@/auth";
import QuestionForm from "@/components/forms/QuestionForm"
import { redirect } from "next/navigation";

const AskQuestionPage = async () => {
  const session = await auth();
  if(!session){
    redirect("/")
  }
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <QuestionForm type="add" clerkId={JSON.stringify(session?.user?._id)}/>
      </div>
    </div>
  )
}

export default AskQuestionPage