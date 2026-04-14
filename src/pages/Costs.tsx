import { useState } from 'react';
import { Fuel, Wrench, Users, Plus, Check, Wallet } from 'lucide-react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from 'recharts';
import Modal from '../components/Modal';

const peso = (n: number) => '₱' + n.toLocaleString();

type CostEntry = {
  id: string;
  date: string;
  category: 'Labor' | 'Fuel' | 'Maintenance';
  description: string;
  amount: number;
};

const initialCosts: CostEntry[] = [
  { id: 'C-001', date: '2026-04-14', category: 'Fuel', description: 'Diesel for Mechanical Dryer #1 - 50L', amount: 3250 },
  { id: 'C-002', date: '2026-04-14', category: 'Labor', description: 'Labor Team A - Drying ops (4 pax x ₱500)', amount: 2000 },
  { id: 'C-003', date: '2026-04-14', category: 'Fuel', description: 'Diesel for Truck #1 - Hauling trip', amount: 1800 },
  { id: 'C-004', date: '2026-04-13', category: 'Labor', description: 'Labor Team B - Warehouse ops (3 pax x ₱500)', amount: 1500 },
  { id: 'C-005', date: '2026-04-13', category: 'Fuel', description: 'Diesel for Mechanical Dryer #2 - 45L', amount: 2925 },
  { id: 'C-006', date: '2026-04-13', category: 'Labor', description: 'Driver Miguel Torres - Hauling', amount: 800 },
  { id: 'C-007', date: '2026-04-12', category: 'Maintenance', description: 'Multicab engine repair - parts + labor', amount: 4500 },
  { id: 'C-008', date: '2026-04-12', category: 'Fuel', description: 'Diesel for Truck #2 - Delivery trip', amount: 2100 },
  { id: 'C-009', date: '2026-04-11', category: 'Labor', description: 'Labor Team A - Loading/unloading (4 pax x ₱500)', amount: 2000 },
  { id: 'C-010', date: '2026-04-11', category: 'Maintenance', description: 'Weighing scale calibration', amount: 1200 },
  { id: 'C-011', date: '2026-04-10', category: 'Fuel', description: 'Diesel for Mechanical Dryer #1 - 48L', amount: 3120 },
  { id: 'C-012', date: '2026-04-10', category: 'Labor', description: 'Driver Carlos Ramos - Delivery', amount: 800 },
];

const monthlyCostData = [
  { month: 'Jan', labor: 42000, fuel: 68000, maintenance: 15000 },
  { month: 'Feb', labor: 48000, fuel: 72000, maintenance: 12000 },
  { month: 'Mar', labor: 45000, fuel: 65000, maintenance: 18000 },
  { month: 'Apr', labor: 58000, fuel: 88000, maintenance: 22000 },
  { month: 'May', labor: 72000, fuel: 105000, maintenance: 16000 },
  { month: 'Jun', labor: 65000, fuel: 95000, maintenance: 20000 },
];

const catColors = { Labor: '#8b5cf6', Fuel: '#f59e0b', Maintenance: '#ef4444' };
const catIcons = { Labor: Users, Fuel: Fuel, Maintenance: Wrench };

export default function Costs() {
  const [costs, setCosts] = useState<CostEntry[]>(initialCosts);
  const [showForm, setShowForm] = useState(false);
  const [saved, setSaved] = useState(false);
  const [catFilter, setCatFilter] = useState<string>('All');

  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    category: 'Labor' as CostEntry['category'],
    description: '',
    amount: '',
  });

  const filtered = catFilter === 'All' ? costs : costs.filter(c => c.category === catFilter);

  const totalLabor = costs.filter(c => c.category === 'Labor').reduce((s, c) => s + c.amount, 0);
  const totalFuel = costs.filter(c => c.category === 'Fuel').reduce((s, c) => s + c.amount, 0);
  const totalMaint = costs.filter(c => c.category === 'Maintenance').reduce((s, c) => s + c.amount, 0);
  const totalAll = totalLabor + totalFuel + totalMaint;

  const pieData = [
    { name: 'Labor', value: totalLabor },
    { name: 'Fuel', value: totalFuel },
    { name: 'Maintenance', value: totalMaint },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(form.amount);
    if (!form.description || isNaN(amt)) return;

    const entry: CostEntry = {
      id: `C-${String(costs.length + 1).padStart(3, '0')}`,
      date: form.date,
      category: form.category,
      description: form.description,
      amount: amt,
    };

    setCosts([entry, ...costs]);
    setShowForm(false);
    setForm({ date: new Date().toISOString().slice(0, 10), category: 'Labor', description: '', amount: '' });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Operational Costs</h1>
          <p className="text-slate-500 text-sm mt-1">Track and manage labor, fuel, and maintenance expenses</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-primary/25">
          <Plus size={16} />
          Record Cost
        </button>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <Check size={18} className="text-green-600" />
          <p className="text-sm text-green-700 font-medium">Cost entry recorded successfully!</p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center"><Wallet size={18} className="text-slate-600" /></div>
            <div>
              <p className="text-xs text-slate-500">Total Costs</p>
              <p className="text-lg font-bold text-slate-800">{peso(totalAll)}</p>
            </div>
          </div>
        </div>
        {(['Labor', 'Fuel', 'Maintenance'] as const).map((cat) => {
          const Icon = catIcons[cat];
          const total = cat === 'Labor' ? totalLabor : cat === 'Fuel' ? totalFuel : totalMaint;
          return (
            <div key={cat} className="bg-card rounded-xl p-5 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: catColors[cat] + '20' }}>
                  <Icon size={18} style={{ color: catColors[cat] }} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">{cat}</p>
                  <p className="text-lg font-bold text-slate-800">{peso(total)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl shadow-sm border border-slate-100 p-5">
          <h3 className="text-base font-semibold text-slate-800 mb-4">Cost Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={4}>
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={catColors[entry.name as keyof typeof catColors]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => peso(v)} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex gap-4 justify-center mt-2">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: catColors[d.name as keyof typeof catColors] }} />
                {d.name} ({((d.value / totalAll) * 100).toFixed(0)}%)
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-sm border border-slate-100 p-5">
          <h3 className="text-base font-semibold text-slate-800 mb-4">Monthly Cost Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyCostData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" fontSize={12} tickLine={false} />
              <YAxis fontSize={12} tickLine={false} tickFormatter={(v) => `₱${v / 1000}k`} />
              <Tooltip formatter={(v: number) => peso(v)} />
              <Legend />
              <Bar dataKey="labor" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Labor" stackId="a" />
              <Bar dataKey="fuel" fill="#f59e0b" radius={[0, 0, 0, 0]} name="Fuel" stackId="a" />
              <Bar dataKey="maintenance" fill="#ef4444" radius={[4, 4, 0, 0]} name="Maintenance" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-slate-100">
        <div className="p-4 border-b border-slate-100 flex items-center gap-2">
          {['All', 'Labor', 'Fuel', 'Maintenance'].map((c) => (
            <button key={c} onClick={() => setCatFilter(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                catFilter === c ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}>
              {c}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-4 py-3 text-left font-medium">ID</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Category</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
                <th className="px-4 py-3 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-t border-slate-50 hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-medium text-slate-700">{c.id}</td>
                  <td className="px-4 py-3 text-slate-600">{c.date}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: catColors[c.category] + '20', color: catColors[c.category] }}>
                      {c.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{c.description}</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-800">{peso(c.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={showForm} onClose={() => setShowForm(false)} title="Record Operational Cost">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Labor', 'Fuel', 'Maintenance'] as const).map((c) => {
                const Icon = catIcons[c];
                return (
                  <button key={c} type="button" onClick={() => setForm({ ...form, category: c })}
                    className={`py-2.5 rounded-lg text-sm font-medium border-2 transition-all flex items-center justify-center gap-1.5 ${
                      form.category === c
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}>
                    <Icon size={14} /> {c}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Date</label>
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
            <input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder={form.category === 'Labor' ? 'e.g. Labor Team A - 4 pax x ₱500' : form.category === 'Fuel' ? 'e.g. Diesel for Dryer #1 - 50L' : 'e.g. Weighing scale calibration'}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Amount (₱)</label>
            <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })}
              placeholder="e.g. 3250"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
          </div>

          <button type="submit"
            className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium text-sm transition-colors">
            Record Cost
          </button>
        </form>
      </Modal>
    </div>
  );
}
