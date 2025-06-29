'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { supabase } from '@/lib/supabase';
import { Brain, Search, BookOpen, Lightbulb, Zap } from 'lucide-react';

interface Explanation {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
}

export function ExplainSection() {
  const [explanations, setExplanations] = useState<Explanation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Sample data for demonstration
  const sampleExplanations: Explanation[] = [
    {
      id: '1',
      title: 'How does the Internet work?',
      content: 'Think of the internet like a huge mail system. When you send a letter, it goes through different post offices to reach its destination. Similarly, when you visit a website, your request travels through different computers (servers) until it finds the right one with your website, then sends the webpage back to you!',
      category: 'Technology',
      created_at: '2025-01-07T12:00:00Z'
    },
    {
      id: '2',
      title: 'What is Artificial Intelligence?',
      content: 'AI is like teaching a computer to think and learn like a human, but much faster! Imagine if you could teach your calculator to recognize your handwriting, understand what you\'re saying, and even play games with you. That\'s what AI does - it helps computers understand and solve problems just like we do.',
      category: 'Technology',
      created_at: '2025-01-07T11:00:00Z'
    },
    {
      id: '3',
      title: 'How do vaccines work?',
      content: 'Vaccines are like showing your body\'s security team (immune system) a "wanted poster" of a bad guy (virus) before they actually show up. Your body learns to recognize and fight the bad guy, so when the real virus tries to make you sick, your body already knows how to defeat it!',
      category: 'Science',
      created_at: '2025-01-07T10:00:00Z'
    },
    {
      id: '4',
      title: 'Why is the sky blue?',
      content: 'Sunlight is actually made up of all colors mixed together, like a rainbow! When sunlight hits Earth\'s atmosphere, blue light gets scattered around more than other colors because it bounces off tiny particles in the air. It\'s like blue light is the bounciest ball in a room full of different colored balls!',
      category: 'Science',
      created_at: '2025-01-07T09:00:00Z'
    },
    {
      id: '5',
      title: 'What is cryptocurrency?',
      content: 'Cryptocurrency is like digital money that exists only on computers. Imagine if instead of paper money, you had special digital coins that are super secure and can\'t be copied or faked. People use powerful computers to "mine" these coins by solving really hard math puzzles!',
      category: 'Finance',
      created_at: '2025-01-07T08:00:00Z'
    },
    {
      id: '6',
      title: 'How does photosynthesis work?',
      content: 'Plants are like little food factories! They take in sunlight (their energy source), water from their roots, and carbon dioxide from the air. Then they mix it all together to make their own food (sugar) and release oxygen for us to breathe. It\'s like they\'re cooking dinner using sunshine!',
      category: 'Science',
      created_at: '2025-01-07T07:00:00Z'
    }
  ];

  useEffect(() => {
    // For now, we'll use sample data. In a real app, this would fetch from Supabase
    setExplanations(sampleExplanations);
    setLoading(false);
  }, []);

  const categories = Array.from(new Set(explanations.map(exp => exp.category)));
  
  const filteredExplanations = explanations.filter(explanation => {
    const matchesSearch = explanation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         explanation.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || explanation.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technology':
        return <Zap className="w-4 h-4" />;
      case 'science':
        return <Lightbulb className="w-4 h-4" />;
      case 'finance':
        return <BookOpen className="w-4 h-4" />;
      default:
        return <Brain className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Brain className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold">Explain Like I'm 5</h2>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Complex topics made simple. No jargon, no confusion - just clear, easy-to-understand explanations.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-lg space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={!selectedCategory ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All Topics
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="flex items-center space-x-1"
            >
              {getCategoryIcon(category)}
              <span>{category}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Explanations Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExplanations.map((explanation) => (
          <Card key={explanation.id} className="card-hover border-0 shadow-lg h-full">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <Badge variant="secondary" className="mb-2 flex items-center space-x-1">
                  {getCategoryIcon(explanation.category)}
                  <span>{explanation.category}</span>
                </Badge>
              </div>
              <CardTitle className="text-xl leading-tight">
                {explanation.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                {explanation.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExplanations.length === 0 && (
        <div className="text-center py-12">
          <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-500 mb-2">No explanations found</h3>
          <p className="text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}