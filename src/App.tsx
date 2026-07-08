// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import LandingPage from './LandingPage';
import MitraChat from './MitraChat'; // Using your existing component
import MoodLogger from './MoodLogger';
import AnimatedPage from "./AnimatedPage"
import './index.css'
const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={<AnimatedPage><LandingPage /></AnimatedPage>}
        />
        <Route
          path="/chat"
          element={<AnimatedPage><MitraChat /></AnimatedPage>}
        />
        <Route
          path="/log-mood"
          element={<AnimatedPage><MoodLogger /></AnimatedPage>}
        />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;