const { useEffect } = require("react")

const useKeyboardKey = (key,callback)=>{
    useEffect(()=>{
        const handelKeyDown = (event)=>{
            if(event.key === key){
                callback()
            }
        }

        window.addEventListener("keydown",handelKeyDown)

        return ()=>{
            window.removeEventListener('keydown',handelKeyDown)
        }
    },[])
}

export default useKeyboardKey;