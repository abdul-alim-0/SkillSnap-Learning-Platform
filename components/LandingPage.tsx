'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthModal } from '@/components/auth/AuthModal';
import { Brain, Calendar, Map, Zap, Shield, Users, Download, Smartphone } from 'lucide-react';
import { downloadApp } from '@/lib/utils';
import { toast } from 'sonner';

export function LandingPage() {
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null);

  const handleDownload = async (type: 'apk' | 'exe') => {
    try {
      await downloadApp(type);
      toast.success(`${type.toUpperCase()} file download started`);
    } catch (error) {
      toast.error('Failed to download file. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">SkillSnap</span>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => setAuthModal('login')}>
              Login
            </Button>
            <Button onClick={() => setAuthModal('signup')}>
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Learn anything,{' '}
              <span className="gradient-text">simplify everything</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              SkillSnap transforms complex topics into bite-sized, digestible lessons. 
              Master new skills daily with our innovative microlearning approach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => setAuthModal('signup')} className="text-lg px-8 py-4">
                Start Learning Free
                <Zap className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose SkillSnap?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform is designed to make learning effortless, engaging, and effective.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-hover border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto gradient-bg rounded-2xl flex items-center justify-center mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Explain Like I'm 5</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  Complex topics broken down into simple, easy-to-understand explanations 
                  that anyone can grasp in minutes.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Daily Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  Learn something new every day with curated skills delivered 
                  fresh to your dashboard. Build habits that stick.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-4">
                  <Map className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Career Roadmaps</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  Structured learning paths designed by experts to guide you 
                  from beginner to professional in your chosen field.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-20 px-4 bg-pattern">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Take Learning Everywhere</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Access SkillSnap on all your devices. Learn on the go with our mobile app 
            or dive deep with our desktop application.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-4 border-2"
              onClick={() => handleDownload('apk')}
            >
              <Smartphone className="mr-2 w-5 h-5" />
              Download APK
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-4 border-2"
              onClick={() => handleDownload('exe')}
            >
              <Download className="mr-2 w-5 h-5" />
              Download for Desktop
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold">Secure & Private</h3>
              <p className="text-gray-600">
                Your data is protected with enterprise-grade security and privacy measures.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold">Expert Content</h3>
              <p className="text-gray-600">
                All content is curated and verified by industry experts and educators.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-2xl flex items-center justify-center">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold">Fast & Effective</h3>
              <p className="text-gray-600">
                Microlearning approach ensures faster retention and better results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">SkillSnap</span>
          </div>
          <p className="text-gray-400 mb-8">Learn anything, simplify everything</p>
          <p className="text-gray-500">© 2025 SkillSnap. All rights reserved.</p>
        </div>
      </footer>

      {/* Auth Modal */}
      {authModal && (
        <AuthModal
          mode={authModal}
          isOpen={!!authModal}
          onClose={() => setAuthModal(null)}
        />
      )}
    </div>
  );
}