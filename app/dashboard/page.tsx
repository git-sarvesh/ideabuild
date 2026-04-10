'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { User, Lightbulb, LogOut, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface Idea {
  id: string;
  title: string;
  description: string;
  problemSolved: string;
  techStack?: string;
  status: string;
  submittedAt: string;
  aiEvaluation?: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'profile' | 'ideas'>('profile');
  const [myIdeas, setMyIdeas] = useState<Idea[]>([]);

  const [user] = useState({
    name: "Sarvesh Balaji",
    email: "sarvesh@gmail.com",
    bio: "Aspiring full-stack developer passionate about AI and building real products.",
    skills: ["Next.js", "React", "Python", "Tailwind CSS", "Supabase"],
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
  });

  // Load ideas from localStorage
  useEffect(() => {
    const savedIdeas = localStorage.getItem('myIdeas');
    if (savedIdeas) {
      setMyIdeas(JSON.parse(savedIdeas));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/';
  };

  const openInNewTab = (url: string) => {
    window.open(url, '_blank');
  };

  // Simple status color helper
  const getStatusColor = (status: string) => {
    if (status === "Selected for Prize") return "text-emerald-400";
    if (status === "Under Review") return "text-amber-400";
    return "text-blue-400"; // Pending
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-zinc-900 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex items-center justify-between py-5">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-bold">IdeaBuild</h1>
            </Link>

            <div className="flex items-center gap-10 text-sm font-medium">
              <button
                onClick={() => setActiveTab('profile')}
                className={`pb-4 transition-all border-b-2 ${activeTab === 'profile' ? 'border-violet-500 text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('ideas')}
                className={`pb-4 transition-all border-b-2 ${activeTab === 'ideas' ? 'border-violet-500 text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
              >
                My Ideas
              </button>
              <button
                onClick={() => openInNewTab('/courses')}
                className="pb-4 flex items-center gap-2 text-gray-400 hover:text-white transition-all"
              >
                Courses <ExternalLink className="w-4 h-4" />
              </button>
              <button
                onClick={() => openInNewTab('/practice')}
                className="pb-4 flex items-center gap-2 text-gray-400 hover:text-white transition-all"
              >
                Coding Practice <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        {activeTab === 'profile' && (
          <div className="max-w-3xl">
            <Card className="bg-zinc-900 border-white/10">
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-4">
                  <User className="w-8 h-8" /> Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8 pt-10">
                <div>
                  <p className="text-gray-400 text-sm">Full Name</p>
                  <p className="text-3xl font-semibold mt-1">{user.name}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-2xl font-medium mt-1">{user.email}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Bio</p>
                  <p className="text-lg leading-relaxed mt-2">{user.bio}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-3">Skills</p>
                  <div className="flex flex-wrap gap-3">
                    {user.skills.map((skill, i) => (
                      <span key={i} className="bg-violet-600/20 text-violet-300 px-6 py-2.5 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'ideas' && (
          <Card className="bg-zinc-900 border-white/10">
            <CardHeader>
              <CardTitle className="text-3xl flex items-center gap-4">
                <Lightbulb className="w-8 h-8" /> My Submitted Ideas
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-10">
              {myIdeas.length > 0 ? (
                <div className="space-y-8">
                  {myIdeas.map((idea: Idea) => (
                    <div key={idea.id} className="p-8 bg-zinc-800 rounded-3xl border border-white/10">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-2xl font-semibold mb-2">{idea.title}</h3>
                          <p className="text-gray-300 mb-4">{idea.description}</p>
                          
                          <div className="grid grid-cols-2 gap-6 text-sm">
                            <div>
                              <p className="text-gray-400">Problem Solved</p>
                              <p className="mt-1">{idea.problemSolved}</p>
                            </div>
                            {idea.techStack && (
                              <div>
                                <p className="text-gray-400">Tech Stack</p>
                                <p className="mt-1">{idea.techStack}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <p className={`font-medium ${getStatusColor(idea.status)}`}>
                            {idea.status}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(idea.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {idea.aiEvaluation && (
                        <div className="mt-6 p-4 bg-zinc-900 rounded-2xl text-sm text-gray-300 border-l-4 border-violet-500">
                          <p className="font-medium text-violet-400 mb-2">AI Evaluation:</p>
                          <p className="whitespace-pre-wrap">{idea.aiEvaluation}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-400 text-xl">No ideas submitted yet.</p>
                  <p className="text-gray-500 mt-2">Submit your first idea from the home page!</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

