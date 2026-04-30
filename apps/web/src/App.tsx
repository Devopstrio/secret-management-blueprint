import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import SecretsDashboard from './pages/SecretsDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400">The secret management engine is currently orchestrating security workflows. This module will be available shortly.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<SecretsDashboard />} />
          <Route path="/secrets" element={<Placeholder name="Secret Explorer Hub" />} />
          <Route path="/access" element={<Placeholder name="Access Control Policies" />} />
          <Route path="/rotation" element={<Placeholder name="Secret Rotation Orchestration" />} />
          <Route path="/encryption" element={<Placeholder name="Encryption Engine Status" />} />
          <Route path="/audit" element={<Placeholder name="Vault Audit Logs" />} />
          <Route path="/governance" element={<Placeholder name="Security Governance Dashboard" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
