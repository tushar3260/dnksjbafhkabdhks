import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Lightbulb, CheckCircle2, XCircle, ChevronLeft } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Playground() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [codes, setCodes] = useState({
    'index.js': '',
    'index.html': '',
    'data.json': ''
  });
  const [activeTab, setActiveTab] = useState('index.js');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentHint, setCurrentHint] = useState(-1);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    axios.get(`${API_URL}/api/questions/${id}`)
      .then(res => {
        setQuestion(res.data);
        setCodes(res.data.starterCode);
      })
      .catch(err => console.error(err));
  }, [id, API_URL]);

  const handleRun = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/execute`, {
        indexJs: codes['index.js'],
        indexHtml: codes['index.html'],
        dataJson: codes['data.json'],
        expectedAPIs: question.expectedAPIs
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!question) return <div className="pt-24 text-center">Loading...</div>;

  return (
    <div className="h-screen flex flex-col">
      {/* Sub Header */}
      <div className="pt-16 px-4 h-14 border-b border-white/5 flex items-center justify-between bg-background/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="p-1 hover:bg-white/5 rounded">
            <ChevronLeft size={20} />
          </button>
          <h2 className="font-bold">{question.title}</h2>
          <span className="text-white/40 text-xs px-2 py-0.5 border border-white/10 rounded">{question.difficulty}</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCurrentHint(h => Math.min(h + 1, question.hints.length - 1))}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 transition-all text-sm font-medium"
          >
            <Lightbulb size={16} /> Hint
          </button>
          <button 
            onClick={handleRun}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-primary text-white hover:opacity-90 transition-all text-sm font-bold shadow-lg shadow-primary/20"
          >
            <Play size={16} /> {loading ? 'Running...' : 'Run Code'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Instructions */}
        <div className="w-1/3 border-r border-white/5 flex flex-col bg-background">
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <section>
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Instructions</h3>
              <p className="text-white/80 leading-relaxed">{question.instructions}</p>
            </section>

            {question.hints && currentHint >= 0 && (
              <section className="space-y-4">
                <h3 className="text-sm font-bold text-yellow-500 uppercase tracking-widest">Progressive Hints</h3>
                {question.hints.slice(0, currentHint + 1).map((hint, i) => (
                  <div key={i} className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl text-sm text-yellow-200/80">
                    <span className="font-bold mr-2">Hint {i + 1}:</span> {hint}
                  </div>
                ))}
              </section>
            )}

            {result && (
              <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-green-500 uppercase tracking-widest">Evaluation Result</h3>
                  <span className="text-2xl font-bold font-mono">{result.score}/20</span>
                </div>
                
                <div className={`p-6 rounded-2xl border ${result.success ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                  {result.success ? (
                    <div className="flex items-center gap-3 text-green-400">
                      <CheckCircle2 /> <span className="font-bold">Perfect Solution!</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-red-400 font-bold">
                        <XCircle /> Mistakes Found
                      </div>
                      <ul className="space-y-2 text-sm text-red-300/70">
                        {result.mistakes.map((m, i) => <li key={i}>• {m}</li>)}
                      </ul>
                    </div>
                  )}
                </div>

                {result.score > 0 && (
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-xs italic text-white/40">
                    <span className="font-bold block mb-1 not-italic text-white/60">Explanation (Hinglish):</span>
                    "{question.explanation}"
                  </div>
                )}
              </section>
            )}
          </div>
        </div>

        {/* Right Panel: Editors */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e]">
          <div className="flex border-b border-white/5 bg-background">
            {['index.js', 'index.html', 'data.json'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-xs font-mono transition-all border-b-2 ${
                  activeTab === tab 
                  ? 'bg-white/5 border-primary text-white' 
                  : 'border-transparent text-white/40 hover:text-white/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="flex-1 relative">
            <Editor
              height="100%"
              theme="vs-dark"
              language={activeTab === 'index.js' ? 'javascript' : activeTab === 'index.html' ? 'html' : 'json'}
              value={codes[activeTab]}
              onChange={(val) => setCodes(prev => ({ ...prev, [activeTab]: val }))}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                padding: { top: 20 },
                smoothScrolling: true,
                cursorSmoothCaretAnimation: 'on',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
