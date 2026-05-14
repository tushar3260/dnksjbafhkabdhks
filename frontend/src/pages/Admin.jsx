import React, { useState } from 'react';
import axios from 'axios';
import { Plus, Save, Trash2 } from 'lucide-react';

export default function Admin() {
  const [newQ, setNewQ] = useState({
    title: '',
    difficulty: 'Easy',
    category: 'CRUD',
    instructions: '',
    starterCode: {
      'index.js': '// Incomplete Express code',
      'index.html': '<!-- HTML with fetch -->',
      'data.json': '[]'
    },
    expectedAPIs: [{ method: 'GET', path: '/api/test' }],
    hints: [''],
    solution: '',
    explanation: ''
  });

  const handleSave = async () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    try {
      await axios.post(`${API_URL}/api/admin/questions`, newQ);
      alert('Question Saved!');
    } catch (err) {
      alert('Error saving question');
    }
  };

  return (
    <div className="pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Plus className="text-primary" /> Add New Question
        </h1>

        <div className="glass-card p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-white/40">Title</label>
              <input 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-primary outline-none"
                value={newQ.title}
                onChange={e => setNewQ({...newQ, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/40">Difficulty</label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-primary outline-none"
                value={newQ.difficulty}
                onChange={e => setNewQ({...newQ, difficulty: e.target.value})}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white/40">Instructions</label>
            <textarea 
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 h-32 focus:border-primary outline-none"
              value={newQ.instructions}
              onChange={e => setNewQ({...newQ, instructions: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white/40">Solution (Reference)</label>
            <textarea 
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 h-32 font-mono text-sm focus:border-primary outline-none"
              placeholder="Full working Express code..."
              value={newQ.solution}
              onChange={e => setNewQ({...newQ, solution: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white/40">Explanation (Hinglish)</label>
            <textarea 
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-primary outline-none"
              value={newQ.explanation}
              onChange={e => setNewQ({...newQ, explanation: e.target.value})}
            />
          </div>

          <button 
            onClick={handleSave}
            className="w-full py-4 bg-primary rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <Save size={20} /> Save to Question Bank
          </button>
        </div>
      </div>
    </div>
  );
}
