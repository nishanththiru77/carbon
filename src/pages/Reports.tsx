import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, Trash2, ChevronRight, Leaf } from 'lucide-react';
import { getReports, clearReports } from '../utils/storage';

const Reports: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    setReports(getReports());
  }, []);

  const handleClear = () => {
    if (confirm("Are you sure you want to clear all report history?")) {
      clearReports();
      setReports([]);
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Your Sustainability <span className="gradient-text">Reports</span></h1>
        {reports.length > 0 && (
          <button onClick={handleClear} style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Trash2 size={16} /> Clear History
          </button>
        )}
      </div>

      {reports.length === 0 ? (
        <div className="glass-card flex-center" style={{ padding: '5rem', flexDirection: 'column', gap: '1.5rem' }}>
          <FileText size={48} style={{ color: 'var(--text-secondary)' }} />
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem' }}>No reports found. Start by calculating your footprint!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {reports.map((report, idx) => (
            <motion.div 
              key={report.id}
              className="glass-card" 
              style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              whileHover={{ scale: 1.01, borderLeft: '4px solid var(--accent-green)' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    <Calendar size={14} />
                    {new Date(report.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '0.25rem' }}>
                    Calculation #{reports.length - idx}
                  </div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Footprint</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{report.results.total} kg</div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Mode</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--accent-blue)', textTransform: 'capitalize' }}>
                    {report.inputs.transportation.mode.replace('_', ' ')}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                   {report.results.breakdown.map((item: any, i: number) => (
                     <div key={i} title={`${item.name}: ${item.value}kg`} style={{ 
                       height: '8px', 
                       width: '30px', 
                       background: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'][i], 
                       borderRadius: '4px' 
                    }} />
                   ))}
                </div>
                <ChevronRight style={{ color: 'var(--text-secondary)' }} />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {reports.length > 0 && (
        <section style={{ marginTop: '4rem', padding: '2.5rem' }} className="glass-card">
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <div style={{ background: 'var(--gradient-primary)', padding: '1.5rem', borderRadius: '1rem' }}>
              <Leaf size={40} color="white" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Your Progress Over Time</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Keep tracking your habits to see how your sustainability score improves. 
                Consistency is key to a greener future.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Reports;
