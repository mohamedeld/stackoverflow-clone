import Link from "next/link";
import RenderTag from "../shared/RenderTag";
import Metric from "../shared/Metric";
import { formatNumber, getTimestamp } from "@/lib/utils";

interface IProps{
  _id:string;
  title:string;
  tags:{_id:string;name:string}[];
  author:{
    _id:string;
    name:string;
    picture:string;
  };
  upvotes:number;
  views:number;
  answers:string;
  // answers:Array<object>;
  createdAt:Date;
}

const QuestionCard = ({_id,title,
  tags,author,upvotes,views,answers,createdAt
}:IProps) => {
  return (
    <div className="card-warpper p-9 sm:px-11 rounded-[10px]">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1  flex-1">{title}</h3>
          </Link>
        </div>
        {/* if sign in add edit delete */}
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags?.map(tag=>(
          <RenderTag id={tag?._id} key={tag?._id} name={tag?.name}/>
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric 
          imgUrl={"/assets/icons/avatar.svg"}
          alt="user"
          value={author?.name}
          title={`- asked ${getTimestamp(createdAt)}`}
          href={`/profile/${author?._id}`}
          isAuthor
          textStyles="body-medium text-dark400_light700"
        />
        <Metric 
          imgUrl="/assets/icons/like.svg"
          alt="upvotes"
          value={formatNumber(upvotes)}
          title="Votes"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric 
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={answers?.length}
          title="Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric 
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatNumber(views)}
          title="Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </div>
  )
}

export default QuestionCard