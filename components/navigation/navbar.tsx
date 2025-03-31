"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Home, Mail, Menu, Settings } from "lucide-react";
import UserButton from "./user-button";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="z-50 w-max mx-auto flex fixed bottom-2 left-0 right-0 items-center justify-center space-x-4 rounded-lg border bg-background p-2 shadow-lg">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full",
              pathname === "/" && "bg-primary text-primary-foreground"
            )}
            asChild
          >
            <Link href={"/"}>
              <Home className="h-5 w-5" />
              <span className="sr-only">Home</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Home</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full",
              pathname.startsWith("/mail") &&
                "bg-primary text-primary-foreground"
            )}
            asChild
          >
            <Link href={"/mail"}>
              <Mail className="h-4 w-4" />
              <span className="sr-only">Mail</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Mail</TooltipContent>
      </Tooltip>

      <UserButton />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full",
              pathname.startsWith("/settings") &&
                "bg-primary text-primary-foreground"
            )}
            asChild
          >
            <Link href={"/settings"}>
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Settings</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full",
              pathname.startsWith("/menu") &&
                "bg-primary text-primary-foreground"
            )}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Menu</TooltipContent>
      </Tooltip>
    </nav>
  );
}
