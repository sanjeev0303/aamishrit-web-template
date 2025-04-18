"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Shop nav-menu-item */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-[16px] font-medium text-[#4A2C17] hover:text-[#8B5A2B] transition-colors">
            Shop
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-[#6B4226] rounded-lg shadow-xl border border-[#A9855C]">
            <ul className="flex flex-col gap-3 px-4 py-3 w-[220px] text-[#EBDDC9]">
              <ListItem href="/products" title="All Products" />
              <ListItem href="/category/jaggery" title="Organic Jaggery" />
              <ListItem href="/category/cookies" title="Millet Cookies" />
              <ListItem href="/category/herbal-tea" title="Herbal Tea" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none rounded-md px-3 py-2 transition-colors duration-200 ease-in-out hover:bg-[#8B5A2B] hover:text-[#FDF7F0] text-sm font-medium tracking-wide",
            className
          )}
          {...props}
        >
          {title}
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
