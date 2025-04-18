"use client"

import { useEffect, useState } from "react"
import NavigationBar from "."

export default function ScrollNavigation() {
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      const isScrollingDown = prevScrollPos < currentScrollPos
      const isScrollingUp = prevScrollPos > currentScrollPos
      const isAtTop = currentScrollPos < 10

      // Always show navbar when at the top of the page
      if (isAtTop) {
        setVisible(true)
      }
      // Hide when scrolling down, show when scrolling up
      else if (isScrollingDown && visible) {
        setVisible(false)
      } else if (isScrollingUp && !visible) {
        setVisible(true)
      }

      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScrollPos, visible])

  return (
    <div
      className={`fixed w-full z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
        <NavigationBar />
    </div>
  )
}
