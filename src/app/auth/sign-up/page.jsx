"use client";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { useEffect, useState } from "react";
import { useForm } from "@/hooks/useForm";
import { fetchData } from "../../../../utils/api/fetchData";
import { isValidEmail, removeSpaces } from "../../../../utils/helperFunction";

export default function SignUp() {
  const {
    formData: signUpForm,
    handleFormChange: handleSignUpFormChange,
    resetForm: resetSignUpForm,
  } = useForm({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [userNameMsg, setUserNameMsg] = useState(null);
  const [emailStatus,setEmailStatus] = useState(null);

  const [confirmPassword, setConfirmPassword] = useState(null);
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const [error, setError] = useState(null);

  useEffect(() => {
    if (signUpForm && signUpForm.username.length >= 6) {
      fetchData("/isAvailable/username", "POST", { username: signUpForm.username })
        .then(({ message,available }) => {
          setUserNameMsg({msg : message,available : available})
        })
        .catch((err) => console.error(err));
    }else{
      setUserNameMsg({msg : "Username length should be minimum 6"})
    }

    if (signUpForm && isValidEmail(signUpForm.email)) {
      fetchData("/isAvailable/email", "POST", { email: signUpForm.email })
        .then(({ message,available }) => {
          setEmailStatus({msg : message,available : available})
        })
        .catch((err) => console.error(err));
    }else{
      setEmailStatus(null)
    }
  }, [signUpForm]);

  const handleUsernameChange = (e) => {
  const updatedUsername = removeSpaces(e.target.value);
  handleSignUpFormChange({
    ...e,
    target: { ...e.target, value: updatedUsername }
  });
};

  

  const handleSignIn = (e) => {
    e.preventDefault();

    console.log(signUpForm);
  };

  return (
    <div className="border p-2 grow h-full flex flex-col items-center justify-center">
      <form
        className="border p-2 flex flex-col gap-1 w-4/5 rounded justify-center"
        onSubmit={handleSignIn}
      >
        <h1 className="text-2xl text-center">Register</h1>
        <div className="flex flex-row">
          <Input
            label="First Name"
            name="firstName"
            value={signUpForm.firstName}
            onChange={handleSignUpFormChange}
            placeholder="Enter your First Name"
          />
          <Input
            label="Last Name"
            value={signUpForm.lastName}
            name="lastName"
            onChange={handleSignUpFormChange}
            placeholder="Enter your Last Name"
          />
        </div>
        <div className="text-start">
        <Input
          label="Email"
          value={signUpForm.email}
          onChange={handleSignUpFormChange}
          placeholder="Enter your Email"
          type="email"
          name="email"
        />
         {emailStatus && (emailStatus.available!== undefined ? emailStatus.available ? <span className="text-xs text-center text-green-500 pl-2">{emailStatus.msg}</span> : <span className="text-xs text-center text-red-500 pl-2">{emailStatus.msg}</span> : <span className="text-xs text-center text-slate-400 pl-2">{emailStatus.msg}</span>)}
         </div>
        <div className="text-start">
          <Input
            label="Username"
            value={signUpForm.username}
            name="username"
            onChange={(e)=>{
              e.target.value = removeSpaces(e.target.value)
              
              handleSignUpFormChange(e)}}
            placeholder="Enter your Username"
          />
          {userNameMsg && (userNameMsg.available!== undefined ? userNameMsg.available ? <span className="text-xs text-center text-green-500 pl-2">{userNameMsg.msg}</span> : <span className="text-xs text-center text-red-500 pl-2">{userNameMsg.msg}</span> : <span className="text-xs text-center text-slate-400 pl-2">{userNameMsg.msg}</span>)}
        </div>
        <Input
          label="Pasword"
          value={signUpForm.password}
          name="password"
          onChange={handleSignUpFormChange}
          placeholder="Enter your Password"
          type="password"
        />
        <Input
          label="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="Re-enter your Password"
          type="password"
        />
        <Button type="submit" placeHolder="Sign In" />
        <p className="text-center text-xs">
          Alredy A user ? Click{" "}
          <a href="/auth/sign-in" className="underline-offset-auto underline">
            here
          </a>{" "}
          to sign in
        </p>
      </form>
    </div>
  );
}

SignUp.layout;
