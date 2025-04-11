"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
interface IProps{
    username:string;
    img:string;
}
const UserAvatar = ({img,username}:IProps) => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarImage src={img || "/avatar.png"} />
            <AvatarFallback>{username?.toUpperCase()?.slice(0,2)}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>Place content for the popover here.</PopoverContent>
      </Popover>
    </>
  );
};

export default UserAvatar;
