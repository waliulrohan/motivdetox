import { LoaderCircle } from "lucide-react";
import { toast } from "react-hot-toast";

// handling sounds 
// import errorSound from "../assets/sound/errorSound.mp3"
// import successSound from "../assets/sound/successSound.mp3"

// const errorTone = new Audio(errorSound)
// const successTone = new Audio(successSound)

const notifyError =(text , {id} = {})=>{
//   errorTone.play()
  const toastId =  toast((t) => {
        return <span>
            {text}
      </span>
    },{ 
        id : id || 'randomId',
        style:{
          backgroundColor: '#242427',
          color: '#ffffff',
          fontWeight: 500,
        },
        duration: 1500,
 }); 
 return toastId;       
}

const notifySuccess =(text , {id} = {} )=>{
//   successTone.play()
  const toastId =  toast((t) => {
        return <span>
            {text}
      </span>
    },{ 
        id : id || 'randomId',
        style:{
          backgroundColor: '#242427',
          color: '#ffffff',
          fontWeight: 500,
        },
        duration: 1500,
 });    
 return toastId;    
}
const notifyLoading =(text , {id} = {} )=>{
//   successTone.play()
  const toastId =  toast((t) => {
        return <span className="flex items-center gap-2" >
            {text}
            <LoaderCircle className="animate-spin" size={15}/>
      </span>
    },{ 
        id : id || 'randomId',
        style:{
          backgroundColor: '#242427',
          color: '#ffffff',
          fontWeight: 500,
        },
        duration: 20000,
 });
 return toastId;    
}

export {
    notifyError,
    notifySuccess,
    notifyLoading,
}