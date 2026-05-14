import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, BookOpen, BarChart3, Clock, Trophy, ChevronRight } from 'lucide-react';
import axios from 'axios';

const stats = [
  { label: 'Practice Time', value: '12h 40m', icon: Clock, color: 'text-blue-400' },
  { label: 'Avg. Score', value: '18/20', icon: Trophy, color: 'text-yellow-400' },
  { label: 'Completed', value: '24', icon: BookOpen, color: 'text-green-400' },
  { label: 'Weak Topic', value: 'Middleware', icon: BarChart3, color: 'text-red-400' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    axios.get(`${API_URL}/api/questions`)
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="pt-24 pb-12">
      <div className="container mx-auto px-4">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Welcome Back, <span className="text-primary">Coder</span></h1>
          <p className="text-white/60">Your journey to mastering Node.js starts here.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="glass-card p-6 flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm text-white/40">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Practice Section */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Play className="text-primary" size={24} /> Recent Problems
            </h2>
            
            <div className="space-y-4">
              {questions.map((q) => (
                <div key={q.id} className="glass-card p-6 hover:bg-white/[0.05] transition-all cursor-pointer group"
                     onClick={() => navigate(`/playground/${q.id}`)}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          q.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' : 
                          q.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {q.difficulty}
                        </span>
                        <span className="text-white/40 text-xs">{q.category}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-1">{q.title}</h3>
                      <p className="text-white/60 text-sm">{q.instructions}</p>
                    </div>
                    <ChevronRight className="text-white/20 group-hover:text-primary transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exam Mode Sidebar */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Exam Mode</h2>
            <div className="glass-card overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-red-500 to-orange-500" />
              <div className="p-8 space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Final Coding Exam</h3>
                  <p className="text-white/60 text-sm">60 Minutes | 2 Sections | 50 Marks</p>
                </div>
                
                <ul className="space-y-3 text-sm text-white/60">
                  <li className="flex items-center gap-2">• MCQ Section (30 Marks)</li>
                  <li className="flex items-center gap-2">• Coding Section (20 Marks)</li>
                  <li className="flex items-center gap-2">• No Hints Allowed</li>
                </ul>

                <button className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl font-bold hover:opacity-90 transition-opacity active:scale-95">
                  Start Exam Session
                </button>
              </div>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="font-bold mb-4">Previous Scores</h3>
              <div className="space-y-4">
                {[
                  { date: '12 May', score: '19/20' },
                  { date: '10 May', score: '15/20' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-white/40">{s.date}</span>
                    <span className="font-mono text-primary">{s.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
