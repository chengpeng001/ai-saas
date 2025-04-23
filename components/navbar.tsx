import { UserButton } from "@clerk/nextjs";
import { Bell, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import MobileSidebar from "./mobile-sidebar";

const Navbar = async () => {
  const creditBalance = 5000;
  const notificationCount = 3;

  return (
    <div className="flex items-center p-4 border-b h-16 bg-background">
      <MobileSidebar apiLimitCount={0} isPro={false} />

      <div className="hidden md:flex items-center gap-x-4">
        <Link href="/dashboard" className="flex items-center">
          <div className="relative w-8 h-8 mr-2">
            <Image fill alt="Logo" src="/my-logo.png"></Image>
          </div>
          <span className="text-xl font-bold text-primary">Free99.io</span>
        </Link>
        <span className="text-xl font-semibold text-foreground">Dashboard</span>
      </div>

      <div className="flex w-full justify-end items-center gap-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-primary-foreground transform translate-x-1/2 -translate-y-1/2 bg-destructive rounded-full">
              {notificationCount}
            </span>
          )}
        </Button>

        <div className="bg-muted px-3 py-1 rounded-md text-sm font-medium text-muted-foreground">
          ${creditBalance.toLocaleString()}
        </div>

        <Button variant="secondary" size="sm">
          <Sparkles className="h-4 w-4 mr-2 fill-current" />
          Features
        </Button>

        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
