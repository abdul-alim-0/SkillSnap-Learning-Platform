'use client';

import { useState } from 'react';
import { Navbar } from './dashboard/Navbar';
import { ExplainSection } from './dashboard/ExplainSection';
import { DailySkillsSection } from './dashboard/DailySkillsSection';
import { RoadmapsSection } from './dashboard/RoadmapsSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Calendar, Map, Download, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { downloadApp } from '@/lib/utils';
import { toast } from 'sonner';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('explain');

  const handleDownload = async (type: 'apk' | 'zip' | 'exe') => {
    try {
      await downloadApp(type);
      toast.success(`${type.toUpperCase()} file download started`);
    } catch (error) {
      toast.error('Failed to download file. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to <span className="gradient-text">SkillSnap</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to expand your knowledge? Choose your learning adventure below.
          </p>
        </div>

        {/* Download Section */}
        <div className="mb-12 bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Take Learning Everywhere</h2>
            <p className="text-gray-600">
              Download our apps to learn on the go
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2"
              onClick={() => handleDownload('apk')}
            >
              <Smartphone className="mr-2 w-5 h-5" />
              Download APK
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2"
              onClick={() => handleDownload('exe')}
            >
              <Download className="mr-2 w-5 h-5" />
              Download for Desktop
            </Button>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-white p-2 rounded-2xl shadow-lg">
            <TabsTrigger 
              value="explain" 
              className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl py-3"
            >
              <Brain className="w-5 h-5" />
              <span className="hidden sm:inline">Explain Like I'm 5</span>
              <span className="sm:hidden">ELI5</span>
            </TabsTrigger>
            <TabsTrigger 
              value="daily" 
              className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl py-3"
            >
              <Calendar className="w-5 h-5" />
              <span className="hidden sm:inline">Daily Skills</span>
              <span className="sm:hidden">Daily</span>
            </TabsTrigger>
            <TabsTrigger 
              value="roadmaps" 
              className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl py-3"
            >
              <Map className="w-5 h-5" />
              <span className="hidden sm:inline">Career Roadmaps</span>
              <span className="sm:hidden">Roadmaps</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="explain" className="mt-8">
            <ExplainSection />
          </TabsContent>

          <TabsContent value="daily" className="mt-8">
            <DailySkillsSection />
          </TabsContent>

          <TabsContent value="roadmaps" className="mt-8">
            <RoadmapsSection />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}