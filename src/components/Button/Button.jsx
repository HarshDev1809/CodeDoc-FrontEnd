import { useEffect, useState } from "react"

export default function Button({placeHolder="Button",onClick=()=>{},type="button",loading=false}){
    const [loadingMsg, setLoadingMsg] = useState("Loading...");
    useEffect(() => {
        let interval;
        if (loading) {
          interval = setInterval(() => {
            setLoadingMsg((prev) => {
              if (prev === "Loading...") return "Loading";
              if (prev === "Loading..") return "Loading...";
              if (prev === "Loading.") return "Loading..";
              return "Loading.";
            });
          }, 500); // Change message every 500ms
        } else {
          setLoadingMsg(placeHolder); // Reset message when not loading
        }
    
        return () => clearInterval(interval);
      }, [loading]);

    return <button onClick={onClick} className="border  rounded p-2 min-w-20  " type={type} >
        {loading ? loadingMsg : placeHolder}
    </button>
}