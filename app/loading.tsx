import {DotLoader} from "react-spinners"
const LoadingPage = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <DotLoader size={80} color="#FF7000"/>
    </div>
  )
}

export default LoadingPage