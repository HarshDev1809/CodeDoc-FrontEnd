"use client";

import { useRouter } from "next/navigation";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import SliderMenu from "../SliderMenu/SliderMenu";

export default function HeaderBar() {
  const router = useRouter();
  const [showSliderMenu,setShowSliderMenu] = useState(false)

  const handleMenuClick = ()=>{
    setShowSliderMenu(true)
  }

  const handleSliderMenuClose = ()=>{
    setShowSliderMenu(false)
  }

  return (
    <div>
      <nav className="border p-2 flex flex-row justify-between">
        <div className="flex gap-2">
        <button type="button" className = "border rounded p-2"
        onClick={handleMenuClick}
        >
          <FontAwesomeIcon icon={faBars} />
          </button>
          {/* <Button placeHolder={<img src="/logo/logo.svg" className="h-5 rounded" />} /> */}
        <Button type="button" placeHolder="</DOC>" />
        
        </div>
       
        <div className="flex flex-row gap-2">
          <Button
            className="border rounded p-2 min-w-20"
            onClick={() => {
              router.push("/auth/sign-in");
            }}
            placeHolder="Sign In"
          />
          <Button className="border rounded p-2 min-w-20"
          onClick={() => {
            router.push("/auth/sign-up");
          }}
          placeHolder="Sign Up"
          />
        </div>
      </nav>

          {showSliderMenu && <SliderMenu handleSliderMenuClose = {handleSliderMenuClose} showSliderMenu={showSliderMenu}/>}

    </div>
  );
}


