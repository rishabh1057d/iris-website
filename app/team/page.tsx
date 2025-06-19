"use client"

import { useState, useRef } from "react"
import Navbar from "@/components/navbar"
import Link from "next/link"
import { ChevronDown, ChevronUp, Linkedin } from "lucide-react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import ResponsiveImage from "@/components/responsive-image"

// Team member type
type TeamMember = {
  id: number
  name: string
  role: string
  description: string
  image: string
  linkedin?: string
}

export default function Team() {
  const [showPreviousMembers, setShowPreviousMembers] = useState(false)

  const titleRef = useRef<HTMLHeadingElement>(null)
  const leadershipRef = useRef<HTMLDivElement>(null)
  const coreTeamRef = useRef<HTMLHeadingElement>(null)
  const webDevRef = useRef<HTMLHeadingElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  const isTitleInView = useInView(titleRef, { once: true })
  const isLeadershipInView = useInView(leadershipRef, { once: true })
  const isCoreTeamInView = useInView(coreTeamRef, { once: true })
  const isWebDevInView = useInView(webDevRef, { once: true })
  const isButtonInView = useInView(buttonRef, { once: true })

  // Current leadership team
  const leadershipTeam: TeamMember[] = [
    {
      id: 1,
      name: "Anshi Jain",
      role: "Secretary",
      description: "Leads the society with a vision for creative excellence.",
      image: "/placeholder.svg?height=300&width=250",
    },
    {
      id: 2,
      name: "Mannu Yadav",
      role: "Deputy Secretary",
      description: "Assists in managing events and member engagements.",
      image: "/placeholder.svg?height=300&width=250",
    },
  ]

  // Current core team members
  const coreTeam: TeamMember[] = [
    {
      id: 1,
      name: "Rishabh Singh",
      role: "Multimedia Head",
      description: "Manages all multimedia content for the society.",
      image: "/placeholder.svg?height=300&width=250",
    },
    {
      id: 2,
      name: "Kaustubh",
      role: "Design Head",
      description: "Leads the design team and creates visual content.",
      image: "/images/meh.jpg",
    },
    {
      id: 3,
      name: "Khadija Hussain",
      role: "Outreach Head",
      description: "Handles external communications and partnerships.",
      image: "/placeholder.svg?height=300&width=250",
    },
    {
      id: 4,
      name: "Varchaswa Shukla",
      role: "PR Head",
      description: "Manages public relations and society's image.",
      image: "/placeholder.svg?height=300&width=250",
    },
    {
      id: 5,
      name: "Swapnil Acharya",
      role: "Outreach",
      description: "Works on expanding the society's reach and impact.",
      image: "/images/swapnil-acharya.jpg",
    },
  ]

  // Web Dev team
  const webDevTeam: TeamMember[] = [
    {
      id: 1,
      name: "Rishabh Singh",
      role: "Web Developer",
      description: "Develops and maintains the society's website.",
      image: "/images/DSC06934.jpg",
      linkedin: "https://www.linkedin.com/in/rishabh-singh-514b8628a/",
    },
  ]

  // Previous leadership team
  const previousLeadershipTeam: TeamMember[] = [
    {
      id: 1,
      name: "Akarsh Gupta",
      role: "Secretary",
      description: "Led the society with a vision for creative excellence.",
      image: "/placeholder.svg?height=300&width=250",
    },
    {
      id: 2,
      name: "Anshi Jain",
      role: "Deputy Secretary",
      description: "Assisted in managing events and member engagements.",
      image: "/placeholder.svg?height=300&width=250",
    },
  ]

  // Previous core team members
  const previousCoreTeam: TeamMember[] = [
    {
      id: 1,
      name: "Akansha Nailwal",
      role: "Outreach",
      description: "Planned and executed all events smoothly.",
      image: "/placeholder.svg?height=300&width=250",
    },
    {
      id: 2,
      name: "Akhilesh",
      role: "Event Coordinator",
      description: "Coordinated various society events.",
      image: "/placeholder.svg?height=300&width=250",
    },
    {
      id: 3,
      name: "Chahat Gupta",
      role: "Content Writer",
      description: "Created engaging content for the society.",
      image: "/placeholder.svg?height=300&width=250",
    },
    {
      id: 4,
      name: "Daksh Sharma",
      role: "Design and Editor",
      description: "Captured and created content for the society.",
      image: "/placeholder.svg?height=300&width=250",
    },
    {
      id: 5,
      name: "Kshitiz Rana",
      role: "Event Management Head",
      description: "Managed all society events.",
      image: "/placeholder.svg?height=300&width=250",
    },
    {
      id: 6,
      name: "Ritik Raghuvanshi",
      role: "Engagement Lead",
      description: "Led member engagement initiatives.",
      image: "/placeholder.svg?height=300&width=250",
    },
    {
      id: 7,
      name: "Sadhana",
      role: "Social Media Manager",
      description: "Managed the society's social media presence.",
      image: "/placeholder.svg?height=300&width=250",
    },
  ]

  // Previous web dev team
  const previousWebDevTeam: TeamMember[] = [
    {
      id: 1,
      name: "Akarsh Gupta",
      role: "Frontend Developer",
      description: "Developed and maintained the society's website.",
      image: "/placeholder.svg?height=300&width=250",
    },
    {
      id: 2,
      name: "Kaustubh",
      role: "Contributor",
      description: "Contributed to the website development.",
      image: "/images/meh.jpg",
    },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  // Render team member card
  const TeamMemberCard = ({ member, isCompact = false }: { member: TeamMember; isCompact?: boolean }) => (
    <motion.div
      className={`team-card bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden p-4 flex flex-col items-center ${
        isCompact ? "max-w-xs mx-auto" : ""
      }`}
      variants={itemVariants}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    >
      <div className={`w-full mb-3 ${isCompact ? "max-w-[200px]" : ""}`}>
        <ResponsiveImage
          src={member.image || "/placeholder.svg"}
          alt={`${member.name} - ${member.role}`}
          width={isCompact ? 200 : 300}
          height={isCompact ? 200 : 300}
          aspectRatio="1/1"
          isTeamMember={true}
          className="rounded-lg"
          sizes={
            isCompact ? "(max-width: 768px) 200px, 200px" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
          }
          priority={false}
          quality={90}
        />
      </div>
      <h3 className={`font-bold mb-1 text-center ${isCompact ? "text-lg" : "text-xl"}`}>{member.name}</h3>
      <p className={`text-blue-300 mb-2 text-center ${isCompact ? "text-sm" : ""}`}>{member.role}</p>
      <p className={`text-gray-400 text-center mb-3 flex-grow ${isCompact ? "text-xs" : "text-sm"}`}>
        {member.description}
      </p>
      <Link
        href={member.linkedin || "#"}
        target={member.linkedin ? "_blank" : "_self"}
        aria-label={`${member.name}'s LinkedIn`}
        className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
      >
        <Linkedin className={`${isCompact ? "w-4 h-4" : "w-5 h-5"}`} />
      </Link>
    </motion.div>
  )

  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <Navbar />
      <div className="pt-24 pb-12 px-6 w-full max-w-6xl mx-auto">
        <motion.h1
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-blue-300"
          initial={{ opacity: 0, y: -20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          Our Team
        </motion.h1>

        {/* Current Leadership Team */}
        <div className="mb-16">
          <motion.h2
            ref={leadershipRef}
            className="text-2xl font-bold mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={isLeadershipInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            Leadership Team
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isLeadershipInView ? "visible" : "hidden"}
          >
            {leadershipTeam.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </motion.div>
        </div>

        {/* Current Core Team */}
        <motion.h2
          ref={coreTeamRef}
          className="text-2xl font-bold mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={isCoreTeamInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          Core Team Members
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isCoreTeamInView ? "visible" : "hidden"}
        >
          {coreTeam.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </motion.div>

        {/* Web Dev Team - Compact Version */}
        <motion.h2
          ref={webDevRef}
          className="text-2xl font-bold mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={isWebDevInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          Web Dev Team
        </motion.h2>
        <motion.div
          className="flex justify-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isWebDevInView ? "visible" : "hidden"}
        >
          {webDevTeam.map((member) => (
            <TeamMemberCard key={member.id} member={member} isCompact={true} />
          ))}
        </motion.div>

        {/* Previous Members Toggle Button */}
        <motion.div
          ref={buttonRef}
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isButtonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.button
            onClick={() => setShowPreviousMembers(!showPreviousMembers)}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-md transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showPreviousMembers ? "Hide Previous Members" : "Show Previous Members"}
            {showPreviousMembers ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </motion.button>
        </motion.div>

        {/* Previous Members Section */}
        <AnimatePresence>
          {showPreviousMembers && (
            <motion.div
              className="border-t border-gray-700 pt-8 mt-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className="text-3xl font-bold mb-12 text-center text-blue-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Previous Members
              </motion.h2>

              {/* Previous Leadership Team */}
              <div className="mb-16">
                <motion.h3
                  className="text-2xl font-bold mb-8 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Leadership Team
                </motion.h3>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delayChildren: 0.4 }}
                >
                  {previousLeadershipTeam.map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
                  ))}
                </motion.div>
              </div>

              {/* Previous Core Team */}
              <motion.h3
                className="text-2xl font-bold mb-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Core Team Members
              </motion.h3>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                transition={{ delayChildren: 0.6 }}
              >
                {previousCoreTeam.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </motion.div>

              {/* Previous Web Dev Team */}
              <motion.h3
                className="text-2xl font-bold mb-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                Web Dev Team
              </motion.h3>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                transition={{ delayChildren: 0.8 }}
              >
                {previousWebDevTeam.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
