'use client';
import {useTheme} from "@/context/ThemeProvide";
const Theme = () => {
  const {mode,setMode} = useTheme();
  return (
    <div>Theme</div>
  )
}

export default Theme