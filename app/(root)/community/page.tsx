import UserCard from "@/components/cards/UserCard"
import Filter from "@/components/shared/Filter"
import GlobalSearch from "@/components/shared/search/GlobalSearch"
import { HomePageFilters } from "@/constants/filter"
import { getAllUsers } from "@/lib/actions/user.action"
import { UserType } from "@/types"
import Link from "next/link"

const CommunityPage = async () => {
    const res = await getAllUsers({});
    console.log(res)
    console.log(res?.users ? "welcome " : 'not welcome')
    return (
        <>
            <h1 className="h1-bold text-dark100_light900">All Users</h1>

            <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center ">
                <GlobalSearch keyData="local" placeholder="Search for amazing minds" />
                <Filter filters={HomePageFilters}
                    otherClasses="min-h-[56px] sm:min-w-[170px]"
                />
            </div>
            <section className="mt-12 flex flex-wrap gap-4">
                {res?.users && res?.users?.length > 0 ? res?.users?.map((user:UserType)=>{
                    return (
                        <UserCard key={user?._id} user={user}/>
                    )   
                }): (
                    <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
                        <p>No users yet</p>
                        <Link href={"/sign-up"} className="mt-2 font-bold text-accent-blue">Join to be the first!</Link>
                    </div>
                )}
            </section>
        </>
    )
}

export default CommunityPage