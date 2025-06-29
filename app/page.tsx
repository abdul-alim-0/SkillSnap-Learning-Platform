'use client';

import { useAuth } from '@/contexts/AuthContext';
import { LandingPage } from '@/components/LandingPage';
import { Dashboard } from '@/components/Dashboard';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return user ? <Dashboard /> : <LandingPage />;
}