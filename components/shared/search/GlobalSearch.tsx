'use client';

import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const GlobalSearch = ({placeholder,keyData}:{placeholder:string,keyData:string}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const term = event.target.value;
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(keyData, term);
    } else {
      params.delete(keyData);
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4 ">
        <Image src="/assets/icons/search.svg" alt="search icon" width={24} height={24} className='cursor-pointer '/>
        <Input onChange={handleSearch} type="text" placeholder={placeholder} className='paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none'/>
      </div>  
    </div>
  )
}

export default GlobalSearch