import { auth } from "@/auth";
import QuestionForm from "@/components/forms/QuestionForm"
import { getOneUser } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";

const AskQuestionPage = async () => {
  const session = await auth();
  if(!session){
    redirect("/")
  }
  const res = await getOneUser(userId);
  // if(!res?.success){
  //   redirect("/")
  // }
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <QuestionForm type="add" clerkId={JSON.stringify(res?.user?._id)}/>
      </div>
    </div>
  )
}

export default AskQuestionPage