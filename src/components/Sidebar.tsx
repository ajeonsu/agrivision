import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ArrowLeftRight,
  CalendarClock,
  Boxes,
  Wrench,
  BarChart3,
  LogOut,
  Wheat,
  Shield,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type Link = {
  to: string;
  icon: typeof LayoutDashboard;
  label: string;
  ownerOnly?: boolean;
};

const links: Link[] = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { to: '/scheduling', icon: CalendarClock, label: 'Scheduling' },
  { to: '/batches', icon: Boxes, label: 'Batch Tracking' },
  { to: '/resources', icon: Wrench, label: 'Resources', ownerOnly: true },
  { to: '/analytics', icon: BarChart3, label: 'Analytics', ownerOnly: true },
];

export default function Sidebar() {
  const { logout, user, role } = useAuth();

  const visibleLinks = links.filter((l) => !l.ownerOnly || role === 'owner');

  return (
    <aside className="w-64 bg-sidebar text-white flex flex-col min-h-screen fixed left-0 top-0 z-30">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Wheat size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">AgriVision</h1>
            <p className="text-xs text-slate-400">Palay Trading System</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1">
        {visibleLinks.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'text-slate-300 hover:bg-sidebar-hover hover:text-white'
              }`
            }
          >
            <l.icon size={18} />
            {l.label}
          </NavLink>
        ))}

        {role === 'staff' && (
          <div className="mt-4 mx-1 p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Shield size={14} />
              <span>Staff Access</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
              Analytics & Resources are restricted to owner accounts.
            </p>
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            role === 'owner'
              ? 'bg-amber-500/30 text-amber-300'
              : 'bg-primary/30 text-primary-light'
          }`}>
            {user.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user}</p>
            <p className={`text-xs capitalize ${
              role === 'owner' ? 'text-amber-400' : 'text-slate-400'
            }`}>
              {role === 'owner' ? 'Owner / Admin' : 'Staff'}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 transition-colors w-full"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
