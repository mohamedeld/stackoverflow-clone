
'use client';

import { ITag } from "@/types"
import { useRouter } from "next/navigation";

interface IProps{
    tag:ITag
}

const TagCard = ({tag}:IProps) => {
    const router = useRouter();
    const handleClick = ()=>{
        router.push(`/tags/${tag?._id}`)
    }
  return (
    <div onClick={handleClick} className="shadow-light100_darknone">
        <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
            <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
                <p className="paragraph-semibold text-dark300_light900">
                    {tag?.name}
                </p>
            </div>
            <p className="small-medium text-dark400_light500 mt-3.5">
                <span className="body-semibold primary-text-gradient mr-2.5">{tag?.questions?.length}+</span> Questions
            </p>
        </article>
    </div>
  )
}

export default TagCard