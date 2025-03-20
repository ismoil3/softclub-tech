"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Linkedin, Globe, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

// Sample team data - replace with your actual team data
const teamMembers = [
  {
    id: 1,
    name: "Nurulloh Sulaymonov",
    role: "Backend Developer",
    description:
      "Зиёда аз 8 сол таҷрибаи корӣ ба ҳайси омӯзгори C# дар SoftClub\nШуруъ аз моҳи январи соли 2024 дар\nширкати RIO ба ҳайси Бэкенд\nбарномасоз то ниҳояти корӣ фаъолият\nдорад",
    image: "/nrullo.png",
    logo: "/placeholder.svg?height=40&width=120",
    skills: ["C#", ".NET", "SQL", "Azure"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/najibulloh-shamsudinov",
      website: "https://najibulloh.dev",
      email: "najibulloh@example.com",
    },
  },
  {
    id: 2,
    name: "Zohir Kabirov",
    role: "Backend Developer",
    description:
      "Зиёда аз 6 сол таҷрибаи корӣ ба ҳайси омузгори C# дар SoftClub Шуруъ аз моҳи январи соли 2024 дар ширкати RIO ба ҳайси Бэкенд барномасоз то инҷониб кору фаъолият доранд",
    image: "/zohir.png",
    logo: "/placeholder.svg?height=40&width=120",
    skills: ["C#", ".NET", "SQL", "Azure"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/alex-johnson",
      website: "https://alexjohnson.design",
      email: "alex@example.com",
    },
  },
  {
    id: 3,
    name: "Rasul Safarovich",
    role: "Full Stack Developer",
    description:
      "5+ years experience as a Full Stack Developer\nJoined TechCorp in March 2022\nExpert in React, Node.js and cloud infrastructure\nLeads the mobile application development team",
    image: "/rasul.png",
    logo: "/placeholder.svg?height=40&width=120",
    skills: ["React", "Node.js", "AWS", "TypeScript"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/maria-rodriguez",
      website: "https://mariadev.com",
      email: "maria@example.com",
    },
  },
];

const TeamSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-rotate team members
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay]);

  const handleNext = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    setTimeout(() => setAutoplay(true), 8000);
  };

  const handlePrev = () => {
    setAutoplay(false);
    setCurrentIndex(
      (prev) => (prev - 1 + teamMembers.length) % teamMembers.length
    );
    setTimeout(() => setAutoplay(true), 8000);
  };

  // Get previous and next indices for the side cards
  const prevIndex =
    (currentIndex - 1 + teamMembers.length) % teamMembers.length;
  const nextIndex = (currentIndex + 1) % teamMembers.length;

  // Avoid rendering with wrong theme
  if (!mounted) return null;

  return (
    <div className="w-full min-h-screen transition-colors duration-500 flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden dark:bg-gray-950">
      {/* Header Text */}
      <div className="text-center mb-8 md:mb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block mb-4 px-3 py-1 md:px-4 md:py-1.5 bg-emerald-100/50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-400 rounded-full text-xs md:text-sm font-medium">
            {t("team.badge")}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">
            {t("team.title")}
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("team.description")}
          </p>
        </motion.div>
      </div>

      {/* Slider Container */}
      <div className="relative w-full max-w-6xl flex items-center justify-center z-10">
        {/* Previous Card - Only visible on medium screens and above */}
        <motion.div
          className="absolute left-0 transform -translate-x-3/4 opacity-40 scale-75 hidden lg:block"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <TeamMemberCard member={teamMembers[prevIndex]} isActive={false} />
        </motion.div>

        {/* Main Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="w-full max-w-sm md:max-w-lg lg:max-w-2xl z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.2 },
            }}
            onHoverStart={() => {
              setIsHovered(true);
              setAutoplay(false);
            }}
            onHoverEnd={() => {
              setIsHovered(false);
              setAutoplay(true);
            }}
          >
            <TeamMemberCard
              member={teamMembers[currentIndex]}
              isActive={true}
            />
          </motion.div>
        </AnimatePresence>

        {/* Next Card - Only visible on medium screens and above */}
        <motion.div
          className="absolute right-0 transform translate-x-3/4 opacity-40 scale-75 hidden lg:block"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <TeamMemberCard member={teamMembers[nextIndex]} isActive={false} />
        </motion.div>

        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-1 md:left-4 lg:-left-12 z-20 bg-white/80 hover:bg-white/90 dark:bg-slate-700/30 dark:hover:bg-slate-700/50 text-indigo-600 dark:text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center backdrop-blur-sm shadow-md"
          onClick={handlePrev}
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          <span className="sr-only">Previous</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 md:right-4 lg:-right-12 z-20 bg-white/80 hover:bg-white/90 dark:bg-slate-700/30 dark:hover:bg-slate-700/50 text-indigo-600 dark:text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center backdrop-blur-sm shadow-md"
          onClick={handleNext}
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          <span className="sr-only">Next</span>
        </Button>
      </div>

      {/* Navigation Dots */}
      <div className="flex space-x-2 md:space-x-3 mt-6 md:mt-10 relative z-10">
        {teamMembers.map((_, index) => (
          <button
            key={index}
            className={`transition-all duration-300 ${
              index === currentIndex
                ? "w-6 md:w-8 h-2 md:h-3 bg-indigo-600 dark:bg-white rounded-full"
                : "w-2 md:w-3 h-2 md:h-3 bg-indigo-300 dark:bg-white/40 rounded-full hover:bg-indigo-400 dark:hover:bg-white/60"
            }`}
            onClick={() => {
              setCurrentIndex(index);
              setAutoplay(false);
              setTimeout(() => setAutoplay(true), 8000);
            }}
            aria-label={`View team member ${index + 1}`}
          />
        ))}
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-40 md:w-64 h-40 md:h-64 rounded-full bg-indigo-200/50 dark:bg-white/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-48 md:w-80 h-48 md:h-80 rounded-full bg-sky-200/50 dark:bg-white/5 blur-3xl"></div>
        <div className="absolute top-3/4 left-1/3 w-24 md:w-40 h-24 md:h-40 rounded-full bg-purple-200/30 dark:bg-white/5 blur-3xl"></div>
      </div>
    </div>
  );
};

const TeamMemberCard = ({ member, isActive }) => {
  return (
    <Card
      className={`overflow-hidden rounded-xl md:rounded-3xl shadow-xl bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 transition-all duration-300 ${
        isActive ? "shadow-2xl" : "shadow-lg"
      }`}
    >
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Photo */}
          <div className="h-60 md:h-auto md:w-[300px] relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-sky-500/20 dark:from-blue-800/30 dark:to-indigo-900/30 mix-blend-multiply z-10"></div>
            <img
              src={member.image || "/placeholder.svg"}
              alt={`Photo of ${member.name}`}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Right side - Info */}
          <div className="p-4 md:p-6 lg:p-8 flex flex-col justify-between md:w-[400px]">
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1 text-indigo-700 dark:text-white">
                {member.name}
              </h2>

              <p className="text-xs md:text-sm font-medium uppercase tracking-wider mb-2 md:mb-4 text-indigo-500 dark:text-blue-300">
                {member.role}
              </p>

              <div className="text-xs md:text-sm mb-4 md:mb-6 whitespace-pre-line text-gray-700 dark:text-gray-300">
                {member.description}
              </div>

              {/* Skills */}
              <div className="mb-4 md:mb-6">
                <h3 className="text-xs md:text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Key Skills
                </h3>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {member.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs md:text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto">
              {/* Social Links */}
              <div className="flex gap-3 mb-3 md:mb-4">
                <a
                  href={member.socialLinks.linkedin}
                  className="text-gray-400 hover:text-indigo-600 dark:hover:text-blue-300 transition-colors"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin size={16} className="md:w-[18px] md:h-[18px]" />
                </a>
                <a
                  href={member.socialLinks.website}
                  className="text-gray-400 hover:text-indigo-600 dark:hover:text-blue-300 transition-colors"
                  aria-label="Personal website"
                >
                  <Globe size={16} className="md:w-[18px] md:h-[18px]" />
                </a>
                <a
                  href={`mailto:${member.socialLinks.email}`}
                  className="text-gray-400 hover:text-indigo-600 dark:hover:text-blue-300 transition-colors"
                  aria-label="Email"
                >
                  <Mail size={16} className="md:w-[18px] md:h-[18px]" />
                </a>
              </div>

              {/* Company Logo */}
              <img
                src={member.logo || "/placeholder.svg"}
                alt="Company Logo"
                className="h-6 md:h-8"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamSlider;
