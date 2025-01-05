"use client";

import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./SliderMenu.module.css";
import useClickOutside from "@/hooks/useClickOutside";
import useKeyboardKey from "@/hooks/useKeyboardKey";
import { useEffect, useState } from "react";

export default function SliderMenu({ handleSliderMenuClose, showSliderMenu }) {
  const [isLogin, setIsLogin] = useState(false);
  const ref = useClickOutside(handleSliderMenuClose);
  useKeyboardKey("Escape", handleSliderMenuClose);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  return (
    <div
      className={`h-screen w-screen absolute top-0 left-0 z-1 bg-black bg-opacity-75`}
    >
      <div className={`bg-white h-full border ${styles.sliderMenu}`} ref={ref}>
        <div className="flex justify-between">
          <Button disabled placeHolder="</DOC>" type="button" />
          <Button
            type="button"
            placeHolder={<FontAwesomeIcon icon={faXmark} />}
            onClick={handleSliderMenuClose}
          />
        </div>
      </div>
    </div>
  );
}
