
import React, { useState } from 'react';
import { Sparkles, Loader2, AlertCircle, CheckCircle2, Lightbulb } from 'lucide-react';
import { getAIInsights } from '../services/geminiService';
import { AccessLog } from '../types';

interface AIInsightsProps {
  logs: AccessLog[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ logs }) => {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<any>(null);

  const analyze = async () => {
    setLoading(true);
    const result = await getAIInsights(logs);
    setInsights(result);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden mb-6">
      <div className="p-6 bg-blue-50/50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Sparkles className="text-white" size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Security AI Assistant</h3>
            <p className="text-xs text-slate-500 font-medium">Analyze patterns and detect anomalies in access logs</p>
          </div>
        </div>
        <button 
          onClick={analyze}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center space-x-2 shadow-lg shadow-blue-200"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
          <span>{loading ? 'Analyzing...' : 'Analyze Now'}</span>
        </button>
      </div>

      {insights && (
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-blue-600 font-bold text-sm">
              <CheckCircle2 size={16} />
              <span>General Summary</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed bg-blue-50/30 p-4 rounded-xl border border-blue-100">
              {insights.summary}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-red-600 font-bold text-sm">
              <AlertCircle size={16} />
              <span>Detected Anomalies</span>
            </div>
            <ul className="space-y-2">
              {insights.anomalies.map((item: string, i: number) => (
                <li key={i} className="text-sm text-slate-600 bg-red-50 p-3 rounded-xl border border-red-100 flex items-start space-x-2">
                   <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                   <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-emerald-600 font-bold text-sm">
              <Lightbulb size={16} />
              <span>Optimization Tips</span>
            </div>
            <ul className="space-y-2">
              {insights.suggestions.map((item: string, i: number) => (
                <li key={i} className="text-sm text-slate-600 bg-emerald-50 p-3 rounded-xl border border-emerald-100 flex items-start space-x-2">
                   <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                   <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInsights;
