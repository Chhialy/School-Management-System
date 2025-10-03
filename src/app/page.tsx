'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, UserCheck, BookOpen, TrendingUp, Activity, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading';
import Navbar from '@/components/Navbar';

interface Stats {
  students: number;
  teachers: number;
  courses: number;
}

export default function Home() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/health');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.stats);
        setDbStatus('connected');
      } else {
        setDbStatus('disconnected');
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      setDbStatus('disconnected');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            Welcome to School Management System
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
            A comprehensive platform to manage students, teachers, and courses with ease. 
            Get insights, track progress, and streamline your educational institution.
          </p>
        </div>

        {/* Database Status */}
        <div className="mb-8 fade-in">
          <Card className="glass border-white/30 backdrop-blur-xl shadow-2xl">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Activity className={`${
                    dbStatus === 'connected' ? 'text-green-400' : 
                    dbStatus === 'disconnected' ? 'text-red-400' : 'text-yellow-400'
                  } ${dbStatus === 'connected' ? 'animate-pulse' : ''}`} size={24} />
                  <span className="font-medium text-white">Database Status:</span>
                  <span className={`font-bold ${
                    dbStatus === 'connected' ? 'text-green-300' : 
                    dbStatus === 'disconnected' ? 'text-red-300' : 'text-yellow-300'
                  }`}>
                    {dbStatus === 'connected' ? 'Connected' : 
                     dbStatus === 'disconnected' ? 'Disconnected' : 'Checking...'}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={fetchStats}
                  disabled={loading}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 transition-all duration-300"
                >
                  {loading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid gap-6 md:grid-cols-3 mb-12 stagger-children">
            <Card className="glass border-white/30 backdrop-blur-xl shadow-2xl card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Total Students</CardTitle>
                <Users className="h-6 w-6 text-blue-300" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{stats.students}</div>
                <p className="text-xs text-white/70 mt-1">
                  {stats.students === 0 ? 'No students registered' : 'Active students'}
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-white/30 backdrop-blur-xl shadow-2xl card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Total Teachers</CardTitle>
                <UserCheck className="h-6 w-6 text-green-300" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{stats.teachers}</div>
                <p className="text-xs text-white/70 mt-1">
                  {stats.teachers === 0 ? 'No teachers registered' : 'Active teachers'}
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-white/30 backdrop-blur-xl shadow-2xl card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Total Courses</CardTitle>
                <BookOpen className="h-6 w-6 text-purple-300" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{stats.courses}</div>
                <p className="text-xs text-white/70 mt-1">
                  {stats.courses === 0 ? 'No courses created' : 'Available courses'}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12 stagger-children">
          <NavCard
            title="Students"
            description="Register, update, and manage student records with comprehensive profiles"
            href="/students"
            icon={Users}
            color="blue"
            count={stats?.students}
          />
          <NavCard
            title="Teachers"
            description="Add and edit teacher profiles, manage assignments and departments"
            href="/teachers"
            icon={UserCheck}
            color="green"
            count={stats?.teachers}
          />
          <NavCard
            title="Courses"
            description="Create and manage courses, set schedules and link with teachers"
            href="/courses"
            icon={BookOpen}
            color="purple"
            count={stats?.courses}
          />
          <NavCard
            title="API Health"
            description="Monitor system health, database connection and performance metrics"
            href="/api/health"
            icon={TrendingUp}
            color="orange"
            external
          />
        </div>

        {/* Quick Actions */}
        <Card className="glass border-white/30 backdrop-blur-xl shadow-2xl fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <TrendingUp size={24} className="text-yellow-300" />
              <span className="text-2xl">Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Link href="/students" className="block group">
                <div className="h-auto p-6 bg-blue-500/30 border border-blue-300/30 backdrop-blur-sm text-white rounded-lg hover:bg-blue-500/40 transition-all duration-300 card-hover">
                  <div className="text-center">
                    <Users className="mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" size={32} />
                    <div className="font-bold text-lg">Add Student</div>
                    <div className="text-sm text-white/80 mt-1">Register new student</div>
                  </div>
                </div>
              </Link>
              
              <Link href="/teachers" className="block group">
                <div className="h-auto p-6 bg-green-500/30 border border-green-300/30 backdrop-blur-sm text-white rounded-lg hover:bg-green-500/40 transition-all duration-300 card-hover">
                  <div className="text-center">
                    <UserCheck className="mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" size={32} />
                    <div className="font-bold text-lg">Add Teacher</div>
                    <div className="text-sm text-white/80 mt-1">Register new teacher</div>
                  </div>
                </div>
              </Link>
              
              <Link href="/courses" className="block group">
                <div className="h-auto p-6 bg-purple-500/30 border border-purple-300/30 backdrop-blur-sm text-white rounded-lg hover:bg-purple-500/40 transition-all duration-300 card-hover">
                  <div className="text-center">
                    <BookOpen className="mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" size={32} />
                    <div className="font-bold text-lg">Create Course</div>
                    <div className="text-sm text-white/80 mt-1">Add new course</div>
                  </div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-white/80 fade-in">
          <div className="glass border-white/30 backdrop-blur-xl shadow-2xl rounded-lg p-6">
            <p className="text-lg">
              Built with <span className="font-bold text-blue-300">Next.js</span>,{' '}
              <span className="font-bold text-green-300">MongoDB</span>, and{' '}
              <span className="font-bold text-purple-300">TypeScript</span>
            </p>
            <p className="mt-2 text-white/70">School Management System - Streamline your educational operations</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

interface NavCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: 'blue' | 'green' | 'purple' | 'orange';
  count?: number;
  external?: boolean;
}

function NavCard({ title, description, href, icon: Icon, color, count, external = false }: NavCardProps) {
  const colorClasses = {
    blue: 'text-blue-200 bg-blue-500/20 hover:bg-blue-500/30',
    green: 'text-green-200 bg-green-500/20 hover:bg-green-500/30',
    purple: 'text-purple-200 bg-purple-500/20 hover:bg-purple-500/30',
    orange: 'text-orange-200 bg-orange-500/20 hover:bg-orange-500/30'
  };

  return (
    <Card className="glass border-white/30 backdrop-blur-xl shadow-2xl card-hover cursor-pointer group">
      <Link href={href} target={external ? "_blank" : "_self"}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-lg ${colorClasses[color]} transition-all duration-300 group-hover:scale-110`}>
                <Icon size={24} />
              </div>
              <span className="text-xl font-bold text-white">{title}</span>
            </div>
            {external ? (
              <ExternalLink size={18} className="text-white/60 group-hover:text-white transition-colors" />
            ) : (
              count !== undefined && (
                <span className="text-2xl font-bold text-white">
                  {count}
                </span>
              )
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-white/80 text-sm leading-relaxed">{description}</p>
        </CardContent>
      </Link>
    </Card>
  );
}
