import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { AnalysisProvider } from './context/AnalysisContext';
import { ConsentProvider } from './context/ConsentContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { StickyMobileCTA } from './components/layout/StickyMobileCTA';
import { CookieBanner } from './components/layout/CookieBanner';
import { SkipLink } from './components/ui/SkipLink';

// Route Pages
import { Home } from './routes/Home';
import { Analyzer } from './routes/Analyzer';
import { CaseStudies } from './routes/CaseStudies';
import { CaseDetail } from './routes/CaseDetail';
import { Simulator } from './routes/Simulator';
import { EvidenceStudio } from './routes/EvidenceStudio';
import { Login } from './routes/Login';
import { Register } from './routes/Register';
import { ThankYou } from './routes/ThankYou';
import { NotFound } from './routes/NotFound';
import { Forbidden } from './routes/Forbidden';
import { Terms } from './routes/Terms';
import { Privacy } from './routes/Privacy';
import { Cookies } from './routes/Cookies';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-forensic-950 text-slate-100 selection:bg-evidence-cyan selection:text-forensic-950 relative">
      <SkipLink />
      <Header />
      <main id="main-content" className="flex-1 flex flex-col focus:outline-none" tabIndex={-1}>
        <Suspense
          fallback={
            <div className="flex-1 flex items-center justify-center p-12">
              <div className="w-8 h-8 rounded-full border-2 border-evidence-cyan border-t-transparent animate-spin" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <StickyMobileCTA />
      <CookieBanner />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <AnalysisProvider>
          <ConsentProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/analyzer" element={<Analyzer />} />
                  <Route path="/case-studies" element={<CaseStudies />} />
                  <Route path="/case-studies/:slug" element={<CaseDetail />} />
                  <Route path="/simulator" element={<Simulator />} />
                  <Route path="/evidence-studio" element={<EvidenceStudio />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/thank-you" element={<ThankYou />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/cookies" element={<Cookies />} />
                  <Route path="/forbidden" element={<Forbidden />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ConsentProvider>
        </AnalysisProvider>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;
