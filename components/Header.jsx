import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { SquarePen } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { checkUser } from "../lib/User";

import UserMenu from "../components/UserMenu"

const Header = async() => {
   
  await checkUser();
  
  return (
    <nav className="h-[70px] w-full flex justify-between items-center p-3 mx-auto bg-gray-800">
      <Link href={"/"}>
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl text-white">
          Schedulo
        </h1>
      </Link>
      <div className="flex gap-2">
        <Link href={"/events?create=true"}>
          <Button>
            <SquarePen />
            <span className="mx-2">Create Event</span>
          </Button>
        </Link>
        
          <SignedIn>
            <UserMenu />
          </SignedIn>
       
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard"> 
              <Button variant="secondary">Login</Button>
            </SignInButton>
          </SignedOut>
        
      </div>
    </nav>
  );
};

export default Header;
