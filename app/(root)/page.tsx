import QuestionCard from "@/components/cards/QuestionCard"
import HomeFilter from "@/components/HomeFilter"
import Filter from "@/components/shared/Filter"
import NoResult from "@/components/shared/NoResult"
import GlobalSearch from "@/components/shared/search/GlobalSearch"
import { Button } from "@/components/ui/button"
import { HomePageFilters } from "@/constants/filter"
import Link from "next/link"

const questions = [
  {
    _id:'1',
    title:'the first question i ask',
    tags:[
      {_id:'1',name:"first"},
      {_id:'2',name:"second"},
    ],
    author:{
      _id:'1',
      name:"mohamed",
      picture:"asdfasdfasdf"
    },
    upvotes:10,
    views:100,
    answers:'2',
    createdAt:new Date('2021-01-20T12:00:00.000Z')
  },{
    _id:'2',
    title:'the first question i ask',
    tags:[
      {_id:'1',name:"first"},
      {_id:'2',name:"second"},
    ],
    author:{
      _id:'1',
      name:"mohamed",
      picture:"asdfasdfasdf"
    },
    upvotes:10,
    views:100,
    answers:'2',
    createdAt:new Date('2021-01-20T12:00:00.000Z')
  },
  {
    _id:'3',
    title:'the first question i ask',
    tags:[
      {_id:'1',name:"first"},
      {_id:'2',name:"second"},
    ],
    author:{
      _id:'1',
      name:"mohamed",
      picture:"asdfasdfasdf"
    },
    upvotes:10,
    views:100,
    answers:'2',
    createdAt:new Date('2021-01-20T12:00:00.000Z')
  },{
    _id:'4',
    title:'the first question i ask',
    tags:[
      {_id:'1',name:"first"},
      {_id:'2',name:"second"},
    ],
    author:{
      _id:'1',
      name:"mohamed",
      picture:"asdfasdfasdf"
    },
    upvotes:10,
    views:100,
    answers:'2',
    createdAt:new Date('2021-01-20T12:00:00.000Z')
  }
]

const HomePage = () => {
  return (
    <>
      <div className="flex items-center w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">Ask Question</Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center ">
        <GlobalSearch keyData="local" placeholder="Search for questions" />
        <Filter filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-lg:block"
        />
      </div>
      <HomeFilter/>
      <div className="mt-10 flex w-full flex-col gap-6">
        {/* question */}
        {questions?.length > 0 ? (
          questions?.map(question=>(
            <QuestionCard key={question?._id} _id={question?._id} 
              title={question?.title}
              createdAt={question?.createdAt}
              upvotes={question?.upvotes}
              views={question?.views}
              author={question?.author}
              tags={question?.tags}
              answers={question?.answers}
            />
          ))
        ) : (
         <NoResult title="There is no question to show" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur dolorem nemo laudantium nam, in vero velit sapiente est veniam delectus cum a." linkHref="/" linkTitle="Ask a Question"/>
        )}
      </div>
    </>
  )
}

export default HomePage