import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Career from './pages/Career';
import Publications from './pages/Publications';
import Projects from './pages/Projects';
import Awards from './pages/Awards';
import RoleDetail from './pages/RoleDetail';
import PublicationDetail from './pages/PublicationDetail';
import { DataProvider } from './DataContext';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/career" replace />} />
        <Route path="/career" element={<Career />} />
        <Route path="/career/:id" element={<RoleDetail />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/publications/:id" element={<PublicationDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="*" element={<Navigate to="/career" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <DataProvider>
      <Router>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </Router>
    </DataProvider>
  );
}

export default App;
