"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import ResponsiveContainer from "./responsive-container"
import RedirectHandler from "./redirect-handler"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const pathname = usePathname()

  const GOOGLE_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSczSzMGIAd-sE_nxe9wOFSrsYy59lzRBhU9e5uhOjMtmIquLQ/viewform"

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open or redirecting
  useEffect(() => {
    if (isOpen || isRedirecting) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen, isRedirecting])

  // Check if current path is active
  const isActive = (path: string) => {
    return pathname === path
  }

  // Handle Join Now click
  const handleJoinNowClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsRedirecting(true)
    setIsOpen(false) // Close mobile menu if open
  }

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const menuItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/potw", label: "POTW" },
    { href: "/gallery", label: "Gallery" },
    { href: "/events", label: "Events" },
    { href: "/team", label: "Team" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <>
      {/* Redirect Handler */}
      <RedirectHandler
        isRedirecting={isRedirecting}
        targetUrl={GOOGLE_FORM_URL}
        onComplete={() => setIsRedirecting(false)}
      />

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform origin-left scale-x-0 transition-transform duration-300 z-50" />

      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-500 ease-in-out safe-area-inset-top ${
          scrolled
            ? "bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 py-2 shadow-2xl"
            : "bg-transparent py-4"
        }`}
      >
        <ResponsiveContainer size="full" padding="md">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <Image
                  src="/images/logo.png"
                  alt="IRIS Society Logo"
                  width={scrolled ? 32 : 40}
                  height={scrolled ? 32 : 40}
                  className="transition-all duration-500 ease-in-out rounded-full ring-2 ring-blue-500/30"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-bold text-white transition-all duration-500 ${
                    scrolled ? "text-lg" : "text-xl"
                  } tracking-tight`}
                >
                  IRIS Society
                </span>
                <span
                  className={`text-blue-300 transition-all duration-500 ${
                    scrolled ? "text-xs opacity-80" : "text-sm"
                  } font-medium tracking-wide hidden sm:block`}
                >
                  Photography & Videography Society
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:flex items-center space-x-1"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <Link
                    href={link.href}
                    className={`nav-link ${
                      isActive(link.href)
                        ? "text-white bg-blue-600/20 shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {/* Active indicator */}
                    {isActive(link.href) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-20"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-lg transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="ml-3"
              >
                <button
                  onClick={handleJoinNowClick}
                  className={`btn-nav-cta ${scrolled ? "btn-nav-cta-scrolled" : ""}`}
                  disabled={isRedirecting}
                >
                  <span className="relative z-10">{isRedirecting ? "Redirecting..." : "Join Now"}</span>
                </button>
              </motion.div>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:hidden relative p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transition-all duration-300"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              disabled={isRedirecting}
            >
              <div className="w-6 h-6 relative">
                <motion.div
                  animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute w-6 h-0.5 bg-white rounded-full"
                />
                <motion.div
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute w-6 h-0.5 bg-white rounded-full top-2"
                />
                <motion.div
                  animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute w-6 h-0.5 bg-white rounded-full top-4"
                />
              </div>
            </motion.button>
          </div>
        </ResponsiveContainer>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && !isRedirecting && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="lg:hidden bg-slate-900/98 backdrop-blur-xl border-t border-slate-700/50 overflow-hidden safe-area-inset-bottom"
            >
              <ResponsiveContainer size="full" padding="md" className="py-6">
                <div className="flex flex-col space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      variants={menuItemVariants}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={`mobile-nav-link ${
                          isActive(link.href)
                            ? "text-white bg-blue-600/20 border-l-4 border-blue-500"
                            : "text-gray-300 hover:text-white hover:bg-white/10 hover:border-l-4 hover:border-blue-400"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Mobile CTA Button */}
                  <motion.div
                    variants={menuItemVariants}
                    transition={{ duration: 0.3, delay: navLinks.length * 0.05 }}
                    className="pt-4 border-t border-slate-700/50"
                  >
                    <button
                      onClick={handleJoinNowClick}
                      className="btn-mobile-cta w-full text-center"
                      disabled={isRedirecting}
                    >
                      {isRedirecting ? "Redirecting..." : "Join IRIS Society"}
                    </button>
                  </motion.div>
                </div>
              </ResponsiveContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}

export default Navbar
export { Navbar }
