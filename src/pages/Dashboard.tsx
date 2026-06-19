import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as ReTooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { ShieldCheck, Target, Lightbulb, TrendingDown, Download, RefreshCcw } from 'lucide-react';
import { analyzeCarbonFootprint } from '../utils/gemini';
import confetti from 'canvas-confetti';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [aiData, setAiData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const results = location.state?.results;
  const inputs = location.state?.inputs;

  useEffect(() => {
    if (!results) {
      navigate('/calculator');
      return;
    }

    const fetchAnalysis = async () => {
      setLoading(true);
      try {
        const analysis = await analyzeCarbonFootprint({ results, inputs });
        setAiData(analysis);
        if (analysis.sustainabilityScore > 70) {
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#10b981', '#3b82f6', '#ffffff']
          });
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [results, inputs, navigate]);

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  if (loading) {
    return (
      <div className="flex-center" style={{ height: '70vh', flexDirection: 'column', gap: '1rem' }}>
        <RefreshCcw className="animate-spin" size={40} style={{ color: 'var(--accent-green)' }} />
        <p style={{ color: 'var(--text-secondary)' }}>AI is analyzing your environmental impact...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Carbon <span className="gradient-text">Impact Dashboard</span></h1>
        <button className="btn-primary" onClick={() => window.print()}>
          <Download size={18} /> Export Report
        </button>
      </div>

      {error && (
        <div className="glass-card" style={{ padding: '1rem', borderLeft: '4px solid #ef4444', marginBottom: '2rem' }}>
          <p style={{ color: '#ef4444' }}>{error}</p>
          <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Note: AI analysis requires a Gemini API Key in .env</p>
        </div>
      )}

      <div className="grid-cols-2">
        {/* Main Scores */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <motion.div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }} whileHover={{ scale: 1.02 }}>
            <h3 style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Monthly Carbon Footprint</h3>
            <div style={{ fontSize: '4rem', fontWeight: 800 }}>{results?.total} <span style={{ fontSize: '1.5rem', fontWeight: 500 }}>kg CO₂e</span></div>
            <p style={{ marginTop: '0.5rem', opacity: 0.8 }}>Estimated impact this month</p>
          </motion.div>

          <motion.div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }} whileHover={{ scale: 1.02 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <ShieldCheck style={{ color: 'var(--accent-green)' }} />
              <h3 style={{ color: 'var(--text-secondary)' }}>Sustainability Score</h3>
            </div>
            <div style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--accent-green)' }}>{aiData?.sustainabilityScore || '--'} <span style={{ fontSize: '1.5rem', fontWeight: 500 }}>/ 100</span></div>
            <p style={{ marginTop: '0.5rem', opacity: 0.8 }}>Based on AI behavioral analysis</p>
          </motion.div>
        </div>

        {/* Breakdown Chart */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '2rem' }}>Emission Breakdown</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={results?.breakdown}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {results?.breakdown.map((_entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ReTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            {results?.breakdown.map((entry: any, index: number) => (
              <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '12px', height: '12px', background: COLORS[index], borderRadius: '50%' }} />
                <span style={{ fontSize: '0.875rem' }}>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights Section */}
      <div style={{ marginTop: '3rem' }}>
        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Lightbulb style={{ color: '#f59e0b' }} /> AI Sustainability Advisor
        </h2>
        
        <div className="grid-cols-2">
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--accent-green)' }}>Major Emission Sources</h4>
            <ul style={{ listStyle: 'none' }}>
              {aiData?.majorSources?.map((source: string, idx: number) => (
                <li key={idx} style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                  <TrendingDown style={{ color: '#ef4444', flexShrink: 0 }} size={18} />
                  <span>{source}</span>
                </li>
              ))}
              {!aiData && <li style={{ color: 'var(--text-secondary)' }}>Analysis pending...</li>}
            </ul>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--accent-blue)' }}>Personalized Tips</h4>
            <ul style={{ listStyle: 'none' }}>
              {aiData?.suggestions?.map((tip: string, idx: number) => (
                <li key={idx} style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                  <Lightbulb style={{ color: '#f59e0b', flexShrink: 0 }} size={18} />
                  <span>{tip}</span>
                </li>
              ))}
              {!aiData && <li style={{ color: 'var(--text-secondary)' }}>Tips will appear here...</li>}
            </ul>
          </div>
        </div>
      </div>

      {/* Challenges Section */}
      <div style={{ marginTop: '3rem' }}>
        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Target style={{ color: 'var(--accent-green)' }} /> Eco Challenges & Goals
        </h2>
        <div className="grid-cols-2">
          <div className="glass-card" style={{ padding: '2rem', borderTop: '4px solid var(--accent-green)' }}>
            <h4 style={{ marginBottom: '1.25rem' }}>Daily Challenges</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {aiData?.dailyChallenges?.map((challenge: string, idx: number) => (
                <div key={idx} style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem' }}>
                  {challenge}
                </div>
              ))}
              {!aiData && <p style={{ color: 'var(--text-secondary)' }}>Loading daily tasks...</p>}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '2rem', borderTop: '4px solid var(--accent-blue)' }}>
            <h4 style={{ marginBottom: '1.25rem' }}>Weekly Sustainability Goals</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {aiData?.weeklyGoals?.map((goal: string, idx: number) => (
                <div key={idx} style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem' }}>
                  {goal}
                </div>
              ))}
              {!aiData && <p style={{ color: 'var(--text-secondary)' }}>Loading weekly targets...</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
