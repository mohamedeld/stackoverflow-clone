import { auth } from "@/auth";
import AllAnswers from "@/components/answers/AllAnswers";
import AnswerForm from "@/components/forms/AnswerForm";
import ParseHTML from "@/components/ParseHTML";
import Metric from "@/components/shared/Metric";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/Votes";
import { getQuestion } from "@/lib/actions/question.action";
import { formatNumber, getTimestamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface IProps{
    params:Promise<{
        id:string;
    }>
}
const QuestionDetailPage = async ({params}:IProps) => {
    const session = await auth();
    const {id} = await params;
    const res = await getQuestion({questionId:id})
    if(!res?.question){
        redirect("/questions");
    }
  return (
    <>
        <div className="flex-start w-full flex-col">
            <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <div className="flex items-center justify-start gap-1">
                <Link href={`/profile/${res?.question?.author?._id}`}>
                    <Image
                        src={res?.question?.author?.picture || "/avatar.png"}
                        alt="user profile image"
                        width={22}
                        height={22}
                        className="rounded-full object-cover"
                    />
                </Link>
                <p className="paragraph-semibold text-dark300_light700">{res?.question?.author?.username}</p>
                </div>
                <div className="flex justify-end text-white">
                    {/* voting */}
                   <Votes
                        type="question"
                        itemId={`${res?.question?._id?.toString()}`}
                        userId={`${session?.user?._id?.toString()}` || ''}
                        upvotes={res?.question?.upvotes?.length || 0}
                        hasUpvoted={res?.question?.upvotes?.some((id:string)=> id?.toString() === session?.user?._id?.toString()) || false}
                        downvotes={res?.question?.downvotes?.length || 0}
                        hasDownvoted={res?.question?.downvotes?.some((id:string)=> id?.toString() === session?.user?._id?.toString()) || false}
                        hasSaved={session?.user?.saved?.some(id=> id?.toString() === res?.question?._id?.toString()) || false}
                    />
                </div>
            </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
            {res?.question?.title}
        </h2>
        </div>
        <div className="mb-8 mt-5 flex flex-wrap gap-4">
            <Metric 
                      imgUrl="/assets/icons/clock.svg"
                      alt="clock icon"
                      value={`asked ${getTimestamp(res?.question?.createdAt)}`}
                      title="Asked"
                      textStyles="small-medium text-dark400_light800"
                    />
                    <Metric 
                      imgUrl="/assets/icons/message.svg"
                      alt="message"
                      value={res?.question?.answers?.length}
                      title="Answers"
                      textStyles="small-medium text-dark400_light800"
                    />
                    <Metric
                      imgUrl="/assets/icons/eye.svg"
                      alt="eye"
                      value={formatNumber(res?.question?.views)}
                      title="Views"
                      textStyles="small-medium text-dark400_light800"
                    />
        </div>
        <ParseHTML explanation={res?.question?.explanation}/>
        <div className="mt-8 flex flex-wrap gap-2">
            {res?.question?.tags?.map((tag:{_id:string,name:string})=>(
                <RenderTag
                    key={tag?._id}
                    id={tag?._id}
                    name={tag?.name}
                    showCount={false}
                />
            ))}
        </div>
        <AllAnswers questionId={res?.question?._id?.toString()} userId={session?.user?._id?.toString() || ''} totalAnswers={res?.question?.answers?.length}/>
        <AnswerForm questionId={res?.question?._id?.toString()} />
    </>
  )
}

export default QuestionDetailPage