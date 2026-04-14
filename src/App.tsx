import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Menu, Wheat } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Scheduling from './pages/Scheduling';
import Batches from './pages/Batches';
import Resources from './pages/Resources';
import Costs from './pages/Costs';
import Analytics from './pages/Analytics';

function OwnerOnly({ children }: { children: React.ReactNode }) {
  const { role } = useAuth();
  if (role !== 'owner') return <Navigate to="/" replace />;
  return <>{children}</>;
}

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/transactions': 'Transactions',
  '/scheduling': 'Scheduling',
  '/batches': 'Batch Tracking',
  '/resources': 'Resources',
  '/costs': 'Operational Costs',
  '/analytics': 'Analytics',
};

function Layout() {
  const { isLoggedIn } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (!isLoggedIn) return <Login />;

  const title = pageTitles[location.pathname] || 'AgriVision';

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:ml-64">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-100 px-4 py-3 lg:hidden flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Wheat size={14} className="text-white" />
            </div>
            <span className="font-semibold text-slate-800 text-sm">{title}</span>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 max-w-[1400px]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/scheduling" element={<Scheduling />} />
            <Route path="/batches" element={<Batches />} />
            <Route path="/resources" element={<OwnerOnly><Resources /></OwnerOnly>} />
            <Route path="/costs" element={<OwnerOnly><Costs /></OwnerOnly>} />
            <Route path="/analytics" element={<OwnerOnly><Analytics /></OwnerOnly>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}
