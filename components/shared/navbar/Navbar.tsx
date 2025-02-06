import { SignedIn, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12 ">
      <Link href="/" className="flex items-center gap-1">
        <Image src="/assets/images/site-logo.svg" alt="dev flow icon home" width={23} height={23} className="object-fit"/>
        <p className="h2-bold font-space text-dark-100  dark:text-light-900 max-sm:hidden">Dev <span className="text-primary-500">Overflow</span></p>
      </Link>
      {/* Global search */}
      <div className="flex-between gap-5">
        {/* theme */}
        <SignedIn>
          <UserButton afterSwitchSessionUrl="/" appearance={{
            elements:{
              avatarBox:'w-10 h-10'
            },
            variables:{
              colorPrimary:'#ff7000'
            }
          }}/>
        </SignedIn>
      </div>
    </nav>
  )
}

export default Navbar