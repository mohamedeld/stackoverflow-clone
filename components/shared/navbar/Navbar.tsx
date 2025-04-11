import Image from "next/image"
import Link from "next/link"
import Theme from "./Theme"
import MobileNav from "./MobileNav"
import GlobalSearch from "../search/GlobalSearch"
import { auth } from "@/auth"
import UserAvatar from "@/components/users/UserAvatar"

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12 ">
      <Link href="/" className="flex items-center gap-1">
        <Image src="/assets/images/site-logo.svg" alt="dev flow icon home" width={23} height={23} className="object-fit"/>
        <p className="h2-bold font-space text-dark-100  dark:text-light-900 max-sm:hidden">Dev <span className="text-primary-500">Overflow</span></p>
      </Link>
      {/* Global search */}
      <GlobalSearch keyData="query" placeholder="Search globally..."/>
      <div className="flex-between gap-5">
        {/* theme */}
        <Theme/>
        {session?.user && <UserAvatar img={session?.user?.picture} username={session?.user?.username}/>}
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar