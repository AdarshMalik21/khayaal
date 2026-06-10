import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Mail, Phone, MapPin, Instagram, Heart, Users, Globe, BookOpen, Menu, X, ChevronDown } from "lucide-react";
import { useRef } from "react";

import founderHeroImg from "@assets/IMG_0470.jpeg";
import creativityImg from "@assets/IMG_0335.jpeg";
import groupArtworkImg from "@assets/IMG_0917.jpeg";
import volunteerTeamImg from "@assets/IMG_1077.jpeg";
import pastInitiativesImg from "@assets/IMG_0801.jpeg";
import childHoldingArtImg from "@assets/IMG_0917.jpeg";

const AnimatedCounter = ({ value, label }: { value: string; label: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="space-y-2 text-center"
    >
      <p className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight">{value}</p>
      <p className="text-primary-foreground/90 font-medium text-base sm:text-lg">{label}</p>
    </motion.div>
  );
};

const PillarCard = ({
  title,
  desc,
  img,
  icon: Icon,
  index,
}: {
  title: string;
  desc: string;
  img: string;
  icon: React.ElementType;
  index: number;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative rounded-3xl overflow-hidden bg-black shadow-2xl cursor-pointer aspect-4/5"
      onClick={() => setExpanded((v) => !v)}
    >
      <img
        src={img}
        alt={title}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${expanded ? "opacity-20 scale-105" : "opacity-70 group-hover:opacity-30 group-hover:scale-105"
          }`}
      />
      <div
        className={`absolute inset-0 p-6 sm:p-8 flex flex-col justify-end transition-opacity duration-500 bg-linear-to-t from-black/90 via-black/40 to-transparent ${expanded ? "opacity-0 pointer-events-none" : "opacity-100 group-hover:opacity-0"
          }`}
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center mb-4 sm:mb-6">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">{title}</h3>
        <div className="flex items-center gap-2 mt-3 text-white/60 text-sm md:hidden">
          <span>Tap to learn more</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      <div
        className={`absolute inset-0 p-6 sm:p-8 flex flex-col justify-center items-center text-center transition-opacity duration-500 bg-primary/90 backdrop-blur-sm ${expanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
      >
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3 sm:mb-4">{title}</h3>
        <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">{desc}</p>
        <Button
          variant="outline"
          className="rounded-full border-white text-foreground bg-white hover:bg-white/90"
          onClick={(e) => e.stopPropagation()}
        >
          Learn More
        </Button>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#what-we-do", label: "Work" },
    { href: "#impact", label: "Impact" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-60 transition-all duration-300 ${isScrolled || menuOpen ? "bg-background/95 backdrop-blur-lg border-b border-border/50 py-3 shadow-sm" : "bg-transparent py-4 sm:py-6"}`}>
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          <a href="#" className={`font-serif text-2xl sm:text-3xl font-bold transition-colors ${isScrolled || menuOpen ? "text-foreground" : "text-white"}`}>
            Khayaal
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-foreground/80" : "text-white/90"}`}>{link.label}</a>
            ))}
            <Button asChild className="rounded-full px-6 bg-primary hover:bg-primary/90 text-white border-none shadow-md">
              <a href="#contact">Join Us</a>
            </Button>
          </div>
          <button
            type="button"
            className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled || menuOpen ? "text-foreground" : "text-white"}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {menuOpen && <button type="button" aria-label="Close mobile navigation" className="fixed inset-0 z-50 md:hidden bg-black/20 backdrop-blur-[1px]" onClick={() => setMenuOpen(false)} />}
        <motion.div
          initial={false}
          animate={menuOpen ? { height: "auto", opacity: 1, y: 0 } : { height: 0, opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden absolute left-0 right-0 top-full z-60 overflow-hidden bg-background border-b border-border/50 shadow-lg"
        >
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4 relative z-60">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors py-2 border-b border-border/30 last:border-0" onClick={() => setMenuOpen(false)}>{link.label}</a>
            ))}
            <Button asChild className="rounded-full mt-2 bg-primary hover:bg-primary/90 text-white" onClick={() => setMenuOpen(false)}>
              <a href="#contact">Join Us</a>
            </Button>
          </div>
        </motion.div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-dvh h-full flex items-center justify-center pt-16 sm:pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          <motion.div style={{ y }} className="w-full h-full opacity-70">
            <img src={founderHeroImg} alt="Founder with children" className="w-full h-full object-cover object-center" />
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/20"></div>
          <div className="absolute top-1/4 right-0 w-64 sm:w-125 h-64 sm:h-125 bg-primary/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
        </div>
        <div className="container relative z-10 px-4 sm:px-6 text-center mt-8 pb-48 sm:pb-56">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-medium tracking-wide mb-5 sm:mb-6 uppercase">
              A Youth-Led Movement
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.05] mb-4 sm:mb-6 font-medium">
              Beyond Access <br />to Education.
            </motion.h1>
            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-lg sm:text-2xl md:text-4xl font-serif italic text-primary/90 mb-6 sm:mb-8 px-2">
              Towards Confidence, Capability, and Real Learning.
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-base sm:text-lg md:text-xl text-white/80 font-sans max-w-2xl mb-8 sm:mb-12 leading-relaxed px-2">
              Khayaal means a thought. And sometimes, the beginning of change. We bridge the gap between mere attendance and meaningful, confident learning.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center">
              <Button asChild size="lg" className="w-full sm:w-auto rounded-full px-8 text-base bg-primary hover:bg-primary/90 text-white border-none shadow-xl shadow-primary/20 h-12 sm:h-14 transition-all hover:scale-105">
                <a href="#get-involved">Join Our Mission</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 text-base bg-white/5 hover:bg-white/10 text-white border-white/30 backdrop-blur-sm h-12 sm:h-14 transition-all hover:scale-105">
                <a href="#contact">Become a Volunteer</a>
              </Button>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-background/95 backdrop-blur-md border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              <div className="text-center px-2"><p className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-primary">500+</p><p className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium mt-1">Volunteers</p></div>
              <div className="text-center px-2"><p className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-primary">300+</p><p className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium mt-1">Active Youth</p></div>
              <div className="text-center px-2 flex flex-col justify-center"><p className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-foreground">Multiple Cities</p><p className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium mt-1">Across India</p></div>
              <div className="text-center px-2 flex flex-col justify-center"><p className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-foreground">Since 2018</p><p className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium mt-1">Youth-Led</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 sm:py-24 md:py-32 lg:py-40 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-100 sm:h-150 bg-accent/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="container px-4 sm:px-6 mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1 }} className="relative order-2 lg:order-1">
              <div className="aspect-4/5 sm:aspect-3/4 rounded-3xl overflow-hidden shadow-2xl relative z-10 border-4 border-white">
                <img src={childHoldingArtImg} alt="Child holding art" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -inset-4 sm:-inset-6 bg-accent rounded-3xl z-0 transform -rotate-3 sm:-translate-x-4 sm:translate-y-4"></div>
              <div className="absolute -bottom-6 -right-6 w-24 sm:w-32 h-24 sm:h-32 bg-primary rounded-full blur-[60px] opacity-60 z-0"></div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.2 }} className="order-1 lg:order-2">
              <p className="text-primary font-bold tracking-widest uppercase mb-3 sm:mb-4 text-xs sm:text-sm">About Khayaal</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 sm:mb-8 text-foreground leading-tight">A Thought That Became a Movement.</h2>
              <div className="space-y-4 sm:space-y-6 text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed">
                <p>Access to education does not always equal meaningful learning. Too often, children pass through classrooms without ever discovering their own voice, their own potential, or their own confidence.</p>
                <p className="font-medium text-foreground">Khayaal bridges this critical gap.</p>
                <p>We believe education should build more than attendance. Through learning, creativity, mentorship, and community action, we're building a generation of young people who believe in their own capabilities.</p>
              </div>
              <div className="mt-8 sm:mt-10">
                <Button className="rounded-full px-8 h-12 sm:h-14 bg-foreground hover:bg-foreground/90 text-background">Read Our Story</Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section id="what-we-do" className="py-16 sm:py-24 md:py-32 bg-[#FFF3EC] relative">
        <div className="container px-4 sm:px-6 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
            <p className="text-primary font-bold tracking-widest uppercase mb-3 sm:mb-4 text-xs sm:text-sm">What We Do</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 sm:mb-6 text-foreground">The Architecture of Confidence</h2>
            <p className="text-base sm:text-xl text-muted-foreground">We focus on three core pillars to transform the educational experience from passive attendance to active engagement.</p>
            <p className="text-sm text-muted-foreground/70 mt-2 md:hidden">Tap any card to learn more.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            <PillarCard title="Holistic Learning & Communication" desc="Building strong foundations in Spoken English, Confidence, Mentorship, and Critical Thinking. We empower students to articulate their thoughts clearly and engage with the world confidently." img={childHoldingArtImg} icon={BookOpen} index={0} />
            <PillarCard title="Creativity & Personality Development" desc="Expressive development through Art, Theatre, Dance, Storytelling, Poetry, and Public Speaking. Creativity isn't an extracurricular—it's the core of self-discovery." img={creativityImg} icon={Heart} index={1} />
            <PillarCard title="Youth Engagement & Leadership" desc="Mobilizing Student Volunteers through Campaigns, Workshops, and Advocacy. We create platforms for young people to lead, organize, and drive tangible community impact." img={volunteerTeamImg} icon={Users} index={2} />
          </div>
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="py-16 sm:py-24 md:py-32 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={groupArtworkImg} alt="Impact background" className="w-full h-full object-cover grayscale opacity-20 mix-blend-multiply" />
          <div className="absolute inset-0 bg-primary/90"></div>
        </div>
        <div className="container relative z-10 px-4 sm:px-6 mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-white mb-4 sm:mb-6">The Power of Collective Action</h2>
            <p className="text-base sm:text-xl text-white/80 max-w-2xl mx-auto">Numbers only tell half the story, but they represent thousands of lives touched and communities strengthened.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 text-center text-white">
            <AnimatedCounter value="500+" label="Volunteers & Interns" />
            <AnimatedCounter value="300+" label="Active Youth Contributors" />
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-2 text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight mt-3">Multiple Cities</p>
              <p className="text-primary-foreground/90 font-medium text-sm sm:text-base md:text-lg">Across India</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-2 text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight mt-3">CSR Partners</p>
              <p className="text-primary-foreground/90 font-medium text-sm sm:text-base">Yes Securities, Haus & Kinder</p>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 sm:mt-20 text-center">
            <p className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight mb-2">University Collaborations</p>
            <p className="text-primary-foreground/90 font-medium text-base sm:text-lg">Spanning across leading institutions in India</p>
          </motion.div>
        </div>
      </section>

      {/* COVID-19 Response */}
      <section className="py-16 sm:py-24 md:py-32 bg-background">
        <div className="container px-4 sm:px-6 mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold mb-4 sm:mb-6 text-foreground">When Communities Needed Support Most</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">During the devastating second wave of COVID-19, Khayaal's volunteer network mobilized overnight. We didn't wait for permission; we acted with dignity, urgency, and compassion.</p>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-accent"></div>
            <div className="space-y-8 sm:space-y-12 py-4">
              {["Arranged hospital beds and ICU admissions when the system was overwhelmed.", "Procured and distributed life-saving oxygen cylinders and concentrators.", "Sourced essential medicines and coordinated emergency ambulance services.", "Provided verified, real-time emergency resources to thousands of families."].map((text, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative pl-12 sm:pl-16">
                  <div className="absolute left-2.25 sm:left-3.5 top-2 w-5 h-5 rounded-full bg-primary ring-4 ring-background shrink-0"></div>
                  <p className="text-base sm:text-xl md:text-2xl font-serif text-foreground leading-relaxed">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Past Initiatives */}
      <section className="py-16 sm:py-24 md:py-32 bg-accent/30 relative">
        <div className="container px-4 sm:px-6 mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-10 sm:mb-16 gap-4 sm:gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-3 sm:mb-6 text-foreground">Initiatives of Impact</h2>
              <p className="text-base sm:text-lg text-muted-foreground">Tangible actions that address immediate needs while building long-term resilience.</p>
            </div>
            <Button variant="outline" className="rounded-full rounded-tr-none px-6 self-start sm:self-auto shrink-0">View All Campaigns <ArrowRight className="ml-2 w-4 h-4" /></Button>
          </div>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl border border-border/50">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 sm:mb-8 text-primary"><BookOpen className="w-6 h-6 sm:w-7 sm:h-7" /></div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold mb-3 sm:mb-4">Back To School Initiative</h3>
              <p className="text-muted-foreground text-base sm:text-lg mb-6 sm:mb-8">Distributing comprehensive educational kits and stationery to ensure children have the physical tools they need to learn confidently.</p>
              <img src={pastInitiativesImg} alt="Initiative" className="w-full h-40 sm:h-48 object-cover rounded-2xl" />
            </motion.div>
            <div className="space-y-5 sm:space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-primary text-primary-foreground rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg">
                <h3 className="text-xl sm:text-2xl font-serif font-bold mb-2">Clothing Drives</h3>
                <p className="text-primary-foreground/80 text-base sm:text-lg mb-3 sm:mb-4">Dignified distribution of essentials to marginalized communities.</p>
                <p className="text-3xl sm:text-4xl font-serif font-bold">4,000+ <span className="text-lg sm:text-xl font-sans font-normal opacity-80">items distributed</span></p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-card rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg border border-border/50">
                <h3 className="text-xl sm:text-2xl font-serif font-bold mb-2">Winter Relief</h3>
                <p className="text-muted-foreground text-base sm:text-lg mb-3 sm:mb-4">Protecting vulnerable populations during harsh winters.</p>
                <p className="text-3xl sm:text-4xl font-serif font-bold text-primary">2,000+ <span className="text-lg sm:text-xl font-sans font-normal text-muted-foreground">blankets distributed</span></p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="bg-card rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg border border-border/50 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold mb-2">Community Outreach</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">Active programs spanning multiple Indian cities.</p>
                </div>
                <Globe className="w-10 h-10 sm:w-12 sm:h-12 text-primary/30 shrink-0" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 sm:py-32 md:py-48 bg-foreground overflow-hidden flex flex-col items-center justify-center text-center px-4 sm:px-6 relative">
        <p className="text-primary font-bold tracking-widest uppercase mb-8 sm:mb-12 text-xs sm:text-sm z-10 relative">Why Khayaal Matters</p>
        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold leading-[1.1] max-w-6xl text-background z-10 relative">Education should build more than attendance.</h2>
        <div className="mt-10 sm:mt-16 flex flex-wrap justify-center gap-3 sm:gap-6 md:gap-12 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif italic text-background/40 z-10 relative">
          {["Confidence.", "Communication.", "Creativity.", "Opportunity.", "Self-Belief."].map((word, i) => (
            <motion.span key={word} whileHover={{ color: "hsl(335 87% 66%)", scale: 1.05 }} className={`cursor-default transition-colors duration-300 ${i === 4 ? "text-primary" : ""}`}>{word}</motion.span>
          ))}
        </div>
      </section>

      {/* Founder */}
      <section className="py-16 sm:py-24 md:py-32 bg-background relative overflow-hidden">
        <div className="container px-4 sm:px-6 mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 sm:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-5 relative">
              <div className="aspect-3/4 rounded-3xl overflow-hidden shadow-2xl relative z-10">
                <img src={founderHeroImg} alt="Sharmishtha Singh" className="w-full h-full object-cover object-center" />
              </div>
              <div className="absolute -inset-3 sm:-inset-4 border-2 border-primary rounded-3xl z-0 transform translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4"></div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-7 lg:pl-12">
              <div className="mb-6 sm:mb-10">
                <h2 className="text-3xl sm:text-5xl font-serif font-bold mb-2 sm:mb-3 text-foreground">Sharmishtha Singh</h2>
                <p className="text-base sm:text-xl text-primary font-medium tracking-wide">Founder, Khayaal Foundation</p>
                <div className="h-1 w-16 sm:w-20 bg-primary/30 mt-4 sm:mt-6 rounded-full"></div>
              </div>
              <blockquote className="text-xl sm:text-2xl md:text-4xl font-serif italic leading-relaxed text-foreground mb-6 sm:mb-8 relative">
                <span className="hidden sm:block absolute -top-10 -left-6 text-8xl text-primary/10 font-sans">"</span>
                Education should not only help children pass through classrooms, but it should help them imagine bigger lives for themselves.
              </blockquote>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">Founded at the age of 17, Sharmishtha built Khayaal on the belief that young people possess the immense power to transform their own communities when given the tools, platform, and confidence to do so.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-24 md:py-32 bg-accent/20">
        <div className="container px-4 sm:px-6 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 sm:mb-6 text-foreground">Built By Young People. <span className="text-primary block sm:inline">Powered By Collective Action.</span></h2>
            <p className="text-base sm:text-xl text-muted-foreground">Our community of 300+ volunteers across India proves that empathy, when organized, is an unstoppable force.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <img src={volunteerTeamImg} alt="Volunteer" className="w-full h-48 sm:h-64 object-cover rounded-2xl shadow-lg" />
              <img src={groupArtworkImg} alt="Group" className="w-full h-48 sm:h-64 object-cover rounded-2xl shadow-lg mt-6 sm:mt-8" />
            </div>
            <div className="md:pl-12 space-y-4 sm:space-y-6">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">Who We Are</h3>
              <p className="text-base sm:text-lg text-muted-foreground">We are high school students, university scholars, young educators, designers, creators, and professionals. We dedicate our time, skills, and hearts to ensuring every child feels seen and capable.</p>
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-8">
                {["Students", "Educators", "Designers", "Mentors", "Creators", "Professionals"].map((role) => (
                  <span key={role} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-background border border-border rounded-full text-xs sm:text-sm font-medium text-foreground shadow-sm">{role}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved & Contact */}
      <section id="contact" className="py-16 sm:py-24 md:py-32 bg-background">
        <div className="container px-4 sm:px-6 mx-auto">
          <div id="get-involved" className="text-center mb-10 sm:mb-16 scroll-mt-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-3 sm:mb-4">Find Your Place Here</h2>
            <p className="text-base sm:text-lg text-muted-foreground">There are many ways to support the Khayaal movement.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-32 max-w-5xl mx-auto">
            {[
              { title: "Volunteer", desc: "Join our on-ground teams and work directly with children.", cta: "Apply Now", variant: "default" as const },
              { title: "Partner", desc: "Collaborate with us for CSR or institutional initiatives.", cta: "Partner with Us", variant: "outline" as const },
              { title: "Sponsor", desc: "Fund a child's educational kit or a community campaign.", cta: "Donate", variant: "outline" as const },
              { title: "Host a Workshop", desc: "Share your skills in art, tech, or communication.", cta: "Propose Workshop", variant: "outline" as const },
              { title: "Campus Ambassador", desc: "Lead the Khayaal movement in your university.", cta: "Become Ambassador", variant: "outline" as const },
            ].map((item) => (
              <div key={item.title} className="bg-card p-6 sm:p-8 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow text-center">
                <h3 className="text-lg sm:text-xl font-bold font-serif mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-muted-foreground mb-5 sm:mb-6 text-sm">{item.desc}</p>
                <Button variant={item.variant} className="w-full rounded-full">{item.cta}</Button>
              </div>
            ))}
            <div className="bg-primary text-primary-foreground p-6 sm:p-8 rounded-3xl shadow-lg text-center flex flex-col justify-center">
              <h3 className="text-xl sm:text-2xl font-bold font-serif mb-2 sm:mb-3">Create Change</h3>
              <p className="text-primary-foreground/90 text-sm">Every small action contributes to a larger shift.</p>
            </div>
          </div>
          <div className="bg-[#FFF3EC] rounded-3xl sm:rounded-[40px] p-6 sm:p-10 md:p-16 lg:p-20">
            <div className="grid lg:grid-cols-2 gap-10 sm:gap-16">
              <div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 sm:mb-6 text-foreground leading-tight">Let's Create Meaningful Change Together.</h2>
                <p className="text-base sm:text-xl text-muted-foreground mb-8 sm:mb-12">Reach out to us to start a conversation. We're always looking for passionate individuals and forward-thinking organizations.</p>
                <div className="space-y-4 sm:space-y-6">
                  <a href="mailto:teamkhayaal@gmail.com" className="flex items-center gap-3 sm:gap-4 hover:text-primary transition-colors group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform shrink-0"><Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" /></div>
                    <span className="font-medium text-foreground break-all">teamkhayaal@gmail.com</span>
                  </a>
                  <a href="tel:+919161834999" className="flex items-center gap-3 sm:gap-4 hover:text-primary transition-colors group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform shrink-0"><Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary" /></div>
                    <span className="font-medium text-foreground">+91 91618 34999</span>
                  </a>
                  <a href="https://instagram.com/campaignsbykhayaal" target="_blank" rel="noreferrer" className="flex items-center gap-3 sm:gap-4 hover:text-primary transition-colors group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform shrink-0"><Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-primary" /></div>
                    <span className="font-medium text-foreground">@campaignsbykhayaal</span>
                  </a>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0"><MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" /></div>
                    <span className="font-medium text-foreground">Operating across India</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl">
                <h3 className="text-xl sm:text-2xl font-serif font-bold mb-5 sm:mb-6">Send us a message</h3>
                <form className="space-y-4 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-2"><label className="text-sm font-medium text-foreground">First Name</label><Input placeholder="Jane" className="bg-accent/20 border-border/50 h-11 sm:h-12 rounded-xl" /></div>
                    <div className="space-y-2"><label className="text-sm font-medium text-foreground">Last Name</label><Input placeholder="Doe" className="bg-accent/20 border-border/50 h-11 sm:h-12 rounded-xl" /></div>
                  </div>
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Email Address</label><Input type="email" placeholder="jane@example.com" className="bg-accent/20 border-border/50 h-11 sm:h-12 rounded-xl" /></div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">How would you like to get involved?</label>
                    <select defaultValue="" className="flex h-11 sm:h-12 w-full items-center justify-between rounded-xl border border-border/50 bg-accent/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="" disabled>Select an option</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="partner">Partner</option>
                      <option value="sponsor">Sponsor/Donate</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Message</label><Textarea placeholder="Tell us a bit about yourself..." className="bg-accent/20 border-border/50 min-h-25 sm:min-h-30 rounded-xl resize-none" /></div>
                  <Button type="submit" className="w-full h-12 sm:h-14 rounded-xl text-base sm:text-lg font-medium shadow-md hover:shadow-lg transition-all">Send Message</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background pt-16 sm:pt-24 pb-10 sm:pb-12 rounded-t-3xl sm:rounded-t-[40px] -mt-6 sm:-mt-10 relative z-20">
        <div className="container px-4 sm:px-6 mx-auto">
          <div className="grid md:grid-cols-12 gap-10 sm:gap-12 lg:gap-24 mb-12 sm:mb-16">
            <div className="md:col-span-5">
              <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">khayaal.</h3>
              <p className="text-background/70 italic text-lg sm:text-xl font-serif max-w-md mb-6 sm:mb-8">(n.) — a thought. And sometimes, the beginning of change.</p>
              <div className="flex gap-3 sm:gap-4">
                <a href="https://instagram.com/campaignsbykhayaal" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="mailto:teamkhayaal@gmail.com" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
              </div>
            </div>
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
              <div>
                <h4 className="font-bold mb-4 sm:mb-6 text-white tracking-wide uppercase text-xs sm:text-sm">Navigation</h4>
                <ul className="space-y-3 sm:space-y-4 text-background/60 font-medium text-sm sm:text-base">
                  <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
                  <li><a href="#what-we-do" className="hover:text-primary transition-colors">What We Do</a></li>
                  <li><a href="#impact" className="hover:text-primary transition-colors">Our Impact</a></li>
                  <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 sm:mb-6 text-white tracking-wide uppercase text-xs sm:text-sm">Get Involved</h4>
                <ul className="space-y-3 sm:space-y-4 text-background/60 font-medium text-sm sm:text-base">
                  <li><a href="#" className="hover:text-primary transition-colors">Volunteer</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Partner</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Donate</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <h4 className="font-bold mb-4 sm:mb-6 text-white tracking-wide uppercase text-xs sm:text-sm">Legal</h4>
                <ul className="space-y-3 sm:space-y-4 text-background/60 font-medium text-sm sm:text-base">
                  <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-background/10 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-background/50 font-medium">
            <p>© {new Date().getFullYear()} Khayaal Foundation. All rights reserved.</p>
            <p className="flex items-center gap-1">Made with <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-primary mx-1" fill="currentColor" /> in India.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
