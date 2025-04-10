import { auth } from "@/auth"
import QuestionCard from "@/components/cards/QuestionCard"
import HomeFilter from "@/components/HomeFilter"
import Filter from "@/components/shared/Filter"
import NoResult from "@/components/shared/NoResult"
import GlobalSearch from "@/components/shared/search/GlobalSearch"
import { Button } from "@/components/ui/button"
import { HomePageFilters } from "@/constants/filter"
import { getAllQuestions } from "@/lib/actions/question.action"
import Link from "next/link"



interface IProps{
  searchParams:Promise<{
    page?:string;
    pageSize?:string;
    searchQuery?:string;
    filter?:string;
  }>
}
const HomePage = async ({searchParams}:IProps) => {
  const {page,pageSize,searchQuery,filter} = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = Number(pageSize) || 10;
  const search = searchQuery || "";
  const filters = filter || "newest";
  const res = await getAllQuestions({page:currentPage,pageSize:limit,searchQuery:search,filter:filters});
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
        {res?.questions?.length ?? 0 > 0 ? (
          res?.questions?.map(question=>(
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