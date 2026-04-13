'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SubmitProject() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    problemSolved: '',
    techStack: '',
    githubLink: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mvpLink, setMvpLink] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate submission (later we will connect to Supabase)
    setTimeout(() => {
      const projectId = Date.now().toString();
      const mockMvpLink = `https://paltechs.in/projects/${projectId}`;

      setMvpLink(mockMvpLink);
      setSubmitted(true);
      setLoading(false);

      // Save to localStorage for now (we'll move to Supabase later)
      const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
      submissions.push({
        id: projectId,
        ...formData,
        mvpLink: mockMvpLink,
        status: 'Under Review',
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('submissions', JSON.stringify(submissions));

      alert("✅ Project submitted successfully! Your MVP link will be generated after review.");
    }, 1500);
  };

  if (submitted && mvpLink) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <Card className="w-full max-w-lg bg-zinc-900 border-white/10 text-center">
          <CardHeader>
            <div className="mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
              <Sparkles className="w-10 h-10 text-green-400" />
            </div>
            <CardTitle className="text-3xl text-green-400">Project Submitted!</CardTitle>
            <CardDescription className="text-gray-400">
              Our team will review it within 48 hours.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 bg-zinc-800 rounded-2xl">
              <p className="text-sm text-gray-400 mb-2">Your MVP Link (after approval):</p>
              <a 
                href={mvpLink} 
                target="_blank"
                className="text-violet-400 hover:underline break-all text-lg font-medium"
              >
                {mvpLink}
              </a>
            </div>

            <Button 
              onClick={() => router.push('/dashboard')}
              className="w-full py-6 text-lg"
            >
              Go to Dashboard
            </Button>

            <Button 
              variant="outline"
              onClick={() => router.push('/')}
              className="w-full py-6"
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-2xl mx-auto px-6">
        <Card className="bg-zinc-900 border-white/10">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold">Submit Your Project</CardTitle>
            <CardDescription className="text-xl text-gray-400 mt-2">
              Share your idea and we'll help you build & host it
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Smart Attendance System using Face Recognition"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="bg-zinc-800 border-white/20 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your project in detail..."
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="bg-zinc-800 border-white/20 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="problemSolved">What Problem Does It Solve?</Label>
                <Textarea
                  id="problemSolved"
                  name="problemSolved"
                  placeholder="Explain the real-world problem your project solves..."
                  rows={4}
                  value={formData.problemSolved}
                  onChange={handleChange}
                  required
                  className="bg-zinc-800 border-white/20 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="techStack">Tech Stack</Label>
                <Input
                  id="techStack"
                  name="techStack"
                  placeholder="Next.js, React, Node.js, PostgreSQL, etc."
                  value={formData.techStack}
                  onChange={handleChange}
                  required
                  className="bg-zinc-800 border-white/20 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="githubLink">GitHub Link (Optional)</Label>
                <Input
                  id="githubLink"
                  name="githubLink"
                  placeholder="https://github.com/yourusername/project"
                  value={formData.githubLink}
                  onChange={handleChange}
                  className="bg-zinc-800 border-white/20 text-white"
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full py-7 text-lg font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting Project...
                  </>
                ) : (
                  "Submit Project for Review"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-8">
          After submission, our team will review within 48 hours and provide hosting + MVP link.
        </p>
      </div>
    </div>
  );
}