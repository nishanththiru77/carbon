import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, BarChart3, Calculator as CalcIcon, FileText, Home } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Calculator', path: '/calculator', icon: <CalcIcon size={18} /> },
    { name: 'Dashboard', path: '/dashboard', icon: <BarChart3 size={18} /> },
    { name: 'Reports', path: '/reports', icon: <FileText size={18} /> },
  ];

  return (
    <nav className="glass-card" style={{ 
      margin: '1rem', 
      padding: '0.75rem 2rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      position: 'sticky',
      top: '1rem',
      zIndex: 1000,
      borderRadius: '1rem'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
        <Leaf className="gradient-text" style={{ stroke: 'var(--accent-green)' }} size={28} />
        <span className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>CarbonWise AI</span>
      </Link>

      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              textDecoration: 'none',
              color: location.pathname === item.path ? 'var(--accent-green)' : 'var(--text-secondary)',
              transition: 'color 0.3s ease',
              fontWeight: 500
            }}
          >
            {item.icon}
            <span className="nav-label">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
