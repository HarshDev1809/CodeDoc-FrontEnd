"use client";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { useForm } from "@/hooks";
import { useEffect, useState } from "react";
import { removeSpace } from "../../../../utils/helperFunction";
import { fetchData } from "../../../../utils/api/fetchData";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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
  const [loading, setLoading] = useState(false);
  const STEP = 2;

  useEffect(() => {}, [signInForm.username]);

  const handeleUsernameChange = async (e) => {
    const username = removeSpace(e.target.value);
    e.target.value = username;
    handleSignInFormChange(e);
    if (username.length > 5) {
      try {
        const response = await fetchData(`/isAvailable/username`, "POST", {
          username,
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleNextClick = async () => {
    if (signInForm.username.length < 6) {
      toast.error("Username must be greater than 6")
      return;
    }
    setLoading(true);
    try {
      const { available } = await fetchData(`/isAvailable/username`, "POST", {
        username: signInForm.username,
      });
      if (!available) {
        setCurretStep((prev) => prev + 1);
      }
       setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignIn = async(e) => {
    e.preventDefault();
    try{
      const url = signInForm.username.length === 0 ? `/auth/signin?verify=email` : `/auth/signin?verify=username`
      const result = await fetchData(url,"POST",{
        username : signInForm.username,
        password : signInForm.password,
        email : signInForm.email
      })
      if(result.status === "successful"){
        localStorage.setItem("token",`bearer ${result.token}`)
        localStorage.setItem("userDetails",JSON.stringify({username : result.username,email : result.email,firstName:result.firstName,lastName : result.lastName}))
      }
      console.log(result)
    }catch(error){
      console.log(error)
    }
  };

  const isDisabled = (value) => {
    if (signInForm.username.length === 0 && signInForm.email.length === 0) {
      return false;
    }

    if (value === "username" && signInForm.email.length === 0) {
      return false;
    }

    if (value === "email" && signInForm.username.length === 0) {
      return false;
    }

    return true;
  };

  const goBack = () => {
    setCurretStep(1);
  };

  const goBackHTML = () => {
    return (
      <div className="flex flex-row gap-1 items-center">
        <FontAwesomeIcon icon={faArrowLeft} />
        <span>Go Back</span>
      </div>
    );
  };

  return (
    <div className="border p-2 grow h-full flex flex-col items-center justify-center">
      <form
        className="border p-2 py-7 flex flex-col gap-4 w-4/5 rounded justify-center"
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
              disabled={isDisabled("username")}
            />
            <div className="flex flex-row justify-center items-center gap-1 text-xs">
              <span className="border grow" />
              <p>OR</p>
              <span className="border grow" />
            </div>
            <Input
              label="email"
              value={signInForm.email}
              onChange={handleSignInFormChange}
              name="email"
              placeholder="Enter your email"
              type="email"
              disabled={isDisabled("email")}
            />

            <Button
              type="button"
              placeHolder="Next"
              onClick={handleNextClick}
              loading={loading}
            />

            <p className="text-center text-xs">
              Not A user ? Click{" "}
              <a
                href="/auth/sign-up"
                className="underline-offset-auto underline"
              >
                here
              </a>{" "}
              to sign up
            </p>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <div>
              <Button
                type="button"
                placeHolder={goBackHTML()}
                onClick={goBack}
              />
            </div>
            <Input
              label="Password"
              value={signInForm.password}
              onChange={handleSignInFormChange}
              name="password"
              placeholder="Enter your Password"
              type="password"
            />
            <Button
              type="submit"
              placeHolder="Sign In"
              loading={true}
              setLoading
            />
          </div>
        )}
      </form>
    </div>
  );
}
