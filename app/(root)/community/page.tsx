import Filter from "@/components/shared/Filter"
import GlobalSearch from "@/components/shared/search/GlobalSearch"
import { HomePageFilters } from "@/constants/filter"
import { getAllUsers } from "@/lib/actions/user.action"

const CommunityPage = async () => {
    const res = await getAllUsers();
    console.log(res)
    return (
        <>
            <h1 className="h1-bold text-dark100_light900">All Community</h1>

            <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center ">
                <GlobalSearch keyData="local" placeholder="Search for amazing minds" />
                <Filter filters={HomePageFilters}
                    otherClasses="min-h-[56px] sm:min-w-[170px]"
                />
            </div>
            <section className="mt-12 flex flex-wrap gap-4">

            </section>
        </>
    )
}

export default CommunityPage