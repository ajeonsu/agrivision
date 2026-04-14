import { useState } from 'react';
import { Wrench, Users, Truck, Activity } from 'lucide-react';
import { resources } from '../data/mockData';

const typeIcons = { Machine: Wrench, Worker: Users, Vehicle: Truck };
const typeColors = {
  Machine: { card: 'border-l-amber-400', icon: 'bg-amber-100 text-amber-600' },
  Worker: { card: 'border-l-purple-400', icon: 'bg-purple-100 text-purple-600' },
  Vehicle: { card: 'border-l-blue-400', icon: 'bg-blue-100 text-blue-600' },
};

const statusStyle: Record<string, string> = {
  Active: 'bg-green-100 text-green-700',
  Idle: 'bg-slate-100 text-slate-600',
  Maintenance: 'bg-red-100 text-red-700',
  'On Leave': 'bg-amber-100 text-amber-700',
};

export default function Resources() {
  const [typeFilter, setTypeFilter] = useState<string>('All');

  const filtered = typeFilter === 'All' ? resources : resources.filter(r => r.type === typeFilter);

  const counts = {
    Machine: resources.filter(r => r.type === 'Machine').length,
    Worker: resources.filter(r => r.type === 'Worker').length,
    Vehicle: resources.filter(r => r.type === 'Vehicle').length,
  };

  const activeCount = resources.filter(r => r.status === 'Active').length;
  const maintenanceCount = resources.filter(r => r.status === 'Maintenance' || r.status === 'On Leave').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Resource Management</h1>
        <p className="text-slate-500 text-sm mt-1">Track and manage key business assets — machines, workers, and vehicles</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-card rounded-xl p-4 shadow-sm border border-slate-100 text-center">
          <p className="text-2xl font-bold text-slate-800">{resources.length}</p>
          <p className="text-xs text-slate-500 mt-1">Total Resources</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-sm border border-slate-100 text-center">
          <p className="text-2xl font-bold text-green-600">{activeCount}</p>
          <p className="text-xs text-slate-500 mt-1">Active</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-sm border border-slate-100 text-center">
          <p className="text-2xl font-bold text-amber-600">{counts.Machine}</p>
          <p className="text-xs text-slate-500 mt-1">Machines</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-sm border border-slate-100 text-center">
          <p className="text-2xl font-bold text-purple-600">{counts.Worker}</p>
          <p className="text-xs text-slate-500 mt-1">Workers</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-sm border border-slate-100 text-center">
          <p className="text-2xl font-bold text-blue-600">{counts.Vehicle}</p>
          <p className="text-xs text-slate-500 mt-1">Vehicles</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {['All', 'Machine', 'Worker', 'Vehicle'].map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              typeFilter === t ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'bg-card text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t === 'All' ? 'All Resources' : `${t}s`}
          </button>
        ))}
      </div>

      {maintenanceCount > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <Activity size={18} className="text-red-500" />
          <p className="text-sm text-red-700">
            <span className="font-semibold">{maintenanceCount} resource(s)</span> currently in maintenance or on leave
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((r) => {
          const Icon = typeIcons[r.type];
          const colors = typeColors[r.type];
          return (
            <div key={r.id} className={`bg-card rounded-xl shadow-sm border border-slate-100 border-l-4 ${colors.card} p-5 hover:shadow-md transition-shadow`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.icon}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{r.name}</p>
                    <p className="text-xs text-slate-500">{r.id} &middot; {r.type}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusStyle[r.status]}`}>
                  {r.status}
                </span>
              </div>

              <p className="text-xs text-slate-600 mb-3">{r.details}</p>

              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Utilization</span>
                  <span className={`font-medium ${r.utilization >= 70 ? 'text-green-600' : r.utilization >= 40 ? 'text-amber-600' : 'text-red-500'}`}>
                    {r.utilization}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      r.utilization >= 70 ? 'bg-green-400' : r.utilization >= 40 ? 'bg-amber-400' : 'bg-red-400'
                    }`}
                    style={{ width: `${r.utilization}%` }}
                  />
                </div>
              </div>

              <p className="text-xs text-slate-400">Last: {r.lastActivity}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
