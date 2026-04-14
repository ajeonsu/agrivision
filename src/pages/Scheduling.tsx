import { useState } from 'react';
import { CalendarClock, Droplets, Truck, Package, Users, AlertTriangle, Plus, Check } from 'lucide-react';
import { schedules as initialSchedules, type ScheduleItem, resources } from '../data/mockData';
import Modal from '../components/Modal';

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

const resourceOptions: Record<string, string[]> = {
  Drying: resources.filter(r => r.type === 'Machine' && r.name.includes('Dry')).map(r => r.name),
  Hauling: resources.filter(r => r.type === 'Vehicle').map(r => r.name),
  Delivery: resources.filter(r => r.type === 'Vehicle').map(r => r.name),
  Worker: resources.filter(r => r.type === 'Worker').map(r => r.name),
};

export default function Scheduling() {
  const [items, setItems] = useState<ScheduleItem[]>(initialSchedules);
  const [dateFilter, setDateFilter] = useState('2026-04-14');
  const [serviceFilter, setServiceFilter] = useState<string>('All');
  const [showForm, setShowForm] = useState(false);
  const [conflict, setConflict] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    date: '2026-04-14',
    service: 'Drying' as ScheduleItem['service'],
    resource: '',
    assignedTo: '',
    timeStart: '06:00',
    timeEnd: '18:00',
    details: '',
  });

  const filtered = items.filter((s) => {
    if (dateFilter && s.date !== dateFilter) return false;
    if (serviceFilter !== 'All' && s.service !== serviceFilter) return false;
    return true;
  });

  const dates = [...new Set(items.map((s) => s.date))].sort();
  if (!dates.includes(form.date) && form.date) dates.push(form.date);
  dates.sort();
  const services = ['All', 'Drying', 'Hauling', 'Delivery', 'Worker'];

  const serviceCount = (svc: string) => filtered.filter(s => s.service === svc).length;

  const checkConflict = () => {
    const overlapping = items.find(
      (s) =>
        s.date === form.date &&
        s.resource === form.resource &&
        s.status !== 'Completed'
    );
    return overlapping;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.resource || !form.assignedTo) return;

    const existing = checkConflict();
    if (existing) {
      setConflict(`"${existing.resource}" is already scheduled on ${existing.date} (${existing.timeSlot}) for ${existing.details}. Please choose a different resource or date.`);
      return;
    }

    const newItem: ScheduleItem = {
      id: `SCH-${String(items.length + 1).padStart(3, '0')}`,
      date: form.date,
      service: form.service,
      resource: form.resource,
      assignedTo: form.assignedTo,
      timeSlot: `${form.timeStart} - ${form.timeEnd}`,
      status: 'Scheduled',
      details: form.details,
    };

    setItems([...items, newItem]);
    setShowForm(false);
    setConflict(null);
    setForm({ date: '2026-04-14', service: 'Drying', resource: '', assignedTo: '', timeStart: '06:00', timeEnd: '18:00', details: '' });
    if (!dates.includes(newItem.date)) setDateFilter(newItem.date);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Service Scheduling</h1>
          <p className="text-slate-500 text-sm mt-1">Schedule and manage all trading services with conflict detection</p>
        </div>
        <button onClick={() => { setShowForm(true); setConflict(null); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-primary/25">
          <Plus size={16} />
          Add Schedule
        </button>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <Check size={18} className="text-green-600" />
          <p className="text-sm text-green-700 font-medium">Schedule created successfully!</p>
        </div>
      )}

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
            <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:border-primary outline-none">
              {dates.map((d) => (<option key={d} value={d}>{d}</option>))}
            </select>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {services.map((s) => (
              <button key={s} onClick={() => setServiceFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  serviceFilter === s ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}>
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

      <Modal open={showForm} onClose={() => { setShowForm(false); setConflict(null); }} title="Create New Schedule">
        <form onSubmit={handleSubmit} className="space-y-4">
          {conflict && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800">Schedule Conflict Detected</p>
                <p className="text-xs text-red-600 mt-0.5">{conflict}</p>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Service Type</label>
            <div className="grid grid-cols-2 gap-2">
              {(['Drying', 'Hauling', 'Delivery', 'Worker'] as const).map((s) => (
                <button key={s} type="button"
                  onClick={() => setForm({ ...form, service: s, resource: '' })}
                  className={`py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                    form.service === s
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Date</label>
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Resource</label>
            <select value={form.resource} onChange={(e) => { setForm({ ...form, resource: e.target.value }); setConflict(null); }}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-primary outline-none">
              <option value="">Select a resource...</option>
              {(resourceOptions[form.service] || []).map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Assigned To</label>
            <input type="text" value={form.assignedTo} onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
              placeholder="e.g. Batch-044, Driver: Miguel Torres"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Start Time</label>
              <input type="time" value={form.timeStart} onChange={(e) => setForm({ ...form, timeStart: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">End Time</label>
              <input type="time" value={form.timeEnd} onChange={(e) => setForm({ ...form, timeEnd: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Details</label>
            <input type="text" value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })}
              placeholder="e.g. 2,500 kg - Juan Dela Cruz"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
          </div>

          <button type="submit"
            className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium text-sm transition-colors">
            Create Schedule
          </button>
        </form>
      </Modal>
    </div>
  );
}
