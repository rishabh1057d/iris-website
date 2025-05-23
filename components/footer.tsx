"use client"

import { useRef } from "react"
import Link from "next/link"
import { Facebook, Instagram, Linkedin } from "lucide-react"
import { motion, useInView } from "framer-motion"

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)
  const isFooterInView = useInView(footerRef, { once: true, margin: "-100px 0px" })

  return (
    <motion.footer
      ref={footerRef}
      className="w-full py-6 px-6 mt-auto border-t border-gray-800 relative z-20 bg-gradient-to-b from-transparent to-black/50"
      initial={{ opacity: 0, y: 20 }}
      animate={isFooterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center">
        <p className="text-gray-300 mb-1">Made with Love by Rishabh and Kaustubh</p>
        <p className="text-gray-400 text-sm">© 2025 IRIS Society. All rights reserved.</p>
        <motion.div
          className="flex justify-center space-x-4 mt-3"
          initial={{ opacity: 0 }}
          animate={isFooterInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div whileHover={{ scale: 1.2, rotate: 5 }} transition={{ duration: 0.2 }}>
            <Link href="#" aria-label="Facebook">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2, rotate: 5 }} transition={{ duration: 0.2 }}>
            <Link href="#" aria-label="Instagram">
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2, rotate: 5 }} transition={{ duration: 0.2 }}>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  )
}
