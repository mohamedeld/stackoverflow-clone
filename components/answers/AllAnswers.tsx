import { AnswerFilters } from "@/constants/filter";
import Filter from "../shared/Filter";
import { getAnswers } from "@/lib/actions/answer.action";
import Link from "next/link";
import Image from "next/image";
import { getTimestamp } from "@/lib/utils";
import ParseHTML from "../ParseHTML";
import Votes from "../Votes";

interface IProps {
    questionId: string;
    userId: string;
    totalAnswers: number;
    page?: number;
    filter?: number
}

const AllAnswers = async ({ questionId, userId, totalAnswers, page, filter }: IProps) => {
    const res = await getAnswers({ questionId });

    return (
        <div className="mt-11">
            <div className="flex items-center justify-between">
                <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
                {/*filter  */}
                <Filter
                    filters={AnswerFilters}
                />
            </div>
            <div>
                {res?.answers?.map((answer) => {
                    return (
                        <article key={answer?._id} className="light-border border-b py-10">
                            <div className="flex items-center justify-between">
                                <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                                    <Link href={`/profile/${answer?.author?._id}`} className="flex flex-1 items-start gap-1 sm:items-center">
                                        <Image
                                            src={answer?.author?.picture || "/avatar.png"}
                                            alt="avatar"
                                            width={18}
                                            height={18}
                                            className="rounded-full object-cover max-sm:mt-0.5"
                                        />
                                        <div className="flex flex-col sm:flex-row sm:items-center">
                                            <p className="body-semibold text-dark300_light700">{answer?.author?.username}</p>

                                            <p className="small-regular text-light400_light500 mt-0.5 line-clamp-1">
                                                <span className="max-sm:hidden mx-2">
                                                    -
                                                </span> answered {" "} {getTimestamp(answer?.createdAt)}
                                            </p>
                                        </div>
                                    </Link>
                                    <div className="flex justify-end">
                                        {/* voting */}
                                        <Votes
                                            type="answer"
                                            itemId={`${answer?._id?.toString()}`}
                                            userId={`${userId?.toString()}` || ''}
                                            upvotes={answer?.upvotes?.length || 0}
                                            hasUpvoted={answer?.upvotes?.some((id:string)=> id?.toString() === userId?.toString()) || false}
                                            downvotes={answer?.downvotes?.length || 0}
                                            hasDownvoted={answer?.downvotes?.some((id:string)=> id?.toString() === userId?.toString()) || false}
                                            
                                        />
                                    </div>
                                </div>
                            </div>
                            <ParseHTML explanation={answer?.content} />
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default AllAnswers