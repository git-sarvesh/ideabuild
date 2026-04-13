'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'ideas' | 'profile' | 'courses' | 'coding'>('ideas');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      window.location.href = '/';
      return;
    }

    const userName = localStorage.getItem('userName') || 'Student';
    const userEmail = localStorage.getItem('userEmail') || '';

    setUser({ name: userName, email: userEmail });

    // Load submitted projects
    const saved = JSON.parse(localStorage.getItem('submissions') || '[]');
    setSubmissions(saved);
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
          <Link href="/" className="text-2xl font-bold">Paltechs</Link>

          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6 border-t border-white/10">
          <div className="flex gap-10 text-sm font-medium">
            <button
              onClick={() => setActiveTab('ideas')}
              className={`py-4 border-b-2 transition-colors ${activeTab === 'ideas' ? 'border-violet-500 text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
            >
              My Ideas
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 border-b-2 transition-colors ${activeTab === 'profile' ? 'border-violet-500 text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`py-4 border-b-2 transition-colors ${activeTab === 'courses' ? 'border-violet-500 text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
            >
              Courses
            </button>
            <button
              onClick={() => setActiveTab('coding')}
              className={`py-4 border-b-2 transition-colors ${activeTab === 'coding' ? 'border-violet-500 text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
            >
              Coding Practice
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* My Ideas Tab */}
        {activeTab === 'ideas' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold">My Ideas</h1>
              <Button onClick={() => window.open('/submit', '_blank')}>
                Submit New Project
              </Button>
            </div>

            {submissions.length === 0 ? (
              <Card className="bg-zinc-900 border-white/10 p-16 text-center">
                <p className="text-gray-400 text-xl mb-6">No projects submitted yet</p>
                <Button onClick={() => window.open('/submit', '_blank')}>
                  Submit Your First Project
                </Button>
              </Card>
            ) : (
              <div className="space-y-6">
                {submissions.map((project: any) => (
                  <Card key={project.id} className="bg-zinc-900 border-white/10">
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                        <Badge>{project.status || 'Under Review'}</Badge>
                      </div>
                      <CardDescription>
                        Submitted on {new Date(project.submittedAt).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>

                      {project.mvpLink && (
                        <a
                          href={project.mvpLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-medium"
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

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <Card className="bg-zinc-900 border-white/10">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-lg">
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
            </CardContent>
          </Card>
        )}

        {/* Courses & Coding Tab (Coming Soon) */}
        {(activeTab === 'courses' || activeTab === 'coding') && (
          <Card className="bg-zinc-900 border-white/10 p-20 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {activeTab === 'courses' ? 'Certification Courses' : 'Coding Practice'}
            </h2>
            <p className="text-gray-400 text-xl">Coming Soon...</p>
          </Card>
        )}
      </div>
    </div>
  );
}