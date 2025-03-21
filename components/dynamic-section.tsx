"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import {
  ChevronDown,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TeamMemberCard from "@/components/team";
import BentoDemo from "./bento-demo";
// Add utility classes for extra small screens
const xsScreenStyles = {
  fontSize: {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
  },
  padding: {
    xs: "p-2",
    sm: "p-3",
    md: "p-4",
    lg: "p-5",
    xl: "p-6",
  },
  margin: {
    xs: "m-2",
    sm: "m-3",
    md: "m-4",
    lg: "m-5",
    xl: "m-6",
  },
};

// New Glassmorphism Card component for cleaner code
const GlassCard = ({ children, className = "", ...props }) => (
  <div
    className={`backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-2xl ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default function DynamicSection() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [scrollData, setScrollData] = useState({
    isFullWidth: false,
    scrollProgress: 0,
    isVisible: false,
  });
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  const sectionRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    setTheme("dark");
  }, []);

  useEffect(() => {
    if (!mounted) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setScrollData((prev) => ({
          ...prev,
          isVisible: entry.isIntersecting,
        }));
      },
      { threshold: 0.1 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observerRef.current.observe(currentSection);
    }

    return () => {
      if (currentSection && observerRef.current) {
        observerRef.current.unobserve(currentSection);
      }
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const element = document.getElementById("dynamicSection");
      if (element) {
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const progress = Math.max(
          0,
          Math.min(1, 1 - rect.top / viewportHeight)
        );
        const shouldBeFullWidth =
          rect.top < viewportHeight * 0.2 && rect.bottom > 0;

        // if (shouldBeFullWidth !== scrollData.isFullWidth) {
        //   shouldBeFullWidth ? setTheme("dark") : setTheme("light");
        // }

        setScrollData((prev) => ({
          ...prev,
          isFullWidth: shouldBeFullWidth,
          scrollProgress: progress,
        }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollData.isFullWidth, setTheme, mounted]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({ name: "", email: "", subject: "", message: "" });
    // Show success message or other feedback
  };

  const { isFullWidth } = scrollData;

  // Return a loading state or null during SSR
  if (!mounted) {
    return (
      <>
        {/* Скрытые SEO-элементы для поисковых систем */}
        <div style={{ display: "none" }}>
          <h1>{t("meta.title")}</h1>
          <p>{t("meta.description")}</p>
        </div>

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-zinc-900 dark:via-black dark:to-zinc-800">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">{t("loading")}</p>
          </div>
        </div>
      </>
    );
  }

  // Generate company cards based on translation
  const companyCards = [
    {
      title: t("cards.card1.title"),
      content: t("cards.card1.content"),
      icon: "💼",
      color: "from-blue-600 to-indigo-800",
    },
    {
      title: t("cards.card2.title"),
      content: t("cards.card2.content"),
      icon: "👥",
      color: "from-emerald-600 to-teal-800",
    },
    {
      title: t("cards.card3.title"),
      content: t("cards.card3.content"),
      icon: "🧠",
      color: "from-violet-600 to-purple-800",
    },
    {
      title: t("cards.card4.title"),
      content: t("cards.card4.content"),
      icon: "🚀",
      color: "from-amber-600 to-orange-800",
    },
    {
      title: t("cards.card5.title"),
      content: t("cards.card5.content"),
      icon: "⏱️",
      color: "from-cyan-600 to-blue-800",
    },
    {
      title: t("cards.card6.title"),
      content: t("cards.card6.content"),
      icon: "🛠️",
      color: "from-rose-600 to-pink-800",
    },
  ];

  // Generate products based on translation
  const products = [
    {
      title: t("products.items.paymentApp.title"),
      description: t("products.items.paymentApp.description"),
      color: "from-emerald-500 to-green-700",
      image:
        "https://framerusercontent.com/images/cwVX0uHUqRshfVZbBUryRFAbHMs.png",
      link: "#",
      size: "large",
    },
    {
      title: t("products.items.onlineAcademy.title"),
      description: t("products.items.onlineAcademy.description"),
      color: "from-sky-500 to-blue-700",
      link: "https://online.omuz.tj/",
      size: "small",
    },
    {
      title: t("products.items.preparation.title"),
      description: t("products.items.preparation.description"),
      color: "from-indigo-500 to-violet-700",
      link: "https://intellect-with-lang.vercel.app/",
      size: "small",
    },
    {
      title: t("products.items.onlineMenu.title"),
      description: t("products.items.onlineMenu.description"),
      color: "from-amber-500 to-orange-700",
      image: "/merveFoto.png",
      link: "https://merve.softclub.tj/",
      size: "medium",
    },
    {
      title: t("products.items.itAcademy.title"),
      description: t("products.items.itAcademy.description"),
      color: "from-fuchsia-500 to-purple-700",
      link: "https://softclub.tj/",
      size: "small",
      image: "/softclubFoto.png",
    },
  ];

  return (
    <div className="transition-colors  duration-500">
      {/* Hero Section with 3D layered design */}
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-zinc-900 dark:via-black dark:to-zinc-800">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Radial gradient backdrop */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-emerald-500/5 dark:to-emerald-400/10"></div>

          {/* Abstract geometric shapes */}
          <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-500/10 blur-3xl dark:from-emerald-400/10 dark:to-teal-500/5"></div>
          <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-gradient-to-tr from-blue-400/10 to-indigo-500/10 blur-3xl dark:from-blue-400/5 dark:to-indigo-500/5"></div>

          {/* Animated particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-emerald-400/30 dark:bg-emerald-400/20"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${
                    3 + Math.random() * 7
                  }s ease-in-out infinite ${Math.random() * 5}s`,
                }}
              ></div>
            ))}
          </div>

          {/* Honeycomb pattern overlay */}
          <div className="absolute inset-0 bg-[url('/honeycomb.svg')] bg-center opacity-5 dark:opacity-10"></div>

          {/* Gradient fade at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-50 to-transparent dark:from-zinc-900 dark:to-transparent"></div>
        </div>

        {/* Hero content with 3D effect */}
        <div className="relative z-10 container mx-auto px-4 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            {/* Animated badge with glow effect */}
            <div className="mb-6 inline-block">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative px-4 py-1.5 bg-white/30 dark:bg-white/10 backdrop-blur-sm text-gray-800 dark:text-gray-200 text-sm font-medium rounded-full border border-gray-200/50 dark:border-white/10 shadow-sm"
              >
                <span className="relative z-10">{t("hero.badge")}</span>
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-400/20 animate-pulse"></span>
              </motion.span>
            </div>

            {/* 3D text effect with perspective */}
            <div className="perspective-1000 mb-6">
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight transform-style-3d">
                <span className="block transform transition-transform hover:rotate-y-10 duration-500">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-300">
                    {t("hero.title")}
                  </span>
                </span>
              </h1>
            </div>

            {/* Description with staggered animation */}
            <motion.p
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {t("hero.description")}
            </motion.p>
          </motion.div>

          {/* Interactive button with enhanced effects */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <button
              onClick={() =>
                document
                  .getElementById("dynamicSection")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="group relative flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-full font-medium transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Button background animation */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-500"></span>

              {/* Button content */}
              <span className="relative z-10 flex items-center gap-2">
                <span>{t("hero.button")}</span>
                <ChevronDown size={18} className="group-hover:animate-bounce" />
              </span>

              {/* Button glow effect */}
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 shadow-[0_0_15px_5px_rgba(16,185,129,0.5)] transition-opacity duration-500"></span>
            </button>
          </motion.div>

          {/* 3D floating cards with enhanced animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative max-w-4xl mx-auto h-64 md:h-96"
          >
            {/* Card 1 with reflection effect */}
            <motion.div
              className="absolute top-0 left-1/4 w-36 h-20 sm:w-48 sm:h-24 md:w-64 md:h-32 rounded-xl shadow-xl overflow-hidden"
              animate={{
                y: [0, -10, 0],
                rotate: [-2, 0, -2],
                scale: [1, 1.02, 1],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 5,
                ease: "easeInOut",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-zinc-800 dark:to-zinc-900"></div>
              <div className="absolute inset-0 bg-[url('/card-pattern.svg')] bg-no-repeat bg-cover opacity-10"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-600/5"></div>
              <div className="relative h-full w-full p-4 flex flex-col justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs shadow-md">
                    SC
                  </div>
                  <div className="text-xs font-medium">
                    {t("products.badge")}
                  </div>
                </div>
                <div className="text-sm font-medium">
                  {t("products.items.paymentApp.title")}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent dark:from-white/5"></div>
            </motion.div>

            {/* Card 2 with reflection effect */}
            <motion.div
              className="absolute top-10 right-1/4 w-36 h-20 sm:w-48 sm:h-24 md:w-64 md:h-32 rounded-xl shadow-xl overflow-hidden"
              animate={{
                y: [0, 10, 0],
                rotate: [2, 0, 2],
                scale: [1, 1.02, 1],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 4,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-zinc-800 dark:to-zinc-900"></div>
              <div className="absolute inset-0 bg-[url('/card-pattern.svg')] bg-no-repeat bg-cover opacity-10"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-600/5"></div>
              <div className="relative h-full w-full p-4 flex flex-col justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs shadow-md">
                    SC
                  </div>
                  <div className="text-xs font-medium">
                    {t("products.badge")}
                  </div>
                </div>
                <div className="text-sm font-medium">
                  {t("products.items.itAcademy.title")}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent dark:from-white/5"></div>
            </motion.div>

            {/* Card 3 with reflection effect */}
            <motion.div
              className="absolute bottom-0 left-1/3 w-36 h-20 sm:w-48 sm:h-24 md:w-64 md:h-32 rounded-xl shadow-xl overflow-hidden"
              animate={{
                y: [0, -15, 0],
                rotate: [-1, 1, -1],
                scale: [1, 1.03, 1],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 6,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-zinc-800 dark:to-zinc-900"></div>
              <div className="absolute inset-0 bg-[url('/card-pattern.svg')] bg-no-repeat bg-cover opacity-10"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-600/5"></div>
              <div className="relative h-full w-full p-4 flex flex-col justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-xs shadow-md">
                    SC
                  </div>
                  <div className="text-xs font-medium">
                    {t("products.badge")}
                  </div>
                </div>
                <div className="text-sm font-medium">
                  {t("products.items.onlineMenu.title")}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent dark:from-white/5"></div>
            </motion.div>

            {/* New fourth card with ring animation */}
            <motion.div
              className="absolute bottom-16 right-1/3 w-36 h-20 sm:w-48 sm:h-24 md:w-64 md:h-32 rounded-xl shadow-xl overflow-hidden"
              animate={{
                y: [0, 8, 0],
                rotate: [1, -1, 1],
                scale: [1, 1.02, 1],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 5.5,
                ease: "easeInOut",
                delay: 0.7,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-zinc-800 dark:to-zinc-900"></div>
              <div className="absolute inset-0 bg-[url('/card-pattern.svg')] bg-no-repeat bg-cover opacity-10"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-600/5"></div>
              <div className="relative h-full w-full p-4 flex flex-col justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-xs shadow-md">
                    SC
                  </div>
                  <div className="text-xs font-medium">
                    {t("products.badge")}
                  </div>
                </div>
                <div className="text-sm font-medium">{t("products.title")}</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent dark:from-white/5"></div>
            </motion.div>

            {/* Circle decoration */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 rounded-full border border-emerald-500/20 dark:border-emerald-400/20 animate-pulse-slow"></div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 rounded-full border border-teal-500/10 dark:border-teal-400/10 animate-pulse-slow delay-1000"></div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 rounded-full border border-blue-500/5 dark:border-blue-400/5 animate-pulse-slow delay-2000"></div>
          </motion.div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
            <span className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Scroll to explore
            </span>
            <div className="w-6 h-10 border-2 border-gray-600 dark:border-gray-400 rounded-full flex justify-center">
              <div className="w-1.5 h-3 bg-gray-600 dark:bg-gray-400 rounded-full mt-2 animate-bounce-slow"></div>
            </div>
          </div>
        </div>

        {/* Add these animations to your global CSS */}
        <style jsx global>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0) rotate(0);
            }
            50% {
              transform: translateY(-20px) rotate(10deg);
            }
          }

          @keyframes pulse-slow {
            0%,
            100% {
              opacity: 0.3;
              transform: scale(1);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.05);
            }
          }

          @keyframes bounce-slow {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(4px);
            }
          }

          .bg-radial-gradient {
            background: radial-gradient(
              circle at center,
              var(--tw-gradient-from) 0%,
              var(--tw-gradient-via) 50%,
              var(--tw-gradient-to) 100%
            );
          }

          .perspective-1000 {
            perspective: 1000px;
          }

          .transform-style-3d {
            transform-style: preserve-3d;
          }

          .rotate-y-10:hover {
            transform: rotateY(10deg);
          }

          .bg-size-200 {
            background-size: 200% 100%;
          }

          .bg-pos-0 {
            background-position: 0% 0%;
          }

          .bg-pos-100 {
            background-position: 100% 0%;
          }

          .delay-1000 {
            animation-delay: 1s;
          }

          .delay-2000 {
            animation-delay: 2s;
          }
        `}</style>
      </div>
      {/* Main section with dynamic width change */}
      <div className="container mx-auto px-4">
        <div
          id="dynamicSection"
          ref={sectionRef}
          className={`relative transition-all duration-700 ease-in-out mx-auto  bg-white dark:bg-[#030712] ${
            isFullWidth
              ? "w-full mx-0 rounded-none border-none"
              : "my-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-2xl"
          }`}
        >
          {/* Main content with sections */}
          <div className="min-h-screen">
            <AnimatePresence mode="wait">
              {/* About Section */}
              {activeSection === "about" && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col lg:flex-row w-full"
                >
                  {/* Left side with image */}
                  <div className="w-full lg:w-1/2 p-6 over lg:sticky lg:top-20 lg:h-screen">
                    <motion.div
                      className="w-full h-full"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-full h-full overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border-0 relative">
                        <div className="absolute inset-0 z-10 p-8 sm:p-12 bg-gradient-to-b from-black/60 via-black/40 to-black/20 flex flex-col justify-between">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                          >
                            <GlassCard className="px-4 py-2 inline-block">
                              <span className="text-white text-sm font-medium">
                                {t("hero.title")}
                              </span>
                            </GlassCard>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                          >
                            <h1
                              className="font-bold leading-tight text-white mb-2"
                              style={{ fontSize: "clamp(20px, 5vw, 3rem)" }}
                            >
                              {t("about.title")}
                            </h1>
                            <p
                              className="text-white/80 md:block sm:hidden xs: max-w-md"
                              style={{ fontSize: "clamp(16px, 3vw, 1.125rem)" }}
                            >
                              {t("about.subtitle")}
                            </p>
                          </motion.div>
                        </div>
                        <div className="w-full h-full">
                          <Image
                            src="/team.png"
                            alt={t("about.title")}
                            width={800}
                            height={600}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            priority
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right side with cards */}
                  <div className="w-full lg:w-1/2 p-6 space-y-6">
                    {companyCards.map((card, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                      >
                        <div className="group bg-gradient-to-br from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 border border-gray-100 dark:border-zinc-700/50">
                          <div className="p-6 sm:p-8">
                            <div className="flex items-start gap-6">
                              <div
                                className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} text-white text-xl sm:text-2xl`}
                              >
                                {card.icon}
                              </div>

                              <div className="flex-1">
                                <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                                  {card.title}
                                </h3>
                                <p
                                  className="text-base text-gray-700 dark:text-gray-300"
                                  dangerouslySetInnerHTML={{
                                    __html: card.content,
                                  }}
                                ></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Products Section */}
          {
            <motion.div
              key="products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12"
              id="prodect"
            >
              <div className="mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-block mb-4 px-4 py-1.5 bg-emerald-100/50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-400 rounded-full text-sm font-medium">
                    {t("products.badge")}
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                    {t("products.title")}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                    {t("products.description")}
                  </p>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
                {products.map((product, index) => {
                  const colSpan =
                    product.size === "large"
                      ? "md:col-span-8"
                      : product.size === "medium"
                      ? "md:col-span-6"
                      : "md:col-span-4";

                  const rowSpan =
                    product.size === "large"
                      ? "md:row-span-2"
                      : product.size === "medium"
                      ? "md:row-span-1"
                      : "md:row-span-1";

                  return (
                    <motion.div
                      key={index}
                      className={`${colSpan} ${rowSpan}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                    >
                      <Link
                        href={product.link}
                        target="_blank"
                        className="block h-full"
                      >
                        <div className="group h-full rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-lg hover:-translate-y-1 relative bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800">
                          {/* Gradient background */}
                          <div
                            className="absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                            style={{
                              backgroundImage: `linear-gradient(to bottom right, ${product.color})`,
                            }}
                          ></div>

                          <div className="p-6 flex flex-col h-full relative z-10">
                            <div className="flex justify-between items-center mb-6">
                              <span
                                className={`text-sm font-medium bg-gradient-to-r ${product.color} bg-clip-text text-transparent`}
                              >
                                {product.link.replace("https://", "")}
                              </span>
                              <ExternalLink
                                className={`w-5 h-5 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300`}
                              />
                            </div>

                            <div>
                              <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                                {product.title}
                              </h3>
                              {product.description && (
                                <p className="text-gray-600 dark:text-gray-300">
                                  {product.description}
                                </p>
                              )}
                            </div>

                            {product.image && (
                              <div className="mt-auto pt-6">
                                <div className="overflow-hidden rounded-xl aspect-video relative">
                                  <Image
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.title}
                                    width={400}
                                    height={225}
                                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          }
        </div>
        <TeamMemberCard />
      </div>
      <BentoDemo />

      {/* Contact Section */}
      <section id="contact" className="py-20 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-900 dark:to-black opacity-50 -z-10"></div>

        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-emerald-300/10 dark:bg-emerald-700/10 blur-3xl -z-10"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-teal-300/10 dark:bg-teal-700/10 blur-3xl -z-10"></div>

        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
            >
              {t("contact.title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              {t("contact.description")}
            </motion.p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-4 sm:p-6 h-full hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-emerald-500/20">
                    <MapPin size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {t("contact.address.title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t("contact.address.line1")}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t("contact.address.line2")}
                  </p>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-4 sm:p-6 h-full hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-emerald-500/20">
                    <Phone size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {t("contact.phone.title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t("contact.phone.number")}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t("contact.phone.hours")}
                  </p>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-4 sm:p-6 h-full hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-emerald-500/20">
                    <Mail size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {t("contact.email.title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t("contact.email.address1")}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t("contact.email.address2")}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <GlassCard className="p-5 sm:p-8 md:p-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {t("contact.form.title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {t("contact.form.description")}
                  </p>
                  <div className="hidden md:block">
                    <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
                      <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                        {t("contact.careers.title")}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {t("contact.careers.description")}
                      </p>
                      <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-full px-6 shadow-md shadow-emerald-600/20 transition-all duration-300">
                        {t("contact.careers.button")}
                      </Button>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("contact.form.name")}
                      className="w-full rounded-xl border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-black/50"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("contact.form.email")}
                      className="w-full rounded-xl border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-black/50"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t("contact.form.subject")}
                      className="w-full rounded-xl border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-black/50"
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t("contact.form.message")}
                      className="w-full rounded-xl border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-black/50 min-h-32"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl px-6 py-3 shadow-md shadow-emerald-600/20 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>{t("contact.form.submit")}</span>
                    <Send size={18} />
                  </Button>
                </form>
              </div>
            </GlassCard>
          </motion.div>

          {/* Mobile-only careers section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-10 md:hidden"
          >
            <GlassCard className="p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
              <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {t("contact.careers.title")}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t("contact.careers.description")}
              </p>
              <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-full px-6 shadow-md shadow-emerald-600/20 transition-all duration-300">
                {t("contact.careers.button")}
              </Button>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-50 dark:bg-zinc-900 py-16 mt-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-10">
              <div className="md:w-1/3">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
                      {t("hero.title")}
                    </span>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t("footer.description")}
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs">
                      📍
                    </span>
                    {t("footer.address")}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs">
                      📧
                    </span>
                    {t("footer.email")}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs">
                      📞
                    </span>
                    {t("footer.phone")}
                  </p>
                </div>
              </div>

              <div className="md:w-2/3 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {t("footer.company.title")}
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="#"
                        className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                      >
                        {t("footer.company.about")}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                      >
                        {t("footer.company.careers")}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                      >
                        {t("footer.company.partners")}
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {t("footer.products.title")}
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="#"
                        className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                      >
                        {t("footer.products.paymentApp")}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                      >
                        {t("footer.products.itAcademy")}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                      >
                        {t("footer.products.onlineMenu")}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                      >
                        {t("footer.products.allProducts")}
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {t("footer.social.title")}
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="#"
                        className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2"
                      >
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        {t("footer.social.instagram")}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2"
                      >
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                        </svg>
                        {t("footer.social.facebook")}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2"
                      >
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                        {t("footer.social.twitter")}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2"
                      >
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                        </svg>
                        {t("footer.social.youtube")}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-zinc-800">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {t("footer.copyright")}
                </p>

                <div className="flex flex-wrap gap-4 md:gap-6 mt-4 md:mt-0">
                  <a
                    href="#"
                    className="text-gray-500 dark:text-gray-400 text-sm hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {t("footer.privacy")}
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 dark:text-gray-400 text-sm hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {t("footer.terms")}
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 dark:text-gray-400 text-sm hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {t("footer.legal")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
