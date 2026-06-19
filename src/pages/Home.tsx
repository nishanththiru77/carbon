import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Zap, Globe, ArrowRight, Lightbulb } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <section style={{ textAlign: 'center', padding: '4rem 0' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
            Empower Your Journey to <br />
            <span className="gradient-text">Sustainability</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Calculate your carbon footprint, get AI-powered insights, and join the movement to save our planet.
          </p>
          <div className="flex-center" style={{ gap: '1rem' }}>
            <Link to="/calculator" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Start Calculating <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>
      </section>

      <div className="grid-cols-2" style={{ marginTop: '2rem' }}>
        <motion.div 
          className="glass-card" 
          style={{ padding: '2.5rem' }}
          whileHover={{ translateY: -5 }}
        >
          <Leaf className="gradient-text" style={{ marginBottom: '1rem' }} size={40} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>AI Analysis</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Our Gemini-powered AI analyzes your habits and provides personalized recommendations to reduce your environmental impact.
          </p>
        </motion.div>

        <motion.div 
          className="glass-card" 
          style={{ padding: '2.5rem' }}
          whileHover={{ translateY: -5 }}
        >
          <Zap className="gradient-text" style={{ marginBottom: '1rem' }} size={40} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Actionable Insights</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Get clear, data-driven targets and track your progress as you transition to a greener lifestyle.
          </p>
        </motion.div>
      </div>

      <section style={{ marginTop: '4rem', textAlign: 'center', padding: '2rem' }} className="glass-card">
        <Globe className="gradient-text" style={{ marginBottom: '1rem' }} size={60} />
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Ready to make a difference?</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Small changes lead to big results. Join thousands of users making the world better.
        </p>
        <Link to="/calculator" className="btn-primary" style={{ margin: '0 auto', width: 'fit-content' }}>
          Get Started
        </Link>
      </section>

      <section style={{ marginTop: '4rem', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Lightbulb className="gradient-text" style={{ stroke: 'var(--accent-green)' }} /> 
          Quick Sustainability <span className="gradient-text">Tips</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {[
            "Unplug electronics when not in use to avoid 'vampire' energy drain.",
            "Choose local and seasonal produce to reduce transportation emissions.",
            "Switch to LED bulbs—they use 75% less energy than regular bulbs.",
            "Try a meatless day once a week to lower your dietary footprint."
          ].map((tip, i) => (
            <div key={i} className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-green)' }}>
              {tip}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
