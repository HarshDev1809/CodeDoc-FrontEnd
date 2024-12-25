export default function Button({placeHolder="Button",onClick=()=>{},type="button"}){
    return <button onClick={onClick} className="border rounded p-2 min-w-20" type={type}>
        {placeHolder}
    </button>
}