import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Zap, Plane, Utensils, Users, ArrowRight, ArrowLeft, Send } from 'lucide-react';
import { CarbonData, calculateFootprint } from '../utils/calculations';
import { saveReport } from '../utils/storage';

const Calculator: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CarbonData>({
    transportation: { milesPerMonth: 0, mode: 'car' },
    electricity: 0,
    flights: 0,
    foodPreference: 'non-vegetarian',
    householdSize: 1
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = () => {
    const results = calculateFootprint(formData);
    const report = {
      inputs: formData,
      results: results,
    };
    saveReport(report);
    navigate('/dashboard', { state: { results, inputs: formData } });
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 style={{ marginBottom: '2rem' }}><Car size={24} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> Transportation</h2>
            <div style={{ marginBottom: '1.5rem' }}>
              <label>Mode of Transport</label>
              <select 
                className="input-field" 
                value={formData.transportation.mode}
                onChange={(e) => setFormData({...formData, transportation: {...formData.transportation, mode: e.target.value as any}})}
                style={{ marginTop: '0.5rem' }}
              >
                <option value="car">Car</option>
                <option value="bike">Bike / Motorcycle</option>
                <option value="public_transport">Public Transport</option>
              </select>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label>Avg. Miles per Month</label>
              <input 
                type="number" 
                className="input-field" 
                value={formData.transportation.milesPerMonth}
                onChange={(e) => setFormData({...formData, transportation: {...formData.transportation, milesPerMonth: Number(e.target.value)}})}
                style={{ marginTop: '0.5rem' }}
              />
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 style={{ marginBottom: '2rem' }}><Zap size={24} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> Energy & Housing</h2>
            <div style={{ marginBottom: '1.5rem' }}>
              <label>Monthly Electricity Usage (kWh)</label>
              <input 
                type="number" 
                className="input-field" 
                value={formData.electricity}
                onChange={(e) => setFormData({...formData, electricity: Number(e.target.value)})}
                style={{ marginTop: '0.5rem' }}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label>Household Size (Number of people)</label>
              <input 
                type="number" 
                className="input-field" 
                value={formData.householdSize}
                onChange={(e) => setFormData({...formData, householdSize: Number(e.target.value)})}
                style={{ marginTop: '0.5rem' }}
              />
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 style={{ marginBottom: '2rem' }}><Plane size={24} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> Travel & Food</h2>
            <div style={{ marginBottom: '1.5rem' }}>
              <label>Annual Flight Hours</label>
              <input 
                type="number" 
                className="input-field" 
                value={formData.flights}
                onChange={(e) => setFormData({...formData, flights: Number(e.target.value)})}
                style={{ marginTop: '0.5rem' }}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label>Dietary Preference</label>
              <select 
                className="input-field" 
                value={formData.foodPreference}
                onChange={(e) => setFormData({...formData, foodPreference: e.target.value as any})}
                style={{ marginTop: '0.5rem' }}
              >
                <option value="non-vegetarian">Non-Vegetarian</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-center" style={{ minHeight: '80vh' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '600px', padding: '3rem' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', height: '4px', borderRadius: '2px', overflow: 'hidden' }}>
            <motion.div 
              style={{ background: 'var(--gradient-primary)', height: '100%' }} 
              initial={{ width: '0%' }}
              animate={{ width: `${(step/3) * 100}%` }}
            />
          </div>
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Step {step} of 3</p>
        </div>

        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
          {step > 1 && (
            <button className="btn-primary" onClick={prevStep} style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
              <ArrowLeft size={20} /> Back
            </button>
          )}
          <div style={{ marginLeft: 'auto' }}>
            {step < 3 ? (
              <button className="btn-primary" onClick={nextStep}>
                Continue <ArrowRight size={20} />
              </button>
            ) : (
              <button className="btn-primary" onClick={handleSubmit}>
                Generate Report <Send size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
