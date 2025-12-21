import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"

import { Button } from "@/components/ui/button"

type Theme = "light" | "dark" | "system"

export function ModeToggle() {
  const [theme, setTheme] = React.useState<Theme>("system")

  React.useEffect(() => {
    // Initialize state from local storage on mount
    const stored = localStorage.getItem("theme") as Theme | null
    if (stored === "light" || stored === "dark") {
      setTheme(stored)
    } else {
      setTheme("system")
    }
  }, [])

  React.useEffect(() => {
    const root = document.documentElement
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const applyTheme = () => {
      if (theme === "system") {
        root.classList.toggle("dark", mediaQuery.matches)
      } else {
        root.classList.toggle("dark", theme === "dark")
      }
    }

    applyTheme()

    if (theme === "system") {
      mediaQuery.addEventListener("change", applyTheme)
      localStorage.removeItem("theme")
    } else {
      mediaQuery.removeEventListener("change", applyTheme)
      localStorage.setItem("theme", theme)
    }

    return () => mediaQuery.removeEventListener("change", applyTheme)
  }, [theme])

  const cycleTheme = () => {
    setTheme((prev) => {
      if (prev === "light") return "dark"
      if (prev === "dark") return "system"
      return "light"
    })
  }

  return (
    <Button variant="outline" size="icon" onClick={cycleTheme}>
      <Sun 
        className={`h-[1.2rem] w-[1.2rem] transition-all ${
          theme === 'light' ? 'scale-100 rotate-0' : 'scale-0 -rotate-90 absolute'
        }`} 
      />
      <Moon 
        className={`h-[1.2rem] w-[1.2rem] transition-all ${
          theme === 'dark' ? 'scale-100 rotate-0' : 'scale-0 rotate-90 absolute'
        }`} 
      />
      <Monitor 
        className={`h-[1.2rem] w-[1.2rem] transition-all ${
          theme === 'system' ? 'scale-100 rotate-0' : 'scale-0 rotate-90 absolute'
        }`} 
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}