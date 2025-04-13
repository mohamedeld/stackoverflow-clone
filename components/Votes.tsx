'use client';

import { useToast } from "@/hooks/use-toast";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import { downvoteQuestion, upvoteQuestion } from "@/lib/actions/question.action";
import { toggleSaveQuestion } from "@/lib/actions/user.action";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface IProps{
  type:string;
  itemId:string;
  userId:string;
  upvotes:number;
  hasUpvoted:boolean;
  downvotes:number;
  hasDownvoted:boolean;
  hasSaved?:boolean;
}


const Votes = ({type,itemId,userId,upvotes,hasDownvoted,hasSaved,hasUpvoted,downvotes}:IProps) => {
  const {toast} = useToast();
  const pathname = usePathname();
  const handleVotes = async (vote:string)=>{
    if(!userId){
      toast({
        variant:'destructive',
        description:'user not found'
      })
      return;
    }
    if(vote === 'upvote'){
      if(type === 'question'){
       const res =  await upvoteQuestion({
          questionId:itemId,
          userId,
          hasupVoted:hasUpvoted,
          hasdownVoted:hasDownvoted,
          path:pathname
        })
    if(!res?.success){
        toast({
            variant:'destructive',
            description:res?.message
        })
        return;
    }
    toast({
        title:'Success',
        description:res?.message
    })
      } else if(type === 'answer'){
        const res = await upvoteAnswer({
            answerId:itemId,
            userId,
            hasupVoted:hasUpvoted,
            hasdownVoted:hasDownvoted,
            path:pathname
          })
          if(!res?.success){
            toast({
                variant:'destructive',
                description:res?.message
            })
            return;
        }
        toast({
            title:'Success',
            description:res?.message
        })    
      }

    }
    if(vote === 'downvote'){
      if(type === 'question'){
       const res =  await downvoteQuestion({
          questionId:itemId,
          userId,
          hasupVoted:hasUpvoted,
          hasdownVoted:hasDownvoted,
          path:pathname
        })
    if(!res?.success){
        toast({
            variant:'destructive',
            description:res?.message
        })
        return;
    }
    toast({
        title:'Success',
        description:res?.message
    })
      } else if(type === 'answer'){
        const res = await downvoteAnswer({
            answerId:itemId,
            userId,
            hasupVoted:hasUpvoted,
            hasdownVoted:hasDownvoted,
            path:pathname
          })
          if(!res?.success){
            toast({
                variant:'destructive',
                description:res?.message
            })
            return;
        }
        toast({
            title:'Success',
            description:res?.message
        })    
      }

    }
  }
  const handleSaved = async ()=>{
    try{
        const res = await toggleSaveQuestion({
            questionId:itemId,
            userId,
            path:pathname
        });
        if(!res?.success){
            toast({
                variant:'destructive',
                description:res?.message
            })
            return;
        }
        toast({
            title:'Success',
            description:res?.message
        }) 
    }catch(error){
        toast({
            variant:'destructive',
            description:error instanceof Error ? error?.message : 'Something went wrong'
        })
        return;
    }
  }
  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
        <Image src={hasUpvoted ? '/assets/icons/upvoted.svg' : '/assets/icons/upvote.svg'} alt="upvote image" width={18} height={18} className="object-cover cursor-pointer" onClick={()=> handleVotes('upvote')} />
        <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
          <p className="subtle-medium text-dark400_light900">
            {formatNumber(upvotes)}
          </p>
        </div>
        </div>
        <div className="flex-center gap-1.5">
        <Image src={hasDownvoted ? '/assets/icons/downvoted.svg' : '/assets/icons/downvote.svg'} alt="downvote image" width={18} height={18} className="object-cover cursor-pointer" onClick={()=> handleVotes('downvote')}/>
        <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
          <p className="subtle-medium text-dark400_light900">
            {formatNumber(downvotes)}
          </p>
        </div>
        </div>
      </div>
      <Image src={hasSaved ? '/assets/icons/star-filled.svg' : '/assets/icons/star-red.svg'} alt="star image" width={18} height={18} className="object-cover cursor-pointer" onClick={handleSaved} />
    </div>
  )
}

export default Votes