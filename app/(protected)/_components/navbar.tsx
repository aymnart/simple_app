"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Home, Mail, Menu, Settings } from "lucide-react";
import UserButton from "./user-button";
import Link from "next/link";

export default function Navbar() {
  return (
    // add fixed  to the nav class name to make the navbar stick to the bottom of the screen
    <div className="fixed top-2 left-0 right-0 flex justify-center z-50">
      <nav className=" flex items-center justify-center space-x-4 rounded-full border bg-background p-2 shadow-lg">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Home className="h-5 w-5" />
          <span className="sr-only">Home</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Mail className="h-4 w-4" />
          <span className="sr-only">Mail</span>
        </Button>
        <UserButton />
        <Button variant="ghost" size="icon" className="rounded-full">
          <Link href={"/settings"}>
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </nav>
    </div>
  );
}
