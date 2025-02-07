'use client';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { addQuestionSchema } from "@/lib/validator";
import { z } from "zod";
import { useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';

const QuestionForm = () => {
  const editorRef = useRef(null);
  const form = useForm<z.infer<typeof addQuestionSchema>>({
    mode: 'onChange',
    defaultValues: {
      title: "",
      explanation: "",
      tags: []
    },
    resolver: zodResolver(addQuestionSchema)
  })
  const onSubmit: SubmitHandler<z.infer<typeof addQuestionSchema>> = (values) => {

  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-10">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel className="paragraph-semibold text-dark400_light900">Question Title <span className="text-primary-500">*</span></FormLabel>
              <FormControl className="mt-3.5">
                <Input placeholder="question title" className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border " {...field} />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific and imagine you are asking a question to another person
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light900">Detailed explanation of your problem<span className="text-primary-500">*</span></FormLabel>
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
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduce the problem and expand on what you put in the title. Minimum 20 characters
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel className="paragraph-semibold text-dark400_light900">Question Tags <span className="text-primary-500">*</span></FormLabel>
              <FormControl className="mt-3.5">
                <Input placeholder="question title" className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border " {...field} />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to 3 tags to describe what your question is about. you need to press enter to add a tag
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default QuestionForm