"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Play,
  Sparkles,
  Shield,
  Zap,
  Award,
  AlertTriangle,
  CheckCircle,
  Upload,
  Search,
  FileCheck,
  Coins,
  Share2,
  Twitter,
  Github,
  MessageCircle,
  Mail,
  ArrowRight,
  Brain,
  Lock,
  Globe,
  Users,
  BookOpen,
  Heart,
  Quote,
} from "lucide-react"
import Image from "next/image";

export default function MintellectLanding() {
  const [demoMode, setDemoMode] = useState("beta")
  const [email, setEmail] = useState("")
  const [activeTab, setActiveTab] = useState("author")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 animated-bg"></div>
      <div className="fixed inset-0 grid-pattern"></div>

      {/* Floating Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="floating-orb"></div>
        <div className="floating-orb"></div>
        <div className="floating-orb"></div>
      </div>

      {/* Sparkles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
      </div>

      {/* Mouse Follow Effect */}
      <div
        className="fixed pointer-events-none z-0"
        style={{
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
          width: 200,
          height: 200,
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.03) 0%, transparent 70%)",
          borderRadius: "50%",
          transition: "all 0.3s ease",
        }}
      />

      {/* Section 1: Hero Section (Top Banner) */}
      <header className="relative z-50 border-b border-white/10 glass-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Image src="/images/NewLogo.png" alt="Mintiq Logo" width={83} height={83} />
              <span className="text-xl font-bold text-white">Mintiq</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-200 relative group">
                About Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a
                href="#how-it-works"
                className="text-gray-300 hover:text-white transition-colors duration-200 relative group"
              >
                How It Works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a
                href="#who-we-serve"
                className="text-gray-300 hover:text-white transition-colors duration-200 relative group"
              >
                Who We Serve
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a
                href="#contact"
                className="text-gray-300 hover:text-white transition-colors duration-200 relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-200 group-hover:w-full"></span>
              </a>
            </nav>

            {/* CTA Button */}
            <Button
              className="gradient-purple hover:scale-105 transition-all duration-200 glow-purple relative overflow-hidden"
              onClick={() => window.location.href = '/dashboard'}
            >
              <span className="keyboard-key px-2 py-1 rounded text-xs mr-2 font-mono">B</span>
              Launch App
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/3 to-blue-500/3 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Beta Badge */}
            <div className="flex justify-center mb-8">
              <Badge
                variant="secondary"
                className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2 text-sm glow-purple animate-pulse"
              >
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Beta Demo Available
              </Badge>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Revolutionizing Research with{" "}
              <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                AI + Blockchain
              </span>
            </h1>

            {/* Subtitle */}
            <h3 className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              Verify your work, mint your proof, and join a decentralized research ecosystem.
            </h3>

            {/* Demo Mode Toggle */}
            <div className="flex justify-center mb-8">
              <div className="glass-card rounded-full p-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 animate-pulse"></div>
                <button
                  onClick={() => setDemoMode("beta")}
                  className={`px-6 py-3 rounded-full transition-all duration-200 font-medium relative z-10 ${
                    demoMode === "beta"
                      ? "gradient-purple text-white shadow-lg glow-purple"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Beta Demo
                </button>
                <button
                  onClick={() => setDemoMode("original")}
                  className={`px-6 py-3 rounded-full transition-all duration-200 font-medium relative z-10 ${
                    demoMode === "original"
                      ? "gradient-purple text-white shadow-lg glow-purple"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Original Version
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                className="gradient-purple hover:scale-105 transition-all duration-200 glow-purple text-lg px-8 py-4 font-semibold relative overflow-hidden group"
                onClick={() => window.location.href = '/dashboard'}
              >
                <span className="keyboard-key px-3 py-1 rounded text-sm mr-3 font-mono">B</span>
                Launch App
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-200 text-lg px-8 py-4 bg-transparent font-semibold relative overflow-hidden group"
              >
                Contact Us
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </div>

            {/* Floating particles around text */}
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-4 h-4 bg-purple-500/30 rounded-full blur-sm animate-bounce"></div>
              <div className="absolute -bottom-5 -right-8 w-3 h-3 bg-purple-400/40 rounded-full blur-sm animate-bounce delay-1000"></div>
              <div className="absolute top-5 right-10 w-2 h-2 bg-purple-600/50 rounded-full blur-sm animate-bounce delay-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Problem & Solution (Mission) */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">What's Broken in Research Today?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The current research ecosystem lacks transparency, ownership verification, and trust mechanisms
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Problems */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-red-400 mb-8 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 animate-pulse" />
                Current Problems
              </h3>

              <Card className="problem-card hover:border-red-400/40 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                      <AlertTriangle className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Plagiarism & Fraud</h4>
                      <p className="text-gray-300">
                        Researchers struggle to prove originality and detect sophisticated plagiarism across vast
                        databases
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="problem-card hover:border-red-400/40 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                      <Lock className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Lack of Ownership Proof</h4>
                      <p className="text-gray-300">
                        No immutable way to prove when research was created or who the original author is
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="problem-card hover:border-red-400/40 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                      <Brain className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Unverifiable AI Content</h4>
                      <p className="text-gray-300">
                        Growing concern about AI-generated research without proper disclosure or verification
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Solutions */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-green-400 mb-8 flex items-center">
                <CheckCircle className="w-6 h-6 mr-3 animate-pulse" />
                How Mintiq Solves This
              </h3>

              <Card className="solution-card hover:border-green-400/40 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 glow-purple group-hover:scale-110 transition-transform duration-200">
                      <Zap className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">AI Originality Scoring</h4>
                      <p className="text-gray-300">
                        Advanced AI algorithms provide comprehensive originality scores across multiple databases and
                        sources
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="solution-card hover:border-green-400/40 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 glow-purple group-hover:scale-110 transition-transform duration-200">
                      <Search className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Cross-Chain Detection</h4>
                      <p className="text-gray-300">
                        Plagiarism detection across public databases AND on-chain sources for complete coverage
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="solution-card hover:border-green-400/40 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 glow-purple group-hover:scale-110 transition-transform duration-200">
                      <Award className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Dynamic NFT Publishing</h4>
                      <p className="text-gray-300">
                        Immutable proof of ownership through blockchain-based dynamic NFTs with embedded metadata
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Product Preview (Interactive) */}
      <section id="how-it-works" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of research publishing with our comprehensive platform
            </p>
          </div>

          {/* Dashboard Preview */}
          <div className="max-w-6xl mx-auto mb-16">
            <Card className="glass-card overflow-hidden group hover:border-purple-500/30 transition-all duration-300 glow-purple relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 animate-pulse"></div>
              <CardContent className="p-0 relative z-10">
                <div className="aspect-video bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
                  {/* Mintiq Demo Video */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60">
                    <video
                      controls
                      className="rounded-lg shadow-lg max-w-full max-h-full aspect-video border-2 border-purple-500"
                      style={{ background: '#000' }}
                    >
                      <source src="/videos/Mintiq%20DEMO%20-%20Made%20with%20Clipchamp.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  {/* Mock Dashboard UI */}
                  <div className="absolute inset-4 glass-card rounded-lg z-10">
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 gradient-purple rounded-lg flex items-center justify-center relative">
                            <Sparkles className="w-5 h-5 text-white animate-spin" />
                            <div className="pulse-ring absolute inset-0"></div>
                          </div>
                          <span className="text-white font-semibold">Mintiq Dashboard</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 animate-pulse">
                            Trust Score: 94%
                          </Badge>
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-200"></div>
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse delay-400"></div>
                          </div>
                        </div>
                      </div>

                      {/* Content Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-purple-500/20 rounded-lg p-4 border border-purple-500/30 hover:border-purple-400/50 transition-colors duration-200">
                          <div className="flex items-center space-x-2 mb-3">
                            <FileCheck className="w-5 h-5 text-purple-400" />
                            <span className="text-white font-medium">Originality Check</span>
                          </div>
                          <div className="w-full h-2 bg-purple-500/40 rounded-full mb-2">
                            <div className="w-4/5 h-full bg-purple-500 rounded-full animate-pulse"></div>
                          </div>
                          <p className="text-xs text-gray-400">94% Original Content</p>
                        </div>
                        <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-500/30 hover:border-blue-400/50 transition-colors duration-200">
                          <div className="flex items-center space-x-2 mb-3">
                            <Shield className="w-5 h-5 text-blue-400" />
                            <span className="text-white font-medium">Blockchain Verify</span>
                          </div>
                          <div className="w-full h-2 bg-blue-500/40 rounded-full mb-2">
                            <div className="w-full h-full bg-blue-500 rounded-full animate-pulse"></div>
                          </div>
                          <p className="text-xs text-gray-400">Verified on-chain</p>
                        </div>
                        <div className="bg-green-500/20 rounded-lg p-4 border border-green-500/30 hover:border-green-400/50 transition-colors duration-200">
                          <div className="flex items-center space-x-2 mb-3">
                            <Coins className="w-5 h-5 text-green-400" />
                            <span className="text-white font-medium">NFT Status</span>
                          </div>
                          <div className="w-full h-2 bg-green-500/40 rounded-full mb-2">
                            <div className="w-3/4 h-full bg-green-500 rounded-full animate-pulse"></div>
                          </div>
                          <p className="text-xs text-gray-400">Ready to mint</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-all duration-300">
                    <Button
                      size="lg"
                      className="gradient-purple rounded-full w-20 h-20 hover:scale-110 transition-transform duration-200 glow-purple-strong relative overflow-hidden group"
                    >
                      <Play className="w-8 h-8 text-white ml-1" />
                      <div className="pulse-ring absolute inset-0"></div>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Process Steps */}
          <div className="max-w-6xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
              <div className="glass-card rounded-full p-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 animate-pulse"></div>
                {["author", "reviewer", "reader"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-full transition-all duration-200 font-medium capitalize relative z-10 ${
                      activeTab === tab
                        ? "gradient-purple text-white shadow-lg glow-purple"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab} View
                  </button>
                ))}
              </div>
            </div>

            {/* View Content */}
            {activeTab === "author" && (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <Card className="glass-card hover:border-purple-500/30 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-6 text-center relative z-10">
                    <div className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 glow-purple relative">
                      <Upload className="w-8 h-8 text-white" />
                      <div className="pulse-ring absolute inset-0"></div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Upload Paper</h3>
                    <p className="text-gray-300 text-sm">Submit your research document for analysis</p>
                  </CardContent>
                </Card>
                <Card className="glass-card hover:border-purple-500/30 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-6 text-center relative z-10">
                    <div className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 glow-purple relative">
                      <Search className="w-8 h-8 text-white" />
                      <div className="pulse-ring absolute inset-0"></div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Run Checks</h3>
                    <p className="text-gray-300 text-sm">AI-powered originality and plagiarism detection</p>
                  </CardContent>
                </Card>
                <Card className="glass-card hover:border-purple-500/30 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-6 text-center relative z-10">
                    <div className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 glow-purple relative">
                      <FileCheck className="w-8 h-8 text-white" />
                      <div className="pulse-ring absolute inset-0"></div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Review Score</h3>
                    <p className="text-gray-300 text-sm">Get comprehensive trust and originality scores</p>
                  </CardContent>
                </Card>
                <Card className="glass-card hover:border-purple-500/30 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-6 text-center relative z-10">
                    <div className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 glow-purple relative">
                      <Coins className="w-8 h-8 text-white" />
                      <div className="pulse-ring absolute inset-0"></div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Mint NFT</h3>
                    <p className="text-gray-300 text-sm">Create immutable proof of ownership on blockchain</p>
                  </CardContent>
                </Card>
                <Card className="glass-card hover:border-purple-500/30 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-6 text-center relative z-10">
                    <div className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 glow-purple relative">
                      <Share2 className="w-8 h-8 text-white" />
                      <div className="pulse-ring absolute inset-0"></div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Share & Monetize</h3>
                    <p className="text-gray-300 text-sm">Publish and earn tokens from your verified research</p>
                  </CardContent>
                </Card>
              </div>
            )}
            {activeTab === "reviewer" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass-card hover:border-purple-500/30 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-6 text-center relative z-10">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                      <Users className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Join peer review community</h3>
                    <p className="text-gray-300">Become part of a global network of research reviewers.</p>
                  </CardContent>
                </Card>
                <Card className="glass-card hover:border-purple-500/30 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-6 text-center relative z-10">
                    <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                      <Coins className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Earn incentives by reviewing research papers</h3>
                    <p className="text-gray-300">Get rewarded for your valuable feedback and expertise.</p>
                  </CardContent>
                </Card>
                <Card className="glass-card hover:border-purple-500/30 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-6 text-center relative z-10">
                    <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                      <Award className="w-8 h-8 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Earn reputation NFT</h3>
                    <p className="text-gray-300">Build your reputation and showcase your contributions with NFTs.</p>
                  </CardContent>
                </Card>
              </div>
            )}
            {activeTab === "reader" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass-card hover:border-purple-500/30 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-6 text-center relative z-10">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                      <BookOpen className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Readers can buy the research paper NFTs</h3>
                    <p className="text-gray-300">Purchase and own unique research papers as NFTs.</p>
                  </CardContent>
                </Card>
                <Card className="glass-card hover:border-purple-500/30 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-6 text-center relative z-10">
                    <div className="w-16 h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                      <Heart className="w-8 h-8 text-pink-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Community support</h3>
                    <p className="text-gray-300">Engage with and support the research community.</p>
                  </CardContent>
                </Card>
                <Card className="glass-card hover:border-purple-500/30 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-6 text-center relative z-10">
                    <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                      <Quote className="w-8 h-8 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Get cited quotes</h3>
                    <p className="text-gray-300">Access and cite impactful research quotes easily.</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section id="who-we-serve" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Who We Serve</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Empowering the global research community with cutting-edge technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="glass-card hover:border-purple-500/30 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="p-8 text-center relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200 glow-purple relative">
                  <Users className="w-8 h-8 text-white" />
                  <div className="pulse-ring absolute inset-0"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Academics & Researchers</h3>
                <p className="text-gray-300 leading-relaxed">
                  Protect your intellectual property and prove originality with blockchain-verified research publishing
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card hover:border-purple-500/30 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="p-8 text-center relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200 glow-purple relative">
                  <Brain className="w-8 h-8 text-white" />
                  <div className="pulse-ring absolute inset-0"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">AI Developers</h3>
                <p className="text-gray-300 leading-relaxed">
                  Ensure transparency in AI-generated content and maintain ethical standards in research
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card hover:border-purple-500/30 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="p-8 text-center relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200 glow-purple relative">
                  <Globe className="w-8 h-8 text-white" />
                  <div className="pulse-ring absolute inset-0"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Institutions</h3>
                <p className="text-gray-300 leading-relaxed">
                  Implement robust verification systems and maintain research integrity across your organization
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 4: Call to Action / Waitlist */}
      <section id="contact" className="py-20 relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Join the Future of Research</h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              Be the first to publish transparently, earn tokens, and prove trust with every paper.
            </p>

            {/* Email Input */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass-card border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                />
                <Button className="gradient-purple hover:scale-105 transition-all duration-200 glow-purple px-6 relative overflow-hidden group">
                  Join Waitlist
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="gradient-purple hover:scale-105 transition-all duration-200 glow-purple-strong text-lg px-8 py-4 font-semibold relative overflow-hidden group"
              >
                Join Waitlist
                <Sparkles className="w-5 h-5 ml-2 animate-spin" />
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-200 text-lg px-8 py-4 bg-transparent font-semibold relative overflow-hidden group"
              >
                Book a Demo
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center space-x-6">
              <a
                href="#"
                className="w-12 h-12 glass-card rounded-full flex items-center justify-center hover:border-purple-500/50 transition-all duration-200 group relative overflow-hidden"
              >
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors duration-200" />
                <div className="absolute inset-0 bg-purple-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200"></div>
              </a>
              <a
                href="#"
                className="w-12 h-12 glass-card rounded-full flex items-center justify-center hover:border-purple-500/50 transition-all duration-200 group relative overflow-hidden"
              >
                <Github className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors duration-200" />
                <div className="absolute inset-0 bg-purple-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200"></div>
              </a>
              <a
                href="#"
                className="w-12 h-12 glass-card rounded-full flex items-center justify-center hover:border-purple-500/50 transition-all duration-200 group relative overflow-hidden"
              >
                <MessageCircle className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors duration-200" />
                <div className="absolute inset-0 bg-purple-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200"></div>
              </a>
              <a
                href="#"
                className="w-12 h-12 glass-card rounded-full flex items-center justify-center hover:border-purple-500/50 transition-all duration-200 group relative overflow-hidden"
              >
                <Mail className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors duration-200" />
                <div className="absolute inset-0 bg-purple-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200"></div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 glass-card py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 animate-pulse"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center glow-purple relative">
                <Sparkles className="h-5 w-5 text-white animate-spin" />
                <div className="pulse-ring absolute inset-0"></div>
              </div>
              <span className="text-xl font-bold text-white">Mintiq</span>
            </div>
            <p className="text-gray-400 text-center md:text-right">
              © 2024 Mintiq. Revolutionizing research with AI and blockchain.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
