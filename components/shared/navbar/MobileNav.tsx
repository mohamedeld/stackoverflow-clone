'use client';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


export const NavContent = () => {
  const pathname = usePathname();
  return (
    <section className="flex flex-col h-full gap-6 pt-16">
      {sidebarLinks?.map(item => {
        const isActive = (pathname?.includes(item?.route) && item?.route?.length > 1) || pathname === item?.route; 
        return (
          <SheetClose key={item?.label} asChild>
            <Link href={item?.route} className={`${isActive ? 'primary-gradient rounded-lg text-light-900':'text-dark300_light900'} flex justify-start items-center gap-4 bg-transparent p-4`}>
              <Image src={item?.imgURL} alt={item?.label} width={20} height={20} className={`${isActive ? "" :"invert-colors"}`} />
              <p className={`${isActive ? "base-bold" :"base-medium"}`}>{item?.label}</p>
            </Link>
          </SheetClose>
        )
      })}
    </section>
  )
}

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image src="/assets/icons/hamburger.svg" alt="hamburger icon" width={36} height={36} className="invert-colors sm:hidden" />
      </SheetTrigger>
      <SheetContent side="left" className="background-light900_dark200 border-none">
        <SheetHeader>
          <SheetTitle><Link href="/" className="flex items-center gap-1">
            <Image src="/assets/images/site-logo.svg" alt="dev flow icon home" width={23} height={23} className="object-fit" />
            <p className="h2-bold font-space text-dark100_light900  ">Dev <span className="text-primary-500">Overflow</span></p>
          </Link>
          </SheetTitle>
          <div>
            <SheetClose asChild>
              <NavContent />
            </SheetClose>
          </div>
          <SheetDescription>
           
          </SheetDescription>
        </SheetHeader>
        <>
          <div className="flex flex-col gap-3">
            <SheetClose asChild>
              <Link href="/sign-in">
                <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                  <span className="primary-text-gradient">Log In</span>
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/sign-up">
                <Button className="small-medium light-border-2 btn-tertiary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none text-dark400_light900">
                  Sign Up
                </Button>
              </Link>
            </SheetClose>
          </div>
        </>
      </SheetContent>
    </Sheet>

  )
}

export default MobileNav