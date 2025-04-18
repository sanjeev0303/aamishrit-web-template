"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Heart, Menu, MenuIcon, SearchIcon, ShoppingBag, ShoppingCart, ShoppingCartIcon, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/constants/mobile-nav-list";
import { useIsMobile, useIsTablet } from "@/hooks/useMobile";
import { NavigationMenuDemo } from "./navigation-menu";
import { usePathname, useRouter } from "next/navigation";
import UserMenu from "./user-menu";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toggleCart } from "@/store/slices/cartSlice";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

const NavigationBar = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const { user } = useUser()
  const cartItems = useAppSelector((state) => state.cartReducer.items)
  const wishlistItems = useAppSelector((state) => state.wishlist.items)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const router = useRouter();

const handleCartToggle = () => {
    return router.push("/cart")
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/#categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <div className="bg-brown-50 shadow-lg w-full">
    {isMobile || isTablet ? (
      <div className="flex items-center justify-between py-1 px-4 border-b border-brown-200 bg-brown-50">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="logo"
            width={50}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* Cart + Mobile Menu */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCartToggle}
            className="relative hover:bg-brown-100 transition"
          >
            <ShoppingCart className="h-7 w-7 text-brown-700" />
            {cartItems.length > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-brown-600 text-white">
                {cartItems.length}
              </Badge>
            )}
          </Button>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-brown-100 transition"
              >
                <Menu className="h-6 w-6 text-brown-700" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[85vw] sm:w-[400px] bg-brown-50 border-l border-brown-200 px-6 py-6 shadow-2xl rounded-l-2xl animate-in slide-in-from-right fade-in"
            >
              {(() => {
                const { user, isSignedIn } = useUser();

                return (
                  <>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                      <Link
                        href="/"
                        className="flex items-center space-x-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Image
                          src="/logo.png"
                          alt="logo"
                          width={40}
                          height={30}
                          className="object-contain"
                        />
                        <span className="text-xl font-semibold text-brown-800 tracking-wide">ShopNow</span>
                      </Link>
                    </div>

                    {/* Auth Section */}
                    <div className="mb-6">
                      {isSignedIn ? (
                        <div className="flex items-center gap-4 bg-brown-100 rounded-xl p-4 shadow">
                          <UserButton afterSignOutUrl="/" />
                          <div className="text-sm space-y-1">
                            <p className="text-brown-800 font-semibold">{user.fullName}</p>
                            <p className="text-brown-500">{user.primaryEmailAddress?.emailAddress}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3">
                          <SignInButton mode="modal">
                            <Button className="w-full bg-brown-600 text-white hover:bg-brown-700">
                              Sign In
                            </Button>
                          </SignInButton>
                          <SignUpButton mode="modal">
                            <Button className="w-full bg-brown-100 text-brown-700 hover:bg-brown-200">
                              Sign Up
                            </Button>
                          </SignUpButton>
                        </div>
                      )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-5 text-base">
                      {navLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`transition-colors font-medium ${
                            pathname === link.href
                              ? "text-brown-800 underline underline-offset-4"
                              : "text-brown-500 hover:text-brown-700"
                          }`}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </nav>

                    {/* Wishlist */}
                    <div className="mt-8 flex items-center gap-2 text-sm font-medium hover:text-brown-700 transition">
                      <Link
                        href="/wishlist"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2"
                      >
                        <Heart className="h-5 w-5 text-brown-600" />
                        <span>Wishlist</span>
                        {wishlistItems.length > 0 && (
                          <Badge variant="outline" className="text-xs border-brown-400 text-brown-700">
                            {wishlistItems.length}
                          </Badge>
                        )}
                      </Link>
                    </div>

                    <div className="border-t border-brown-200 my-6" />

                    {/* Account Actions */}
                    {isSignedIn && (
                      <div className="space-y-3">
                        <Link href="/account" onClick={() => setIsMobileMenuOpen(false)}>
                          <Button className="w-full justify-start bg-brown-100 text-brown-800 hover:bg-brown-200">
                            <User className="mr-2 h-4 w-4" />
                            My Account
                          </Button>
                        </Link>
                        <Link href="/account/orders" onClick={() => setIsMobileMenuOpen(false)}>
                          <Button className="w-full justify-start bg-brown-100 text-brown-800 hover:bg-brown-200">
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            My Orders
                          </Button>
                        </Link>
                      </div>
                    )}
                  </>
                );
              })()}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    ) : (
      <div className="w-full px-10 py-1 flex items-center justify-between bg-brown-50 shadow-lg border-b border-brown-200">
        <div className="flex items-center gap-10">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="logo"
              width={60}
              height={45}
              priority
              className="object-contain"
            />
          </Link>
        </div>

        <div className="flex items-center gap-10">
          <NavigationMenuDemo />

          <div className="flex items-center gap-6">
            <Link href="/cart" className="relative group">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-transparent hover:bg-brown-100 transition">
                <ShoppingCart className="h-6 w-6 text-brown-700" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 bg-brown-600 text-white text-xs flex items-center justify-center">
                    {cartItems.length}
                  </Badge>
                )}
              </div>
            </Link>

            <UserMenu />
          </div>
        </div>
      </div>
    )}
  </div>

  );
};

export default NavigationBar;
