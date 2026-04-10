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

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const newIdea = {
        id: Date.now(),
        ...formData,
        status: "Submitted",
        submittedAt: new Date().toISOString(),
      };

      const existingIdeas = JSON.parse(localStorage.getItem('myIdeas') || '[]');
      localStorage.setItem('myIdeas', JSON.stringify([...existingIdeas, newIdea]));

      alert("✅ Idea submitted successfully! You can view it in Dashboard → My Ideas.");

      // Close tab after submission
      setTimeout(() => {
        window.close();
      }, 1200);
    } catch {
      alert("Failed to submit idea. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => window.close()} 
          className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </Button>

        <Card className="bg-zinc-900 border-white/10">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold">Submit Your Project Idea</CardTitle>
            <p className="text-gray-400 mt-3">
              Share your idea. Our team will review it for potential prize and profit.
            </p>
          </CardHeader>

          <CardContent className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Smart Waste Management System using IoT"
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
                  placeholder="Explain the real-world problem your idea addresses..."
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
                  placeholder="React, Node.js, Python, TensorFlow, Firebase, etc."
                  value={formData.techStack}
                  onChange={handleChange}
                  className="bg-zinc-800 border-white/20 text-white"
                />
              </div>

              <Button 
                type="submit" 
                disabled={submitting}
                className="w-full py-7 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
              >
                {submitting ? "Submitting Idea..." : "Submit Idea for Review"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-8">
          Your idea will be reviewed by our team. Top ideas will be selected for prize money and development support.
        </p>
      </div>
    </div>
  );
}