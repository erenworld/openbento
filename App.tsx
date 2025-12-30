import React, { useState, Suspense } from 'react';
import Builder from './components/Builder';
import { motion, AnimatePresence } from 'framer-motion';

const ENABLE_LANDING = import.meta.env.VITE_ENABLE_LANDING === 'true';
const LazyLandingPage = ENABLE_LANDING ? React.lazy(() => import('./components/LandingPage')) : null;

function App() {
  const [page, setPage] = useState<'landing' | 'builder'>(ENABLE_LANDING ? 'landing' : 'builder');

  if (!ENABLE_LANDING) {
    return <Builder />;
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center text-gray-400">Loading...</div>}>
      <AnimatePresence mode="wait">
        {page === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {LazyLandingPage ? <LazyLandingPage onStart={() => setPage('builder')} /> : null}
          </motion.div>
        ) : (
          <motion.div
            key="builder"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
          >
            <Builder onBack={() => setPage('landing')} />
          </motion.div>
        )}
      </AnimatePresence>
    </Suspense>
  );
}

export default App;
