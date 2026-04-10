'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function SubmitIdea() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    problemSolved: '',
    techStack: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Save idea to localStorage (we'll connect to Supabase later)
    const newIdea = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      problemSolved: formData.problemSolved,
      techStack: formData.techStack,
      status: "Submitted",
      submittedAt: new Date().toISOString(),
    };

    const existingIdeas = JSON.parse(localStorage.getItem('myIdeas') || '[]');
    localStorage.setItem('myIdeas', JSON.stringify([...existingIdeas, newIdea]));

    alert("✅ Idea submitted successfully! You can view it in Dashboard → My Ideas.");

    // Close the tab after submission
    setTimeout(() => {
      window.close();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => window.close()} 
          className="mb-8 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </Button>

        <Card className="bg-zinc-900 border-white/10">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center">Submit Your Project Idea</CardTitle>
            <p className="text-center text-gray-400 mt-3">
              Share your idea and let us help you build it into a real product
            </p>
          </CardHeader>

          <CardContent className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Smart Waste Management System"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="bg-zinc-800 border-white/20 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
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
                  placeholder="Explain the real-world problem your idea solves..."
                  rows={4}
                  value={formData.problemSolved}
                  onChange={handleChange}
                  required
                  className="bg-zinc-800 border-white/20 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="techStack">Tech Stack (Optional)</Label>
                <Input
                  id="techStack"
                  name="techStack"
                  placeholder="React, Node.js, Python, TensorFlow, etc."
                  value={formData.techStack}
                  onChange={handleChange}
                  className="bg-zinc-800 border-white/20 text-white"
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full py-7 text-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"
              >
                {loading ? "Submitting Idea..." : "Submit Idea for Review"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}