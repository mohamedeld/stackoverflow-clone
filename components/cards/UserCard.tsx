import { getTopInteractedTags } from "@/lib/actions/tag.action"
import { UserType } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import RenderTag from "../shared/RenderTag"

interface IProps{
    user:UserType
}
const UserCard = async ({user}:IProps) => {
    const interactedTags = await getTopInteractedTags({
        userId:user?._id
    })
  return (
    <div className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]">
        <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8 h-full">
        <Link href={`/profile/${user?._id}`} >
            <Image src={user?.picture || "/avatar.png"} alt="user picture image" width={100} height={100} className="object-cover rounded-full"/>
                </Link>
            <div className="mt-4 text-center">
                <h3 className="h3-bold text-dark200_light900 line-clamp-1">{user?.name}</h3>
                <p className="body-regular text-dark500_light500 mt-2">@{user?.username}</p>
            </div>
            <div className="mt-5">
                {(interactedTags?.tags && interactedTags?.tags?.length > 0) ? (
                    <div className="flex items-center gap-2">
                        {interactedTags?.tags?.map((tag)=>{
                           return(
                            <RenderTag key={tag?._id} name={tag?.name} id={tag?._id} />
                           )
                        })}
                    </div>
                ):(
                    <Badge>
                        No Tags Yet
                    </Badge>
                )}
            </div>
        </article>
    </div>
  )
}

export default UserCard