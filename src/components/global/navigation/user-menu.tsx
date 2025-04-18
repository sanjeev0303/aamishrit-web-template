"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  LogOut,
  Settings,
  ShoppingBag,
  Heart,
  Menu,
  X,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SignedOut, SignOutButton, useUser } from "@clerk/nextjs";

export default function UserMenu() {
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Link href="/sign-in">
          <Button
            variant="ghost"
            size="sm"
            className="text-[#8B5A2B] hover:bg-[#F8EFE3] border border-[#D4BC94]"
          >
            Login
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button size="sm" className="bg-[#8B5A2B] text-white hover:bg-[#6B4226]">
            Register
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Desktop User Menu */}
      <div className="hidden md:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full hover:bg-[#F8EFE3]">
              <Avatar className="h-9 w-9 border border-[#D4BC94]">
                <AvatarImage
                  src={user.imageUrl || undefined}
                  alt={user.firstName || "User"}
                />
                <AvatarFallback className="text-[#6B4226] bg-[#FDF7F0]">
                  {getInitials(user?.fullName || "User")}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60 rounded-lg border border-[#E6D5C1] bg-[#FDF7F0] text-[#6B4226] shadow-xl">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-[#A9855C]">{user?.emailAddresses[0]?.emailAddress}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/account" className="cursor-pointer hover:bg-[#F8EFE3]">
                <User className="mr-2 h-4 w-4" />
                <span>Account</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/account/orders" className="cursor-pointer hover:bg-[#F8EFE3]">
                <ShoppingBag className="mr-2 h-4 w-4" />
                <span>Orders</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/wishlist" className="cursor-pointer hover:bg-[#F8EFE3]">
                <Heart className="mr-2 h-4 w-4" />
                <span>Wishlist</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <SignOutButton>
              <DropdownMenuItem className="cursor-pointer hover:bg-[#F8EFE3] text-[#8B5A2B]">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </SignOutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile User Menu */}
      <div className="md:hidden">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-[#6B4226]">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#FDF7F0] text-[#6B4226]">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 border border-[#D4BC94]">
                    <AvatarImage
                      src={user?.imageUrl || ""}
                      alt={user.firstName || "User"}
                    />
                    <AvatarFallback className="bg-[#F8EFE3] text-[#8B5A2B]">
                      {getInitials(user?.firstName || "User")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">{user?.fullName}</p>
                    <p className="text-xs text-[#A9855C]">
                      {user?.emailAddresses[0]?.emailAddress}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-5 w-5 text-[#8B5A2B]" />
                </Button>
              </div>

              <div className="flex flex-col space-y-3 mt-6">
                <Link href="/account" className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-[#F8EFE3]" onClick={() => setIsMobileMenuOpen(false)}>
                  <User className="h-5 w-5" />
                  <span>Account</span>
                </Link>
                <Link href="/account/orders" className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-[#F8EFE3]" onClick={() => setIsMobileMenuOpen(false)}>
                  <ShoppingBag className="h-5 w-5" />
                  <span>Orders</span>
                </Link>
                <Link href="/wishlist" className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-[#F8EFE3]" onClick={() => setIsMobileMenuOpen(false)}>
                  <Heart className="h-5 w-5" />
                  <span>Wishlist</span>
                </Link>
                <Link href="/account/settings" className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-[#F8EFE3]" onClick={() => setIsMobileMenuOpen(false)}>
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </div>

              <div className="mt-auto pt-6 border-t border-[#E6D5C1]">
                <SignedOut>
                  <Button variant="outline" className="w-full text-[#8B5A2B] border-[#D4BC94] hover:bg-[#F8EFE3]">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Button>
                </SignedOut>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
