import { ReactNode } from "react"


interface IProps{
  children:ReactNode
} 

const AuthLayout = ({children}:IProps) => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center">{children}</main>
  )
}

export default AuthLayout