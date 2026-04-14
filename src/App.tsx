import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Scheduling from './pages/Scheduling';
import Batches from './pages/Batches';
import Resources from './pages/Resources';
import Analytics from './pages/Analytics';

function OwnerOnly({ children }: { children: React.ReactNode }) {
  const { role } = useAuth();
  if (role !== 'owner') return <Navigate to="/" replace />;
  return <>{children}</>;
}

function Layout() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return <Login />;

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <main className="flex-1 ml-64 p-6 lg:p-8 max-w-[1400px]">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/scheduling" element={<Scheduling />} />
          <Route path="/batches" element={<Batches />} />
          <Route path="/resources" element={<OwnerOnly><Resources /></OwnerOnly>} />
          <Route path="/analytics" element={<OwnerOnly><Analytics /></OwnerOnly>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
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
