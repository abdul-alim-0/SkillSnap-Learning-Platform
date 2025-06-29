'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Calendar, CheckCircle, Clock, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, subDays, addDays } from 'date-fns';

interface DailySkill {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  completed?: boolean;
}

export function DailySkillsSection() {
  const [dailySkills, setDailySkills] = useState<DailySkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Sample data for demonstration
  const sampleSkills: DailySkill[] = [
    {
      id: '1',
      title: 'Master the 5-Minute Rule',
      description: 'Learn a powerful productivity technique to overcome procrastination',
      content: 'The 5-minute rule is simple: when you feel resistance to starting a task, commit to doing it for just 5 minutes. Often, starting is the hardest part, and you\'ll find yourself continuing beyond the 5 minutes. This technique tricks your brain into overcoming the initial resistance and builds momentum.',
      date: format(new Date(), 'yyyy-MM-dd'),
      difficulty: 'Beginner',
      estimatedTime: '5 min read',
      completed: false
    },
    {
      id: '2',
      title: 'Basic Color Theory',
      description: 'Understand how colors work together in design',
      content: 'Color theory is the art and science of using color. The color wheel shows primary colors (red, blue, yellow), secondary colors (created by mixing primaries), and tertiary colors. Complementary colors (opposites on the wheel) create contrast, while analogous colors (neighbors) create harmony.',
      date: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
      difficulty: 'Beginner',
      estimatedTime: '7 min read',
      completed: true
    },
    {
      id: '3',
      title: 'SQL JOIN Operations',
      description: 'Master database relationships with JOIN queries',
      content: 'SQL JOINs combine data from multiple tables. INNER JOIN returns records matching in both tables. LEFT JOIN returns all records from the left table and matched records from the right. RIGHT JOIN does the opposite. FULL OUTER JOIN returns all records from both tables.',
      date: format(subDays(new Date(), 2), 'yyyy-MM-dd'),
      difficulty: 'Intermediate',
      estimatedTime: '10 min read',
      completed: true
    },
    {
      id: '4',
      title: 'Mindful Breathing Technique',
      description: 'Reduce stress with the 4-7-8 breathing method',
      content: 'The 4-7-8 breathing technique: Inhale through your nose for 4 counts, hold your breath for 7 counts, then exhale through your mouth for 8 counts. This activates your parasympathetic nervous system, reducing stress and promoting relaxation. Practice this 3-4 times daily.',
      date: format(subDays(new Date(), 3), 'yyyy-MM-dd'),
      difficulty: 'Beginner',
      estimatedTime: '4 min read',
      completed: false
    }
  ];

  useEffect(() => {
    // For now, we'll use sample data. In a real app, this would fetch from Supabase
    setDailySkills(sampleSkills);
    setLoading(false);
  }, []);

  const getCurrentSkill = () => {
    const dateStr = format(currentDate, 'yyyy-MM-dd');
    return dailySkills.find(skill => skill.date === dateStr);
  };

  const toggleCompletion = (skillId: string) => {
    setDailySkills(prev => 
      prev.map(skill => 
        skill.id === skillId 
          ? { ...skill, completed: !skill.completed }
          : skill
      )
    );
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentDate(prev => subDays(prev, 1));
    } else {
      setCurrentDate(prev => addDays(prev, 1));
    }
  };

  const currentSkill = getCurrentSkill();
  const isToday = format(currentDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
  const isFuture = currentDate > new Date();

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
          <Calendar className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold">Daily Skills</h2>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Learn something new every day. Build knowledge step by step with bite-sized lessons.
        </p>
      </div>

      {/* Date Navigation */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateDate('prev')}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="text-center">
            <h3 className="text-xl font-semibold">
              {format(currentDate, 'EEEE, MMMM d, yyyy')}
            </h3>
            {isToday && (
              <Badge variant="default" className="mt-1">
                Today
              </Badge>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateDate('next')}
            disabled={isFuture}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Current Skill */}
      {currentSkill ? (
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={currentSkill.difficulty === 'Beginner' ? 'secondary' : 
                            currentSkill.difficulty === 'Intermediate' ? 'default' : 'destructive'}
                  >
                    {currentSkill.difficulty}
                  </Badge>
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{currentSkill.estimatedTime}</span>
                  </Badge>
                </div>
                <CardTitle className="text-2xl">
                  {currentSkill.title}
                </CardTitle>
                <p className="text-gray-600">
                  {currentSkill.description}
                </p>
              </div>
              
              <Button
                variant={currentSkill.completed ? "default" : "outline"}
                size="sm"
                onClick={() => toggleCompletion(currentSkill.id)}
                className="flex items-center space-x-1"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{currentSkill.completed ? 'Completed' : 'Mark Complete'}</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {currentSkill.content}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-0 shadow-lg">
          <CardContent className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">
              {isFuture ? 'Coming Soon' : 'No Skill Available'}
            </h3>
            <p className="text-gray-400">
              {isFuture 
                ? 'Skills are released daily. Check back tomorrow!' 
                : 'No skill was scheduled for this date.'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="text-center py-6">
            <div className="text-3xl font-bold text-primary mb-2">
              {dailySkills.filter(skill => skill.completed).length}
            </div>
            <p className="text-gray-600">Skills Completed</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="text-center py-6">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {Math.round((dailySkills.filter(skill => skill.completed).length / dailySkills.length) * 100)}%
            </div>
            <p className="text-gray-600">Completion Rate</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="text-center py-6">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {dailySkills.filter(skill => skill.completed).length >= 3 ? '🔥' : '⭐'}
            </div>
            <p className="text-gray-600">
              {dailySkills.filter(skill => skill.completed).length >= 3 ? 'On Fire!' : 'Keep Going!'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}