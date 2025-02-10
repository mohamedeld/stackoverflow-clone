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
import { useRef, useState, useTransition } from "react";
import { Editor } from '@tinymce/tinymce-react';
import { Badge } from "../ui/badge";
import Image from "next/image";
import { createQuestion } from "@/lib/actions/question.action";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


interface IProps{
  type:'add' | 'edit';
}

const QuestionForm = ({type}:IProps) => {
  const editorRef = useRef(null);
  const [tagInput, setTagInput] = useState('');
  const [isPending,startTransition] = useTransition();
  const {toast} = useToast();
  const router = useRouter();
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
    startTransition(async()=>{
      const res = await createQuestion();
      if(!res?.success){
        toast({
          variant:"destructive",
          description:res?.message
        })
        return;
      }else{
        toast({
          title:"Success",
          description:res?.message
        })
        // router.push("/questions")
      }
    })
  }
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = tagInput.trim();

      if (value === "") {
        return form.trigger();
      }

      if (value.length > 15) {
        return form.setError('tags', {
          type: 'required',
          message: "Tag must be less than 15 characters"
        });
      }

      // Get current tags safely
      const currentTags = field.value || [];

      // Check if tag already exists
      if (currentTags.includes(value)) {
        return;
      }

      // Check maximum tags limit
      if (currentTags.length >= 3) {
        return form.setError('tags', {
          type: 'required',
          message: "Maximum 3 tags allowed"
        });
      }

      // Update form
      form.setValue('tags', [...currentTags, value]);
      setTagInput(''); // Clear input
      form.clearErrors('tags');
    }
  };

  const removeTag = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue('tags', newTags);
  };
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
                  onEditorChange={(content) => {
                    form.setValue('explanation', content); // Set the editor content to form
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
                <div>
                  <Input placeholder="question tags" className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border "
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}  onKeyDown={(e) => handleInputKeyDown(e, field)} />
                  {
                    field?.value?.length > 0 && (
                      <div className="flex-start mt-2.5 gap-2.5">
                        {Array.isArray(field?.value) && field?.value?.map((tag: any) => (
                          <Badge key={tag}>
                            {tag}
                            <Image
                              src="/assets/icons/close.svg"
                              alt="close icon"
                              width={12}
                              height={12}
                              className="object-cover cursor-pointer invert-0 dark:invert fill-white"
                              onClick={() => removeTag(tag, field)}
                            />
                          </Badge>
                        ))}
                      </div>
                    )
                  }
                </div>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to 3 tags to describe what your question is about. you need to press enter to add a tag
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button type="submit" className="primary-gradient w-fit !text-light-900 " disabled={isPending}>
          {isPending  ? (type === 'edit' ? 'Editting...' : 'Submitting...') : (type === 'edit'?'Edit Question' :'Add Question')}
        </Button>
      </form>
    </Form>
  )
}

export default QuestionForm;
