"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { TestimonialsSection } from "@/components/blocks/testimonials-with-marquee";
import { SmokeBackground } from "@/components/ui/spooky-smoke-animation";
import { GradientButton } from "@/components/ui/gradient-button";

const ShaderBackground = dynamic(
  () => import("@/components/ui/background-paper-shaders").then((m) => m.ShaderBackground),
  { ssr: false }
);
import {
  Globe,
  CalendarCheck,
  PhoneCall,
  Bot,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Check,
  Menu,
  X,
  Zap,
  Brain,
  TrendingUp,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

/* ─── Fade-up animation wrapper ─── */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Nav ─── */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["Services", "How It Works", "Testimonials", "Contact"];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-3 shadow-lg shadow-black/20" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-DEFAULT to-teal-light flex items-center justify-center teal-glow group-hover:teal-glow-strong transition-all">
            <div className="w-3 h-3 rounded-full bg-navy-deeper" />
          </div>
          <span className="text-display text-xl font-semibold tracking-wide text-white">
            Neptune
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm text-white/60 hover:text-teal-light transition-colors duration-200 tracking-wide"
            >
              {l}
            </a>
          ))}
        </div>

        {/* CTA */}
        <GradientButton asChild className="hidden md:inline-flex min-w-0 px-5 py-2.5 rounded-full text-sm gap-2">
          <a href="#contact">
            Get Started
            <ChevronRight size={15} />
          </a>
        </GradientButton>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/70 hover:text-teal-light transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden glass border-t border-white/5"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setOpen(false)}
                  className="text-white/70 hover:text-teal-light py-3 border-b border-white/5 text-sm transition-colors"
                >
                  {l}
                </a>
              ))}
              <GradientButton asChild className="mt-3 min-w-0 w-full rounded-full text-sm">
                <a href="#contact" onClick={() => setOpen(false)}>
                  Get Started
                </a>
              </GradientButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-deeper">
      {/* Full-bleed sparkles */}
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.6}
          particleDensity={80}
          className="w-full h-full"
          particleColor="#2CA5A5"
          speed={0.8}
        />
      </div>

      {/* Radial gradient vignette */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,#1B2A4A80,transparent)]" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_50%_at_50%_110%,#0B122190,transparent)]" />

      {/* Horizontal glow line */}
      <motion.div
        style={{ y }}
        className="absolute top-1/2 inset-x-0 z-[2] pointer-events-none"
      >
        <div className="relative h-px mx-auto max-w-3xl">
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-teal-DEFAULT/60 to-transparent h-[1px]" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-teal-DEFAULT/40 to-transparent h-[3px] blur-sm" />
          <div className="absolute inset-x-40 top-0 bg-gradient-to-r from-transparent via-teal-light to-transparent h-[1px]" />
          <div className="absolute inset-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-DEFAULT/10 to-transparent" />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light text-teal-light text-xs font-medium tracking-widest uppercase mb-8"
        >
          <Zap size={11} className="text-teal-DEFAULT" />
          AI-Powered Business Software
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-display text-white leading-[0.95] font-light"
          style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}
        >
          <span className="block">Neptune</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-6 text-white/60 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto"
        >
          AI-Powered Software for Modern Business.
          <br />
          <span className="text-white/40 text-base">
            Built for SMBs ready to scale intelligently.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <GradientButton asChild className="min-w-0 px-8 rounded-full gap-2.5">
            <a href="#contact">
              Start Your Project
              <ArrowRight size={16} />
            </a>
          </GradientButton>
          <GradientButton asChild variant="variant" className="min-w-0 px-8 rounded-full gap-2.5">
            <a href="#services">
              Explore Services
            </a>
          </GradientButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 grid grid-cols-3 gap-6 max-w-lg mx-auto"
        >
          {[
            { val: "50+", label: "Clients Served" },
            { val: "98%", label: "Satisfaction Rate" },
            { val: "3×", label: "Avg ROI Boost" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-display text-2xl md:text-3xl text-teal-light font-semibold">
                {s.val}
              </div>
              <div className="text-xs text-white/40 mt-1 tracking-wide">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-navy-deeper to-transparent z-10 pointer-events-none" />

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-teal-DEFAULT/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}

/* ─── Services ─── */
const SERVICES = [
  {
    icon: Globe,
    title: "Custom Websites",
    desc: "Blazing-fast, conversion-optimised websites crafted for your brand — no templates, no compromise.",
    color: "#2CA5A5",
  },
  {
    icon: CalendarCheck,
    title: "Booking Systems",
    desc: "Fully automated scheduling that reduces no-shows, syncs calendars, and sends smart reminders.",
    color: "#3DC8C8",
  },
  {
    icon: PhoneCall,
    title: "AI Receptionist",
    desc: "A 24/7 voice AI that handles calls, answers FAQs, qualifies leads, and books appointments automatically.",
    color: "#2CA5A5",
  },
  {
    icon: Bot,
    title: "AI Chatbots",
    desc: "Intelligent chat agents embedded in your site — trained on your business to convert visitors into customers.",
    color: "#3DC8C8",
  },
  {
    icon: LayoutDashboard,
    title: "CRM Systems",
    desc: "Custom relationship management pipelines built around how you actually work, not generic workflows.",
    color: "#2CA5A5",
  },
  {
    icon: ShieldCheck,
    title: "Compliance Bots",
    desc: "Automated compliance monitoring and document processing so your team focuses on what matters.",
    color: "#3DC8C8",
  },
  {
    icon: Sparkles,
    title: "Custom Solutions",
    desc: "Have a unique challenge? We architect bespoke AI solutions from the ground up for your exact needs.",
    color: "#2CA5A5",
  },
];

function Services() {
  return (
    <section id="services" className="relative py-32 bg-navy-deeper overflow-hidden">
      {/* bg decoration */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-DEFAULT/30 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-teal-DEFAULT/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="text-center mb-20">
          <p className="text-teal-DEFAULT text-xs font-medium tracking-[0.3em] uppercase mb-4">
            What We Build
          </p>
          <h2 className="text-display text-white font-light" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
            Every tool your business needs
            <br />
            <em className="text-white/40">to work smarter.</em>
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-6">
          {SERVICES.map((s, i) => (
            <FadeUp key={s.title} delay={i * 0.07} className={i === 6 ? "lg:col-span-3 lg:max-w-md lg:mx-auto" : ""}>
              <div className="group relative glass rounded-2xl p-7 hover:border-teal-DEFAULT/30 transition-all duration-500 hover:-translate-y-1 cursor-default overflow-hidden">
                {/* hover glow bg */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-DEFAULT/0 to-teal-DEFAULT/0 group-hover:from-teal-DEFAULT/5 group-hover:to-transparent rounded-2xl transition-all duration-500" />

                <div
                  className="relative w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}
                >
                  <s.icon size={20} style={{ color: s.color }} strokeWidth={1.5} />
                </div>

                <h3 className="relative text-white font-medium text-lg mb-2.5 tracking-tight">
                  {s.title}
                </h3>
                <p className="relative text-white/50 text-sm leading-relaxed">{s.desc}</p>

                <div className="relative mt-5 flex items-center gap-1.5 text-teal-DEFAULT text-xs font-medium opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  Learn more <ChevronRight size={13} />
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ─── */
function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: Brain,
      title: "Discovery & Strategy",
      desc: "We map your business processes, identify high-impact automation opportunities, and design a tailored solution roadmap.",
    },
    {
      num: "02",
      icon: Zap,
      title: "Build & Integrate",
      desc: "Our team builds your custom software, integrates with your existing tools, and tests against real-world scenarios.",
    },
    {
      num: "03",
      icon: TrendingUp,
      title: "Launch & Scale",
      desc: "We deploy, train your team, and continuously optimise — your system gets smarter and more effective over time.",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-32 bg-navy-dark overflow-hidden">
      {/* Smoke background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <SmokeBackground smokeColor="#2CA5A5" />
      </div>
      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 z-[1] bg-navy-dark/60" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent z-[2]" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-DEFAULT/20 to-transparent z-[2]" />

      <div className="relative z-[3] max-w-7xl mx-auto px-6">
        <FadeUp className="text-center mb-20">
          <p className="text-teal-DEFAULT text-xs font-medium tracking-[0.3em] uppercase mb-4">
            The Process
          </p>
          <h2 className="text-display text-white font-light" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
            From idea to impact
            <br />
            <em className="text-white/40">in three steps.</em>
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* connector line */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-teal-DEFAULT/30 to-transparent" />

          {steps.map((step, i) => (
            <FadeUp key={step.num} delay={i * 0.15}>
              <div className="relative text-center">
                <div className="relative inline-flex flex-col items-center">
                  {/* Number */}
                  <div className="text-display text-[5rem] font-light leading-none text-teal-DEFAULT/10 select-none absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none">
                    {step.num}
                  </div>

                  {/* Icon circle */}
                  <div className="relative z-10 w-20 h-20 rounded-full glass border border-teal-DEFAULT/25 flex items-center justify-center mb-6 teal-glow">
                    <step.icon size={28} className="text-teal-light" strokeWidth={1.5} />
                  </div>
                </div>

                <h3 className="text-white font-medium text-xl mb-3 tracking-tight">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
const TESTIMONIALS = [
  {
    author: {
      name: "Sarah M.",
      handle: "@sarahm_spa",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    text: "Neptune built us an AI receptionist that now handles 80% of our inbound calls. We haven't missed a booking since.",
  },
  {
    author: {
      name: "James T.",
      handle: "@jamest_legal",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    text: "The custom CRM they delivered replaced three separate tools we were paying for. Clean, fast, and built exactly for how we work.",
  },
  {
    author: {
      name: "Elena P.",
      handle: "@elenap_fit",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    text: "Their AI chatbot converts visitors we'd otherwise lose. Our online revenue is up 40% in the first quarter.",
  },
  {
    author: {
      name: "Marcus W.",
      handle: "@marcusw_biz",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    text: "The booking system they built cut our admin time in half. Clients love the automated reminders — no-shows are down 70%.",
  },
  {
    author: {
      name: "Priya K.",
      handle: "@priyak_clinic",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    },
    text: "Our compliance bot runs 24/7 and flags issues before they become problems. Neptune delivered exactly what we needed.",
  },
  {
    author: {
      name: "Tom R.",
      handle: "@tomr_agency",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
    text: "Best tech investment we've made. The custom website and chatbot combo doubled our lead conversion within two months.",
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-navy-deeper overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-DEFAULT/20 to-transparent" />
      <TestimonialsSection
        title="Results that speak for themselves."
        description="Join 50+ businesses already running on Neptune."
        testimonials={TESTIMONIALS}
      />
    </section>
  );
}

/* ─── CTA ─── */
function CTA() {
  return (
    <section className="relative py-32 bg-navy-dark overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-DEFAULT/20 to-transparent" />

      {/* Shader background */}
      <div className="absolute inset-0 z-0">
        <ShaderBackground color1="#0B1221" color2="#1B2A4A" color3="#2CA5A5" />
      </div>
      {/* Overlay keeps text readable */}
      <div className="absolute inset-0 z-[1] bg-navy-deeper/40" />

      <div className="relative z-[2] max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light text-teal-light text-xs font-medium tracking-widest uppercase mb-8">
            <Sparkles size={11} />
            Limited Spots Available
          </div>
          <h2
            className="text-display text-white font-light mb-6"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
          >
            Ready to transform
            <br />
            <em className="shimmer-text">your business?</em>
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Join 50+ businesses already running on Neptune. Let&apos;s build something that works as
            hard as you do.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GradientButton asChild className="min-w-0 px-8 rounded-full gap-2.5">
              <a href="#contact">
                Book a Free Consultation
                <ArrowRight size={16} />
              </a>
            </GradientButton>
            <a
              href="mailto:hello@neptune.studio"
              className="flex items-center gap-2 text-white/60 hover:text-teal-light text-sm transition-colors"
            >
              <Mail size={15} />
              hello@neptune.studio
            </a>
          </div>

          {/* Trust signals */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-white/30 text-xs">
            {["No long-term contracts", "Setup in days, not months", "Dedicated support included"].map(
              (t) => (
                <span key={t} className="flex items-center gap-2">
                  <Check size={12} className="text-teal-DEFAULT" />
                  {t}
                </span>
              )
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── Contact ─── */
function Contact() {
  return (
    <section id="contact" className="relative py-32 bg-navy-deeper overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        <FadeUp>
          <p className="text-teal-DEFAULT text-xs font-medium tracking-[0.3em] uppercase mb-4">
            Get In Touch
          </p>
          <h2
            className="text-display text-white font-light mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Let&apos;s build something
            <br />
            <em className="text-white/40">extraordinary.</em>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-sm">
            Tell us about your business and we&apos;ll craft a tailored proposal within 24 hours.
          </p>

          <div className="flex flex-col gap-5">
            {[
              { icon: Mail, label: "hello@neptune.studio" },
              { icon: Phone, label: "+1 (555) 000-0000" },
              { icon: MapPin, label: "Remote — working globally" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-sm text-white/50">
                <div className="w-9 h-9 rounded-lg glass flex items-center justify-center flex-shrink-0">
                  <Icon size={15} className="text-teal-DEFAULT" />
                </div>
                {label}
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <form className="glass rounded-2xl p-8 flex flex-col gap-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-white/50 text-xs tracking-wide">First Name</label>
                <input
                  type="text"
                  placeholder="Alex"
                  className="bg-white/5 border border-white/10 focus:border-teal-DEFAULT/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-white/50 text-xs tracking-wide">Last Name</label>
                <input
                  type="text"
                  placeholder="Johnson"
                  className="bg-white/5 border border-white/10 focus:border-teal-DEFAULT/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-white/50 text-xs tracking-wide">Business Email</label>
              <input
                type="email"
                placeholder="alex@company.com"
                className="bg-white/5 border border-white/10 focus:border-teal-DEFAULT/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-white/50 text-xs tracking-wide">What do you need?</label>
              <select className="bg-white/5 border border-white/10 focus:border-teal-DEFAULT/50 rounded-xl px-4 py-3 text-sm text-white/70 outline-none transition-colors appearance-none cursor-pointer">
                <option value="" className="bg-navy-darker">Select a service…</option>
                <option value="website" className="bg-navy-dark">Custom Website</option>
                <option value="booking" className="bg-navy-dark">Booking System</option>
                <option value="ai-receptionist" className="bg-navy-dark">AI Receptionist</option>
                <option value="chatbot" className="bg-navy-dark">AI Chatbot</option>
                <option value="crm" className="bg-navy-dark">CRM System</option>
                <option value="compliance" className="bg-navy-dark">Compliance Bot</option>
                <option value="custom" className="bg-navy-dark">Custom Solution</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-white/50 text-xs tracking-wide">Tell us about your project</label>
              <textarea
                rows={4}
                placeholder="Describe your business challenge…"
                className="bg-white/5 border border-white/10 focus:border-teal-DEFAULT/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors resize-none"
              />
            </div>
            <GradientButton type="submit" className="mt-1 w-full min-w-0 rounded-xl gap-2.5">
              Send Message
              <ArrowRight size={15} />
            </GradientButton>
          </form>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="relative bg-navy-deeper border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-DEFAULT to-teal-light flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-navy-deeper" />
          </div>
          <span className="text-display text-lg font-semibold text-white tracking-wide">Neptune</span>
        </div>
        <div className="flex gap-6 text-white/40 text-xs">
          {["Services", "About", "Privacy", "Terms"].map((l) => (
            <a key={l} href="#" className="hover:text-teal-light transition-colors">
              {l}
            </a>
          ))}
        </div>
        <p className="text-white/25 text-xs">© 2025 Neptune. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
    </main>
  );
}
