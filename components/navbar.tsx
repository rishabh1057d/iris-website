"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, useScroll, useTransform } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { User } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const navRef = useRef(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const { user, isAuthorized, signOut } = useAuth()

  // Transform values for scroll-based animations
  const navOpacity = useTransform(scrollYProgress, [0, 0.05], [0.5, 1])
  const navBlur = useTransform(scrollYProgress, [0, 0.05], [0, 10])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const isActive = (path: string) => {
    return pathname === path ? "active" : ""
  }

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
      <motion.nav
        ref={navRef}
        className={`w-full py-4 px-6 flex justify-between items-center fixed top-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-nav shadow-lg" : "bg-transparent"
        }`}
        style={{
          opacity: navOpacity,
          backdropFilter: `blur(${navBlur}px)`,
        }}
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <motion.div variants={itemVariants} className="magnetic-button">
          <Link href="/" className="text-xl font-bold text-white">
            IRIS Society
          </Link>
        </motion.div>
        <div className="flex items-center space-x-4">
          <motion.div className="flex space-x-4" variants={navVariants}>
            {[
              { path: "/", label: "Home" },
              { path: "/events", label: "Events" },
              { path: "/gallery", label: "Gallery" },
              { path: "/potw", label: "POTW" },
              { path: "/team", label: "Team" },
              { path: "/about", label: "About" },
              { path: "/contact", label: "Contact" },
            ].map((item) => (
              <motion.div key={item.path} variants={itemVariants} className="magnetic-button">
                <Link href={item.path} className={`nav-link ${isActive(item.path)}`}>
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {user ? (
            <div className="relative" ref={userMenuRef}>
              <motion.button
                variants={itemVariants}
                className="flex items-center space-x-2 ml-4"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                {user.user_metadata.avatar_url ? (
                  <Image
                    src={user.user_metadata.avatar_url || "/placeholder.svg"}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <User size={16} />
                  </div>
                )}
              </motion.button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-800 rounded-md shadow-xl z-50">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-sm font-semibold">{user.user_metadata.name || user.email}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                  <Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-700">
                    Dashboard
                  </Link>
                  <button
                    onClick={signOut}
                    className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <motion.div variants={itemVariants} className="magnetic-button">
              <Link href="/auth/signin" className="nav-link">
                Sign in with Google
              </Link>
            </motion.div>
          )}
        </div>
      </motion.nav>
    </>
  )
}
