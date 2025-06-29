'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { PaymentModal } from './PaymentModal';
import { Map, Star, Users, Clock, DollarSign, CheckCircle } from 'lucide-react';

interface Roadmap {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  content: string;
  rating: number;
  students: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  enrolled?: boolean;
}

export function RoadmapsSection() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  // Sample data for demonstration
  const sampleRoadmaps: Roadmap[] = [
    {
      id: '1',
      title: 'Full-Stack Web Development',
      description: 'Master modern web development from frontend to backend. Learn React, Node.js, databases, and deployment.',
      price: 99,
      image_url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=500',
      content: 'Complete curriculum covering HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, and deployment strategies.',
      rating: 4.8,
      students: 12453,
      duration: '12 weeks',
      level: 'Beginner',
      enrolled: false
    },
    {
      id: '2',
      title: 'Data Science & Machine Learning',
      description: 'Transform data into insights. Learn Python, statistics, machine learning, and AI fundamentals.',
      price: 149,
      image_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=500',
      content: 'Comprehensive course covering Python, NumPy, Pandas, Scikit-learn, TensorFlow, and real-world projects.',
      rating: 4.9,
      students: 8721,
      duration: '16 weeks',
      level: 'Intermediate',
      enrolled: true
    },
    {
      id: '3',
      title: 'Digital Marketing Mastery',
      description: 'Build a successful online presence. Master SEO, social media, content marketing, and analytics.',
      price: 79,
      image_url: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=500',
      content: 'Learn Google Ads, Facebook Marketing, SEO strategies, email marketing, and conversion optimization.',
      rating: 4.7,
      students: 15632,
      duration: '8 weeks',
      level: 'Beginner',
      enrolled: false
    },
    {
      id: '4',
      title: 'UI/UX Design Fundamentals',
      description: 'Create beautiful and user-friendly designs. Learn design principles, Figma, and user research.',
      price: 89,
      image_url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=500',
      content: 'Master design thinking, prototyping, user testing, Figma, Adobe XD, and portfolio development.',
      rating: 4.6,
      students: 9834,
      duration: '10 weeks',
      level: 'Beginner',
      enrolled: false
    },
    {
      id: '5',
      title: 'Cloud Computing with AWS',
      description: 'Master cloud infrastructure and deployment. Learn AWS services, DevOps, and cloud architecture.',
      price: 129,
      image_url: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=500',
      content: 'Comprehensive AWS training including EC2, S3, Lambda, RDS, CloudFormation, and best practices.',
      rating: 4.8,
      students: 6742,
      duration: '14 weeks',
      level: 'Intermediate',
      enrolled: false
    },
    {
      id: '6',
      title: 'Mobile App Development',
      description: 'Build native and cross-platform mobile apps. Learn React Native, Flutter, and app store deployment.',
      price: 119,
      image_url: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=500',
      content: 'Complete mobile development course covering React Native, Flutter, native APIs, and publishing.',
      rating: 4.7,
      students: 7821,
      duration: '12 weeks',
      level: 'Intermediate',
      enrolled: false
    }
  ];

  useEffect(() => {
    // For now, we'll use sample data. In a real app, this would fetch from Supabase
    setRoadmaps(sampleRoadmaps);
    setLoading(false);
  }, []);

  const handleEnroll = (roadmap: Roadmap) => {
    setSelectedRoadmap(roadmap);
    setPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    if (selectedRoadmap) {
      setRoadmaps(prev => 
        prev.map(roadmap => 
          roadmap.id === selectedRoadmap.id 
            ? { ...roadmap, enrolled: true }
            : roadmap
        )
      );
    }
    setPaymentModalOpen(false);
    setSelectedRoadmap(null);
  };

  const getBadgeColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'secondary';
      case 'intermediate':
        return 'default';
      case 'advanced':
        return 'destructive';
      default:
        return 'secondary';
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
          <Map className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold">Career Roadmaps</h2>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Structured learning paths designed by experts to guide you from beginner to professional.
        </p>
      </div>

      {/* Roadmaps Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roadmaps.map((roadmap) => (
          <Card key={roadmap.id} className="card-hover border-0 shadow-lg overflow-hidden">
            <div className="relative">
              <img
                src={roadmap.image_url}
                alt={roadmap.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge variant={getBadgeColor(roadmap.level)}>
                  {roadmap.level}
                </Badge>
              </div>
              {roadmap.enrolled && (
                <div className="absolute top-4 right-4">
                  <Badge variant="default" className="bg-green-600">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Enrolled
                  </Badge>
                </div>
              )}
            </div>
            
            <CardHeader className="pb-3">
              <CardTitle className="text-xl leading-tight">
                {roadmap.title}
              </CardTitle>
              <p className="text-gray-600 text-sm leading-relaxed">
                {roadmap.description}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{roadmap.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{roadmap.students.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{roadmap.duration}</span>
                </div>
              </div>

              {/* Price and Action */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="text-2xl font-bold text-green-600">
                    {roadmap.price}
                  </span>
                </div>
                
                {roadmap.enrolled ? (
                  <Button variant="secondary" disabled>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Enrolled
                  </Button>
                ) : (
                  <Button onClick={() => handleEnroll(roadmap)}>
                    Enroll Now
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment Modal */}
      {selectedRoadmap && (
        <PaymentModal
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          roadmap={selectedRoadmap}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}