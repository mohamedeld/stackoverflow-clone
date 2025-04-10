"use client"
 
import { useToast } from "@/hooks/use-toast"
import { loginSchema } from "@/lib/validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"

const AuthLogin = () => {
    const {toast} = useToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
          username: "",
          email:"",
          password:""
        },
      })
      const onSubmit = async (values:z.infer<typeof loginSchema>)=>{
        try{
            const result = await signIn("credentials", {
                username:values?.username,
                email:values?.email,
                password:values?.password,
                redirect:false
            })
            if(result?.error){
              toast({
                  variant:"destructive",
                  description:result?.error || "Something went wrong"
              })
            }else{
              router.replace('/')
            }
        }catch(error){
            toast({
                variant:"destructive",
                description:error instanceof Error ? error?.message : "Something went wrong"
            })
        }
      }
      const {isSubmitting,errors} = form.formState;
  return (
    <div className="max-sm:mx-4 w-full md:w-[25rem] p-4 border rounded-[8px] shadow">
         <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting' : 'Submit'}
        </Button>
      </form>
    </Form>
    </div>
  )
}

export default AuthLogin