"use client"

import { Badge } from "@/components/ui/badge"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CodeTerminal } from "@/components/landing/code-terminal"
import { ParticleNetwork } from "@/components/landing/particle-network"
import { FeatureCard } from "@/components/landing/feature-card"
import { TestimonialCard } from "@/components/landing/testimonial-card"
import { PricingCard } from "@/components/landing/pricing-card"
import { FaqItem } from "@/components/landing/faq-item"
import {
  Code,
  BarChart4,
  CheckCircle,
  Cpu,
  Database,
  Lock,
  Users,
  Zap,
  ChevronRight,
  ArrowRight,
  Star,
  Layers,
  Menu,
  X,
  ArrowDown,
} from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { UserAccountNav } from "@/components/dashboard/user-account-nav"


export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollProgress, setScrollProgress] = useState(0)

  const heroRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLElement>(null)
  const howItWorksRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)
  const pricingRef = useRef<HTMLElement>(null)
  const faqRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)
  const { user, isAuthenticated, loading } = useAuth();

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const scrollHeight = document.body.scrollHeight

      // Calculate scroll progress (0 to 1)
      const progress = scrollPosition / (scrollHeight - windowHeight)
      setScrollProgress(progress)

      // Determine active section
      const sections = [
        { ref: heroRef, id: "hero" },
        { ref: featuresRef, id: "features" },
        { ref: howItWorksRef, id: "how-it-works" },
        { ref: testimonialsRef, id: "testimonials" },
        { ref: pricingRef, id: "pricing" },
        { ref: faqRef, id: "faq" },
        { ref: ctaRef, id: "cta" },
      ]

      for (const section of sections) {
        if (!section.ref.current) continue

        const rect = section.ref.current.getBoundingClientRect()
        if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  if (!mounted) return null

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Header */}
      <header className="fixed top-0 w-full z-40 backdrop-blur-md bg-background/80 border-b border-border/40">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-primary flex items-center"
            >
              <Code className="mr-2 h-6 w-6" />
              <span>DevEval</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex gap-6"
          >
            {[
              { name: "Fonctionnalités", id: "features" },
              { name: "Comment ça marche", id: "how-it-works" },
              { name: "Témoignages", id: "testimonials" },
              { name: "Tarifs", id: "pricing" },
              { name: "FAQ", id: "faq" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors relative ${
                  activeSection === item.id ? "text-primary" : "text-foreground hover:text-primary"
                }`}
              >
                {item.name}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {!user ? (
            // Auth Buttons
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:flex items-center gap-4"
            >
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="hover:bg-primary/10 transition-all duration-300"
                >
                  Connexion
                </Button>
              </Link>
              <Link href="/register">
                <Button className="relative overflow-hidden group">
                  <span className="relative z-10">S'inscrire</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>
            </motion.div>
          ) : (
            <UserAccountNav />
          )}

          
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 bg-background z-30 border-b border-border/40 md:hidden"
          >
            <div className="container py-4 px-4 flex flex-col gap-2">
              {[
                { name: "Fonctionnalités", id: "features" },
                { name: "Comment ça marche", id: "how-it-works" },
                { name: "Témoignages", id: "testimonials" },
                { name: "Tarifs", id: "pricing" },
                { name: "FAQ", id: "faq" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`py-2 text-left text-sm font-medium transition-colors ${
                    activeSection === item.id ? "text-primary" : "text-foreground"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="h-px bg-border my-2" />
              {!user ? (<div className="flex gap-2 pt-2">
                <Link href="/login" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Connexion
                  </Button>
                </Link>
                <Link href="/register" className="flex-1">
                  <Button className="w-full">S'inscrire</Button>
                </Link>
              </div>) : (<UserAccountNav />)}
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section id="hero" ref={heroRef} className="relative w-full py-20 md:py-32 lg:py-35 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <ParticleNetwork />
          </div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col justify-center space-y-4"
              >
                <div className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <span className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
                      Évaluez les compétences techniques avec précision
                    </span>
                  </motion.div>
                  <motion.h1
                    className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <span className="block">Recrutez les</span>
                    <span className="block text-primary">meilleurs développeurs</span>
                    <span className="block">avec confiance</span>
                  </motion.h1>
                  <motion.p
                    className="max-w-[600px] text-muted-foreground md:text-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    Notre plateforme SaaS évalue automatiquement les compétences techniques des développeurs grâce à des
                    tests personnalisés et une analyse de code avancée.
                  </motion.p>
                </div>
                <motion.div
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <Link href="/register">
                    <Button size="lg" className="w-full group relative overflow-hidden">
                      <span className="relative z-10 flex items-center">
                        Commencer gratuitement
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary-foreground opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full hover:bg-primary/10 transition-all duration-300"
                    onClick={() => scrollToSection("how-it-works")}
                  >
                    Voir une démo
                  </Button>
                </motion.div>
                <motion.div
                  className="flex items-center gap-4 pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
                        className={`w-8 h-8 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-xs font-medium`}
                      >
                        {i}
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">+1000</span> développeurs évalués ce mois-ci
                  </p>
                </motion.div>

                {/* Badges */}
                <motion.div
                  className="flex flex-wrap gap-3 pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  {["Évaluation technique", "Tests automatisés", "Analyse de code", "IA", "Rapports détaillés"].map(
                    (badge, index) => (
                      <motion.div
                        key={badge}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground"
                      >
                        {badge}
                      </motion.div>
                    ),
                  )}
                </motion.div>
              </motion.div>
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-border/50 shadow-2xl bg-black/90">
                  <CodeTerminal />
                </div>
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            >
              <span className="text-sm text-muted-foreground mb-2">Découvrir plus</span>
              <ArrowDown className="h-5 w-5 text-primary animate-bounce" />
            </motion.div>
          </div>
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"
            style={{ y }}
          />
        </section>

        {/* Trusted By Section */}
        <section className="w-full py-12 border-y border-border/30 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.h2
                className="text-xl font-medium text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Utilisé par des entreprises de toutes tailles
              </motion.h2>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
                {["TechCorp", "InnovateSoft", "DevGenius", "CodeMasters", "ByteWorks"].map((company, index) => (
                  <motion.div
                    key={company}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-2 text-xl font-bold text-muted-foreground/70"
                  >
                    {index % 2 === 0 ? <Code className="h-5 w-5" /> : <Layers className="h-5 w-5" />}
                    <span>{company}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" ref={featuresRef} className="w-full py-20 md:py-32 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
                  Fonctionnalités puissantes
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Tout ce dont vous avez besoin pour évaluer les talents
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Découvrez comment notre plateforme peut transformer votre processus de recrutement technique
                </p>
              </motion.div>
            </motion.div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Code />}
                title="Tests personnalisés"
                description="Créez des tests sur mesure pour évaluer les compétences spécifiques dont vous avez besoin"
                delay={0.1}
              />
              <FeatureCard
                icon={<Cpu />}
                title="Analyse de code"
                description="Évaluez automatiquement la qualité, la structure et l'efficacité du code soumis"
                delay={0.2}
              />
              <FeatureCard
                icon={<BarChart4 />}
                title="Rapports détaillés"
                description="Obtenez des insights précis sur les compétences des candidats avec des rapports complets"
                delay={0.3}
              />
              <FeatureCard
                icon={<CheckCircle />}
                title="Évaluation objective"
                description="Éliminez les biais dans l'évaluation grâce à des critères standardisés et mesurables"
                delay={0.4}
              />
              <FeatureCard
                icon={<Database />}
                title="Base de données de questions"
                description="Accédez à une vaste bibliothèque de questions techniques prêtes à l'emploi"
                delay={0.5}
              />
              <FeatureCard
                icon={<Lock />}
                title="Sécurité avancée"
                description="Protégez les données sensibles et assurez l'intégrité des évaluations"
                delay={0.6}
              />
            </div>

            {/* Feature Highlight */}
            <motion.div
              className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-500/10 text-blue-500">
                  Fonctionnalité phare
                </div>
                <h3 className="text-2xl font-bold">Analyse de code en temps réel</h3>
                <p className="text-muted-foreground">
                  Notre technologie d'analyse de code utilise l'intelligence artificielle pour évaluer non seulement la
                  fonctionnalité, mais aussi la qualité, la lisibilité et l'efficacité du code soumis par les candidats.
                </p>
                <ul className="space-y-2">
                  {[
                    "Détection automatique des anti-patterns",
                    "Évaluation de la complexité cyclomatique",
                    "Analyse de la performance et de l'optimisation",
                    "Vérification des bonnes pratiques",
                    "Suggestions d'amélioration personnalisées",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <Button className="mt-2 gap-2 group">
                  <span>En savoir plus</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div className="relative bg-background rounded-lg border border-border/50 shadow-xl p-6">
                  <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="ml-2 text-xs text-muted-foreground">code-analysis.js</div>
                  </div>
                  <pre className="p-4 text-sm font-mono text-muted-foreground overflow-auto">
                    <code>{`// Analyse de code avancée
function analyzeCode(submission) {
  const metrics = {
    functionality: testFunctionality(submission),
    complexity: calculateComplexity(submission),
    readability: evaluateReadability(submission),
    performance: benchmarkPerformance(submission),
    bestPractices: checkBestPractices(submission)
  };
  
  return {
    score: calculateOverallScore(metrics),
    feedback: generateFeedback(metrics),
    recommendations: suggestImprovements(metrics)
  };
}`}</code>
                  </pre>
                  <div className="mt-4 p-3 bg-muted rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Résultat de l'analyse</h4>
                      <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">92/100</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Fonctionnalité</span>
                          <span className="text-green-500">100%</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted-foreground/20 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "100%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Complexité</span>
                          <span className="text-green-500">85%</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted-foreground/20 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Performance</span>
                          <span className="text-green-500">90%</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted-foreground/20 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "90%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          ref={howItWorksRef}
          className="w-full py-20 md:py-32 bg-muted/50 relative overflow-hidden"
        >
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
                  Processus simplifié
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Comment ça fonctionne</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Un processus en trois étapes simples pour évaluer les compétences techniques
                </p>
              </div>
            </motion.div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Créez votre test",
                  description:
                    "Sélectionnez les compétences à évaluer et personnalisez votre test selon vos besoins spécifiques.",
                  icon: <Code className="h-10 w-10 text-primary" />,
                  delay: 0.1,
                },
                {
                  step: "02",
                  title: "Invitez les candidats",
                  description: "Envoyez des invitations aux candidats pour qu'ils passent le test à leur convenance.",
                  icon: <Users className="h-10 w-10 text-primary" />,
                  delay: 0.2,
                },
                {
                  step: "03",
                  title: "Analysez les résultats",
                  description: "Recevez des rapports détaillés sur les performances et prenez des décisions éclairées.",
                  icon: <BarChart4 className="h-10 w-10 text-primary" />,
                  delay: 0.3,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 bg-background rounded-xl shadow-sm border border-border/50 relative overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: item.delay }}
                >
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full transition-transform duration-500 group-hover:scale-150"></div>
                  <div className="mb-4 p-3 bg-primary/10 rounded-full relative z-10 group-hover:bg-primary/20 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div className="absolute top-2 right-2 text-4xl font-bold text-primary/10">{item.step}</div>
                  <h3 className="text-xl font-bold mb-2 relative z-10">{item.title}</h3>
                  <p className="text-muted-foreground relative z-10">{item.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Demo Video */}
            <motion.div
              className="mt-20 relative rounded-xl overflow-hidden border border-border shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-video bg-black flex items-center justify-center">
                <div className="text-center p-8">
                  <h3 className="text-2xl font-bold mb-4">Voir DevEval en action</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Découvrez comment notre plateforme peut transformer votre processus de recrutement technique avec
                    cette démonstration interactive.
                  </p>
                  <Button size="lg" className="gap-2">
                    <Play className="h-5 w-5" />
                    <span>Regarder la démo</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" ref={testimonialsRef} className="w-full py-20 md:py-32 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
                  Témoignages
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ce que disent nos clients
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Découvrez comment DevEval a transformé le processus de recrutement de nos clients
                </p>
              </div>
            </motion.div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <TestimonialCard
                quote="DevEval nous a permis de réduire de 40% le temps consacré au recrutement tout en améliorant la qualité de nos embauches."
                name="Sophie Martin"
                role="CTO, TechInnovate"
                delay={0.1}
              />
              <TestimonialCard
                quote="L'analyse de code automatisée nous donne des insights précieux sur les compétences techniques des candidats."
                name="Thomas Dubois"
                role="Lead Developer, CodeMasters"
                delay={0.2}
              />
              <TestimonialCard
                quote="Grâce à DevEval, nous avons pu standardiser notre processus d'évaluation et éliminer les biais inconscients."
                name="Marie Leroy"
                role="HR Director, GlobalTech"
                delay={0.3}
              />
            </div>

            {/* Featured Testimonial */}
            <motion.div
              className="mt-16 bg-muted/30 border border-border rounded-xl p-8 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Star className="h-12 w-12 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xl md:text-2xl font-medium italic mb-6">
                    "DevEval a complètement transformé notre processus de recrutement technique. Nous avons réduit notre
                    temps d'embauche de 60% tout en augmentant la qualité de nos recrutements. La plateforme est
                    intuitive, les tests sont pertinents et les analyses sont précises. Je la recommande à toutes les
                    entreprises qui recrutent des développeurs."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      JD
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Jean Dupont</h4>
                      <p className="text-muted-foreground">VP Engineering, MegaTech</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" ref={pricingRef} className="w-full py-20 md:py-32 bg-muted/30 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
                  Tarifs transparents
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Choisissez le plan qui vous convient
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Des options flexibles pour les entreprises de toutes tailles
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <PricingCard
                title="Starter"
                price="0"
                description="Parfait pour découvrir la plateforme"
                features={[
                  "5 tests par mois",
                  "Bibliothèque de questions limitée",
                  "Rapports de base",
                  "1 utilisateur",
                  "Support par email",
                ]}
                buttonText="Commencer gratuitement"
                buttonVariant="outline"
                delay={0.1}
              />
              <PricingCard
                title="Pro"
                price="99"
                description="Idéal pour les petites équipes"
                features={[
                  "50 tests par mois",
                  "Bibliothèque complète de questions",
                  "Rapports détaillés",
                  "5 utilisateurs",
                  "Support prioritaire",
                  "Tests personnalisés",
                  "Intégration ATS",
                ]}
                buttonText="Essai gratuit de 14 jours"
                buttonVariant="default"
                popular={true}
                delay={0.2}
              />
              <PricingCard
                title="Enterprise"
                price="299"
                description="Pour les grandes organisations"
                features={[
                  "Tests illimités",
                  "Bibliothèque complète + questions sur mesure",
                  "Rapports avancés et API",
                  "Utilisateurs illimités",
                  "Support dédié 24/7",
                  "Tests personnalisés avancés",
                  "Intégrations sur mesure",
                  "Sécurité renforcée",
                ]}
                buttonText="Contacter les ventes"
                buttonVariant="outline"
                delay={0.3}
              />
            </div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-muted-foreground">
                Besoin d'un plan personnalisé ?{" "}
                <Link href="#" className="text-primary hover:underline">
                  Contactez-nous
                </Link>{" "}
                pour discuter de vos besoins spécifiques.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" ref={faqRef} className="w-full py-20 md:py-32 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
                  Questions fréquentes
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Vous avez des questions ?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Voici les réponses aux questions les plus fréquemment posées
                </p>
              </div>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              <FaqItem
                question="Comment fonctionne l'évaluation des compétences techniques ?"
                answer="Notre plateforme utilise une combinaison de tests de code, de QCM et d'exercices pratiques pour évaluer les compétences techniques des candidats. Les résultats sont analysés automatiquement et présentés sous forme de rapports détaillés."
                delay={0.1}
              />
              <FaqItem
                question="Puis-je créer mes propres tests personnalisés ?"
                answer="Oui, tous nos plans permettent de créer des tests personnalisés. Vous pouvez sélectionner des questions dans notre bibliothèque ou créer vos propres questions spécifiques à votre entreprise et à vos besoins."
                delay={0.2}
              />
              <FaqItem
                question="Comment les candidats passent-ils les tests ?"
                answer="Les candidats reçoivent un lien par email pour accéder à leur test. Ils peuvent le passer à leur convenance dans le délai que vous aurez défini. Notre plateforme inclut un environnement de codage en ligne pour les tests pratiques."
                delay={0.3}
              />
              <FaqItem
                question="Les tests sont-ils sécurisés contre la triche ?"
                answer="Oui, notre plateforme intègre plusieurs mesures anti-triche, comme la détection de changement d'onglet, la surveillance du temps passé sur chaque question, et des algorithmes de détection de plagiat pour les solutions de code."
                delay={0.4}
              />
              <FaqItem
                question="Puis-je intégrer DevEval à mon ATS existant ?"
                answer="Oui, nous proposons des intégrations avec les principaux ATS du marché. Les plans Pro et Enterprise incluent ces intégrations, et nous pouvons également développer des intégrations sur mesure pour des besoins spécifiques."
                delay={0.5}
              />
              <FaqItem
                question="Combien de temps faut-il pour mettre en place la plateforme ?"
                answer="La mise en place est immédiate. Vous pouvez créer un compte et commencer à utiliser la plateforme en quelques minutes. Pour les configurations plus complexes ou les intégrations personnalisées, notre équipe vous accompagne tout au long du processus."
                delay={0.6}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" ref={ctaRef} className="w-full py-20 md:py-32 bg-primary/5 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-30">
            <ParticleNetwork color="var(--primary)" />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Prêt à transformer votre processus de recrutement technique?
              </motion.h2>
              <motion.p
                className="text-muted-foreground text-xl mb-8 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Rejoignez plus de 500 entreprises qui font confiance à DevEval pour recruter les meilleurs talents
                techniques.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/register">
                  <Button size="lg" className="group relative overflow-hidden">
                    <span className="relative z-10 flex items-center">
                      Commencer gratuitement
                      <Zap className="ml-2 h-4 w-4 transition-all group-hover:rotate-12" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary-foreground opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Demander une démo
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/30">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <Code className="h-5 w-5 text-primary" />
              <span className="text-primary">DevEval</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 DevEval. Tous droits réservés.</p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Produit</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                    Fonctionnalités
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
                    Tarifs
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="text-muted-foreground hover:text-primary transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Entreprise</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    H-LAB
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Légal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Play({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

