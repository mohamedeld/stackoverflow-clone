'use client';

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { z } from "zod";
import { answerSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { useTheme } from "@/context/ThemeProvide";
import { Button } from "../ui/button";
import Image from "next/image";

const AnswerForm = () => {
    const {mode} = useTheme();
    const {toast} = useToast();
      const editorRef = useRef<Editor | null>(null);
    
    const form = useForm<z.infer<typeof answerSchema>>({
        defaultValues:{
            answer:''
        },
        resolver:zodResolver(answerSchema)
    })
    const onSubmit = (values:z.infer<typeof answerSchema>) => {
        try{
            console.log(values);
        }catch(error){
            toast({
                variant:"destructive",
                    description:error instanceof Error ? error?.message : "Something went wrong"
              })
        }
    }
  return (
    <div className="mt-4">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
            <h4 className="paragraph-semibold text-dark400_light800">Write your answer here</h4>
            <Button className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500">
                <Image
                    src={"/assets/icons/stars.svg"}
                    alt="star icon"
                    width={12}
                    height={12}
                    className="object-contain"
                />
                Generate AI answer
            </Button>
        </div>
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 flex w-full flex-col gap-10">
        <FormField
          control={form.control}
          name="answer"
          render={() => (
            <FormItem className="flex flex-col w-full gap-3">
              
              <FormControl className="mt-3.5">
                <Editor
                  apiKey="a36ck9ukhjegx307bkk25wtzbpn61czjxqbdv2swh1ohjthc"
                  onInit={(_evt, editor) => editorRef.current = editor}
                  initialValue=""
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                      'bold italic forecolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    skin:mode === 'dark' ? 'oxide-dark':'oxide',
                    content_css:mode === 'dark' ? 'dark' : 'light'
                  }}
                  onEditorChange={(content) => {
                    form.setValue('answer', content); // Set the editor content to form
                  }}
                />
              </FormControl>
              
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
            <Button type="submit" className="primary-gradient w-fit text-white" disabled={form.formState?.isSubmitting}>
                {form.formState.isSubmitting ? 'Submitting' : 'Submit'}
            </Button>
        </div>
        </form>
    </Form>
    </div>
  )
}

export default AnswerForm