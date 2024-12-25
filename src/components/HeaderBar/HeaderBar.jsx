"use client";

import { useRouter } from "next/navigation";
import Button from "../Button/Button";

export default function HeaderBar() {
  const router = useRouter();

  return (
    <div>
      <nav className="border p-2 flex flex-row justify-between">
        <img src="/logo/logo.svg" className="h-10 rounded" />
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
    </div>
  );
}
