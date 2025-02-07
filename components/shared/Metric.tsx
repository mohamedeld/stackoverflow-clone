import Image from "next/image";
import Link from "next/link";

interface IProps{
  imgUrl:string;
  alt:string;
  value:number | string;
  title:string;
  textStyles?:string;
  href?:string;
  isAuthor?:boolean;
}
const Metric = ({imgUrl,alt,value,title,textStyles,href,isAuthor}:IProps) => {
  const MetricContent = (
    <>
      <Image
      src={imgUrl}
      alt={alt}
      width={16}
      height={16}
      className={`object-contain ${href ? 'rounded-full':''}`}
    />
    <p className={`${textStyles} flex items-center gap-1`}>
      {value} 
      <span className={`small-regular line-clamp-1 ${isAuthor ? 'max-sm:hidden' : ''}`}>
      {title}
      </span>
    </p>
    </>
  )
  if(href){
    <Link href={href} className="flex-center gap-1">
      {MetricContent}
    </Link>
  }
  return (
    <div className="flex-center flex-wrap gap-1">
       {MetricContent}
    </div>
  )
}

export default Metric