"use client";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { useForm } from "@/hooks";
import { useEffect, useState } from "react";
import { removeSpace } from "../../../../utils/helperFunction";
import { fetchData } from "../../../../utils/api/fetchData";

export default function SignIn() {
  const { formData: signInForm, handleFormChange: handleSignInFormChange } =
    useForm({
      username: "",
      email: "",
      password: "",
    });
  const [isValid, setIsValid] = useState(false);
  const [isUsername, setIsUsername] = useState(true);
  const [currentStep, setCurretStep] = useState(1);
  const STEP = 2;

  useEffect(() => {}, [signInForm.username]);

  const handeleUsernameChange = async(e)=>{
    const username = removeSpace(e.target.value);
    // try{
    //     const response = await fetchData(`/isAvailable/username`,"POST",{username});
    // }
  }

  const handleNextClick = ()=>{
    setCurretStep(2);
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log(userName, password);
  };
  return (
    <div className="border p-2 grow h-full flex flex-col items-center justify-center">
      <form
        className="border p-2 flex flex-col gap-4 w-4/5 rounded justify-center"
        onSubmit={handleSignIn}
      >
        <h1 className="text-2xl text-center">Sign In To Continue</h1>
        {currentStep === 1 && (
          <div>
            <Input
              label="Username"
              value={signInForm.username}
              onChange={handleSignInFormChange}
              name="username"
              placeholder="Enter your Username"
            />
            <div className="flex flex-row justify-center items-center gap-1">
              <span className="border grow"/>
              <p>OR</p>
              <span className="border grow"/>
            </div>
            <Input
              label="email"
              value={signInForm.email}
              onChange={handleSignInFormChange}
              name="email"
              placeholder="Enter your email"
                type="email"
            />
            {isValid && <Button type="button" placeHolder="Next" onClick={handleNextClick} />}
            <p className="text-center text-xs">
          Not A user ? Click{" "}
          <a href="/auth/sign-up" className="underline-offset-auto underline">
            here
          </a>{" "}
          to sign up
        </p>
          </div>
        )}

        {currentStep === 2 && <div>
            <Input
          label="Password"
          value={signInForm.password}
          onChange={handleSignInFormChange}
          name="password"
          placeholder="Enter your Password"
          type="password"
        />
        <Button type="submit" placeHolder="Sign In" />
            </div>}
      </form>
    </div>
  );
}
