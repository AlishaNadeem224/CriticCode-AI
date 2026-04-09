'use client';

import { useState } from 'react';
import { Github, Send, Loader2, Sparkles } from 'lucide-react';

export default function CodeCriticAI() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('Python');
  const [prDescription, setPrDescription] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    if (!code.trim()) {
      alert("Please paste some code to review!");
      return;
    }

    setLoading(true);
    setReview('');

    try {
      const response = await fetch('http://localhost:8000/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          language: language,
          pr_description: prDescription,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get review');
      }

      const data = await response.json();
      setReview(data.review);
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend. Make sure backend is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="bg-violet-600 p-3 rounded-2xl">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-5xl font-bold">CodeCritic AI</h1>
              <p className="text-gray-400 text-lg">Your Personal Senior Code Reviewer</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Github className="w-5 h-5" />
            <span>Built for Strong SDE Portfolios</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Input */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Programming Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-2xl p-4 focus:outline-none focus:border-violet-500 text-lg"
              >
                <option value="Python">Python</option>
                <option value="JavaScript">JavaScript</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Java">Java</option>
                <option value="Go">Go</option>
                <option value="C++">C++</option>
                <option value="Rust">Rust</option>
                <option value="C#">C#</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                PR / Task Description (Optional)
              </label>
              <textarea
                value={prDescription}
                onChange={(e) => setPrDescription(e.target.value)}
                placeholder="What does this code do? Any specific concerns?"
                className="w-full h-28 bg-gray-900 border border-gray-700 rounded-2xl p-4 focus:outline-none focus:border-violet-500 resize-y"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Paste Your Code Here
              </label>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your code here..."
                className="w-full h-[480px] font-mono bg-gray-900 border border-gray-700 rounded-3xl p-5 focus:outline-none focus:border-violet-500 text-sm resize-none"
              />
            </div>

            <button
              onClick={handleReview}
              disabled={loading || !code.trim()}
              className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-gray-700 transition-all py-5 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  AI is Reviewing...
                </>
              ) : (
                <>
                  <Send className="w-6 h-6" />
                  Get AI Code Review
                </>
              )}
            </button>
          </div>

          {/* Right Side - AI Review Output */}
          <div className="bg-gray-900 border border-gray-700 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-violet-400" />
              <h2 className="text-2xl font-semibold">AI Review Result</h2>
            </div>

            <div className="prose prose-invert max-w-none text-gray-200 leading-relaxed">
              {review ? (
                <div className="whitespace-pre-wrap">{review}</div>
              ) : (
                <div className="text-gray-500 italic text-center py-20">
                  Your AI-powered code review will appear here...<br />
                  <span className="text-sm">Clean, professional, and actionable feedback</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
