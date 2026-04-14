import { useState } from 'react';
import { CalendarClock, Droplets, Truck, Package, Users, AlertTriangle } from 'lucide-react';
import { schedules } from '../data/mockData';

const serviceIcons = {
  Drying: Droplets,
  Hauling: Truck,
  Delivery: Package,
  Worker: Users,
};

const serviceColors = {
  Drying: { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'bg-amber-100 text-amber-600', badge: 'bg-amber-100 text-amber-700' },
  Hauling: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'bg-blue-100 text-blue-600', badge: 'bg-blue-100 text-blue-700' },
  Delivery: { bg: 'bg-green-50', border: 'border-green-200', icon: 'bg-green-100 text-green-600', badge: 'bg-green-100 text-green-700' },
  Worker: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'bg-purple-100 text-purple-600', badge: 'bg-purple-100 text-purple-700' },
};

export default function Scheduling() {
  const [dateFilter, setDateFilter] = useState('2026-04-14');
  const [serviceFilter, setServiceFilter] = useState<string>('All');

  const filtered = schedules.filter((s) => {
    if (dateFilter && s.date !== dateFilter) return false;
    if (serviceFilter !== 'All' && s.service !== serviceFilter) return false;
    return true;
  });

  const dates = [...new Set(schedules.map((s) => s.date))].sort();
  const services = ['All', 'Drying', 'Hauling', 'Delivery', 'Worker'];

  const serviceCount = (svc: string) => filtered.filter(s => s.service === svc).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Service Scheduling</h1>
        <p className="text-slate-500 text-sm mt-1">Schedule and manage all trading services — drying, hauling, delivery, and worker deployment</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {(['Drying', 'Hauling', 'Delivery', 'Worker'] as const).map((svc) => {
          const Icon = serviceIcons[svc];
          const colors = serviceColors[svc];
          return (
            <div key={svc} className={`rounded-xl p-4 border ${colors.bg} ${colors.border}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors.icon}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">{svc}</p>
                  <p className="text-lg font-bold text-slate-800">{serviceCount(svc)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-slate-100">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <CalendarClock size={16} className="text-slate-400" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:border-primary outline-none"
            >
              {dates.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {services.map((s) => (
              <button
                key={s}
                onClick={() => setServiceFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  serviceFilter === s ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <CalendarClock size={40} className="mx-auto mb-3 opacity-50" />
              <p>No scheduled activities for this date/filter</p>
            </div>
          )}
          {filtered.map((s) => {
            const Icon = serviceIcons[s.service];
            const colors = serviceColors[s.service];
            return (
              <div key={s.id} className={`rounded-xl p-4 border ${colors.bg} ${colors.border} flex flex-col sm:flex-row sm:items-center gap-4`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${colors.icon}`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors.badge}`}>{s.service}</span>
                    <span className="text-xs text-slate-500">{s.id}</span>
                    {s.status === 'Conflict' && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700 flex items-center gap-1">
                        <AlertTriangle size={10} /> Conflict
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-slate-800 mt-1">{s.resource}</p>
                  <p className="text-xs text-slate-600">{s.assignedTo} &middot; {s.details}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-medium text-slate-700">{s.timeSlot}</p>
                  <span className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                    s.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    s.status === 'In Progress' ? 'bg-amber-100 text-amber-700' :
                    s.status === 'Conflict' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {s.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
