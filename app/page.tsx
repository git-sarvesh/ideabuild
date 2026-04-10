'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Users, Trophy, Sparkles, Target, Zap, Heart } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold tracking-tighter">IdeaBuild</h1>
          </Link>

          <div className="flex items-center gap-8 text-sm">
            <Link href="#about" className="hover:text-violet-400 transition-colors">About</Link>
            <Link href="#how-it-works" className="hover:text-violet-400 transition-colors">How it Works</Link>
            
            <button 
              onClick={() => window.open('/submit', '_blank')}
              className="hover:text-violet-400 transition-colors font-medium"
            >
              Submit Idea
            </button>

            {isLoggedIn ? (
              <Button asChild className="bg-white text-black hover:bg-white/90">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <Button asChild className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700">
                <Link href="/signup">Register</Link>
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen pt-32 pb-20 flex items-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(at_center,#4f46e510_0%,transparent_70%)]"></div>
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 mb-8">
            <span className="text-sm font-medium">Built for Indian Students & Innovators</span>
          </div>

          <h1 className="text-7xl md:text-8xl font-bold tracking-tighter mb-6 leading-none">
            Your Ideas.<br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Real Products.
            </span>
          </h1>

          <p className="text-2xl text-gray-400 max-w-3xl mx-auto mb-12">
            Submit your idea → We validate + build it → Host permanently → You get rewarded + certification
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-10 py-7 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"
              onClick={() => window.open('/submit', '_blank')}
            >
              Submit Your Idea Now →
            </Button>

            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-10 py-7 rounded-2xl border-white/30 hover:bg-white/10" 
              asChild
            >
              <Link href="#about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About IdeaBuild Section */}
      <section id="about" className="py-24 bg-zinc-950 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">About IdeaBuild</h2>
            <p className="text-2xl text-gray-400 max-w-3xl mx-auto">
              We are a student-first platform that turns college project ideas into real, hosted products.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-zinc-900 border-white/10 p-8 hover:border-violet-500/50 transition-all">
              <div className="w-16 h-16 bg-violet-600/20 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-9 h-9 text-violet-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">For Students, By Students</h3>
              <p className="text-gray-400">
                We understand the struggles of Indian college students — limited resources, no mentorship, 
                and no proper platform to turn ideas into reality. That&apos;s why we built IdeaBuild.
              </p>
            </Card>

            <Card className="bg-zinc-900 border-white/10 p-8 hover:border-violet-500/50 transition-all">
              <div className="w-16 h-16 bg-fuchsia-600/20 rounded-2xl flex items-center justify-center mb-6">
                <Trophy className="w-9 h-9 text-fuchsia-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Real Rewards</h3>
              <p className="text-gray-400">
                When we build and host your product, you earn from the profits. 
                Plus, you get industry-recognized certifications that boost your resume.
              </p>
            </Card>

            <Card className="bg-zinc-900 border-white/10 p-8 hover:border-violet-500/50 transition-all">
              <div className="w-16 h-16 bg-cyan-600/20 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-9 h-9 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Full Support</h3>
              <p className="text-gray-400">
                Our team + built-in AI assistant helps you at every step. 
                You focus on creativity. We handle the rest.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-400">From idea to real product in 4 simple steps</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-zinc-900 border-white/10 hover:border-violet-500/50 transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-9 h-9 text-violet-400" />
                </div>
                <CardTitle>1. Submit Idea</CardTitle>
                <CardDescription>Share your project idea, problem, and tech stack</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-zinc-900 border-white/10 hover:border-violet-500/50 transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6">
                  <Sparkles className="w-9 h-9 text-violet-400" />
                </div>
                <CardTitle>2. Validation</CardTitle>
                <CardDescription>AI + our team checks feasibility and impact</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-zinc-900 border-white/10 hover:border-violet-500/50 transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-9 h-9 text-violet-400" />
                </div>
                <CardTitle>3. Build & Host</CardTitle>
                <CardDescription>We help build and permanently host your product</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-zinc-900 border-white/10 hover:border-violet-500/50 transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6">
                  <Trophy className="w-9 h-9 text-violet-400" />
                </div>
                <CardTitle>4. Get Rewarded</CardTitle>
                <CardDescription>Earn from profits + valuable certifications</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}