'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Github, Twitter, Mail } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    college: '',
    course: '',
    year: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            college: formData.college,
            course: formData.course,
            year: formData.year,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      setMessage("✅ Verification email sent! Please check your inbox and click the link to verify your account.");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : "Failed to create account. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github' | 'twitter') => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : "Social login failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-zinc-900 border-white/10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white">Create Account</CardTitle>
          <CardDescription className="text-gray-400">
            Join Paltechs and start building real products
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && <p className="text-red-500 text-center">{error}</p>}
          {message && <p className="text-green-500 text-center">{message}</p>}

          {/* Social Login */}
          <div className="grid grid-cols-3 gap-3">
            <Button 
              variant="outline" 
              onClick={() => handleSocialLogin('google')}
              disabled={loading}
              className="flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleSocialLogin('github')}
              disabled={loading}
              className="flex items-center justify-center gap-2"
            >
              <Github className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleSocialLogin('twitter')}
              disabled={loading}
              className="flex items-center justify-center gap-2"
            >
              <Twitter className="w-5 h-5" />
            </Button>
          </div>

          <div className="relative text-center text-sm text-gray-500">
            <span className="bg-zinc-900 px-4">OR</span>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailSignup} className="space-y-5">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Sarvesh Balaji"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="bg-zinc-800 border-white/20 text-white"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-zinc-800 border-white/20 text-white"
              />
            </div>

            <div>
              <Label htmlFor="college">College / University</Label>
              <Input
                id="college"
                name="college"
                type="text"
                placeholder="Anna University"
                value={formData.college}
                onChange={handleChange}
                required
                className="bg-zinc-800 border-white/20 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="course">Course / Branch</Label>
                <Input
                  id="course"
                  name="course"
                  type="text"
                  placeholder="B.Tech CSE"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  className="bg-zinc-800 border-white/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  name="year"
                  type="text"
                  placeholder="2nd Year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="bg-zinc-800 border-white/20 text-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-zinc-800 border-white/20 text-white"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="bg-zinc-800 border-white/20 text-white"
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full py-6 text-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/" className="text-violet-400 hover:underline">Sign in</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}