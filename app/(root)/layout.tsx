import LeftSidebar from "@/components/LeftSidebar"
import RightSidebar from "@/components/RightSidebar"
import Navbar from "@/components/shared/navbar/Navbar"
import { Toaster } from "@/components/ui/toaster"
import { ReactNode } from "react"

const RootLayout = ({children}:{children:ReactNode}) => {
  return (
    <main className="background-light850_dark100 relative">
      {/* navbar */}
      <Navbar/>
      <div className="flex">
        {/* left sidebar */}
        <LeftSidebar/>
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">
            {children}
          </div>
        </section>
        {/* right sidebar */}
        <RightSidebar/>
      </div>
      {/* toaster */}
      <Toaster/>
    </main>
  )
}

export default RootLayout