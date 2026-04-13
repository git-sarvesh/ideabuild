'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Lightbulb, BookOpen, Code2, LogOut, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'profile' | 'ideas' | 'courses' | 'coding'>('ideas');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      window.location.href = '/';
      return;
    }

    const userName = localStorage.getItem('userName') || 'Student';
    const userEmail = localStorage.getItem('userEmail') || '';

    setUser({ name: userName, email: userEmail });

    // Load submissions
    const savedSubmissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    setSubmissions(savedSubmissions);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Navigation */}
      <nav className="border-b border-white/10 bg-black/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-2xl font-bold">
            Paltechs
          </Link>

          <div className="flex items-center gap-6">
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6 border-t border-white/10">
          <div className="flex gap-8 text-sm font-medium">
            {['ideas', 'profile', 'courses', 'coding'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-4 border-b-2 transition-colors capitalize ${
                  activeTab === tab 
                    ? 'border-violet-500 text-white' 
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {tab === 'ideas' && 'My Ideas'}
                {tab === 'profile' && 'Profile'}
                {tab === 'courses' && 'Courses'}
                {tab === 'coding' && 'Coding Practice'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {activeTab === 'ideas' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold">My Ideas</h1>
              <Button onClick={() => window.open('/submit', '_blank')}>
                Submit New Idea
              </Button>
            </div>

            {submissions.length === 0 ? (
              <Card className="bg-zinc-900 border-white/10 p-12 text-center">
                <p className="text-gray-400 text-xl">No projects submitted yet.</p>
                <Button 
                  className="mt-6"
                  onClick={() => window.open('/submit', '_blank')}
                >
                  Submit Your First Project
                </Button>
              </Card>
            ) : (
              <div className="grid gap-6">
                {submissions.map((project) => (
                  <Card key={project.id} className="bg-zinc-900 border-white/10">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{project.title}</CardTitle>
                        <Badge variant={project.status === 'Approved' ? 'default' : 'secondary'}>
                          {project.status}
                        </Badge>
                      </div>
                      <CardDescription>{project.submittedAt ? new Date(project.submittedAt).toLocaleDateString() : ''}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                      
                      {project.mvpLink && (
                        <a 
                          href={project.mvpLink} 
                          target="_blank"
                          className="inline-flex items-center gap-2 text-violet-400 hover:underline"
                        >
                          View Hosted MVP <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <Card className="bg-zinc-900 border-white/10">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
            </CardContent>
          </Card>
        )}

        {activeTab === 'courses' && (
          <Card className="bg-zinc-900 border-white/10 p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Certification Courses</h2>
            <p className="text-gray-400">Coming Soon - Web Development, AI/ML, Cloud Computing, etc.</p>
          </Card>
        )}

        {activeTab === 'coding' && (
          <Card className="bg-zinc-900 border-white/10 p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Coding Practice</h2>
            <p className="text-gray-400">LeetCode-style challenges coming soon...</p>
          </Card>
        )}
      </div>
    </div>
  );
}