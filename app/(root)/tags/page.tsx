import Filter from "@/components/shared/Filter"
import NoResult from "@/components/shared/NoResult"
import GlobalSearch from "@/components/shared/search/GlobalSearch"
import TagCard from "@/components/tags/TagCard"
import { HomePageFilters } from "@/constants/filter"
import { getAllTags } from "@/lib/actions/tag.action"
import { ITag } from "@/types"

const TagsPage = async () => {
    const res = await getAllTags({});
    return (
        <>
            <h1 className="h1-bold text-dark100_light900">All Users</h1>

            <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center ">
                <GlobalSearch keyData="local" placeholder="Search for tags" />
                <Filter filters={HomePageFilters}
                    otherClasses="min-h-[56px] sm:min-w-[170px]"
                />
            </div>
            <section className="mt-12 flex flex-wrap gap-4">
                {res?.tags && res?.tags?.length > 0 ? res?.tags?.map((tag:ITag)=>{
                    return (
                        <TagCard key={tag?._id} tag={tag}/>
                    )   
                }): (
                    <NoResult
                        title="No Tags Found"
                        description="It looks like there are no tags found."
                        linkHref="/ask-question"
                        linkTitle="Ask a question"
                    />
                )}
            </section>
        </>
    )
}

export default TagsPage