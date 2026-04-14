import { useState } from 'react';
import { ArrowDownCircle, ArrowUpCircle, Search, Filter, Lock, Plus, Check } from 'lucide-react';
import { transactions as initialTxns, type Transaction } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal';

const peso = (n: number) => '₱' + n.toLocaleString();

export default function Transactions() {
  const { role } = useAuth();
  const isOwner = role === 'owner';
  const [filter, setFilter] = useState<'All' | 'Buy' | 'Sell'>('All');
  const [search, setSearch] = useState('');
  const [txns, setTxns] = useState<Transaction[]>(initialTxns);
  const [showForm, setShowForm] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    type: 'Buy' as 'Buy' | 'Sell',
    farmer: '',
    weight: '',
    moisture: '',
    pricePerKg: '',
    date: new Date().toISOString().slice(0, 10),
  });

  const filtered = txns.filter((t) => {
    if (filter !== 'All' && t.type !== filter) return false;
    if (search && !t.farmer.toLowerCase().includes(search.toLowerCase()) && !t.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalBuy = txns.filter(t => t.type === 'Buy').reduce((s, t) => s + t.total, 0);
  const totalSell = txns.filter(t => t.type === 'Sell').reduce((s, t) => s + t.total, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(form.weight);
    const p = parseFloat(form.pricePerKg);
    const m = parseFloat(form.moisture);
    if (!form.farmer || isNaN(w) || isNaN(p) || isNaN(m)) return;

    const newTxn: Transaction = {
      id: `TXN-${String(txns.length + 1).padStart(3, '0')}`,
      date: form.date,
      type: form.type,
      farmer: form.farmer,
      weight: w,
      moisture: m,
      pricePerKg: p,
      total: w * p,
      status: 'Pending',
    };

    setTxns([newTxn, ...txns]);
    setShowForm(false);
    setForm({ type: 'Buy', farmer: '', weight: '', moisture: '', pricePerKg: '', date: new Date().toISOString().slice(0, 10) });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Transactions</h1>
          <p className="text-slate-500 text-sm mt-1">
            {isOwner ? 'Record and manage all buying and selling transactions' : 'Encode and view transaction records'}
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-primary/25"
        >
          <Plus size={16} />
          Add Transaction
        </button>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 animate-pulse">
          <Check size={18} className="text-green-600" />
          <p className="text-sm text-green-700 font-medium">Transaction recorded successfully!</p>
        </div>
      )}

      {isOwner ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-5 shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
              <ArrowDownCircle size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Bought</p>
              <p className="text-xl font-bold text-slate-800">{peso(totalBuy)}</p>
            </div>
          </div>
          <div className="bg-card rounded-xl p-5 shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
              <ArrowUpCircle size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Sold</p>
              <p className="text-xl font-bold text-slate-800">{peso(totalSell)}</p>
            </div>
          </div>
          <div className="bg-card rounded-xl p-5 shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center">
              <ArrowUpCircle size={20} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Net Gain</p>
              <p className="text-xl font-bold text-emerald-700">{peso(totalSell - totalBuy)}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
          <Lock size={16} className="text-blue-500 shrink-0" />
          <p className="text-sm text-blue-700">
            <span className="font-medium">Staff view:</span> Financial summaries and pricing are restricted to owner accounts.
          </p>
        </div>
      )}

      <div className="bg-card rounded-xl shadow-sm border border-slate-100">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ID or farmer name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            {(['All', 'Buy', 'Sell'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === f ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-4 py-3 text-left font-medium">ID</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Farmer / Buyer</th>
                <th className="px-4 py-3 text-right font-medium">Weight (kg)</th>
                <th className="px-4 py-3 text-right font-medium">Moisture %</th>
                {isOwner && <th className="px-4 py-3 text-right font-medium">Price/kg</th>}
                {isOwner && <th className="px-4 py-3 text-right font-medium">Total</th>}
                <th className="px-4 py-3 text-center font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-700">{t.id}</td>
                  <td className="px-4 py-3 text-slate-600">{t.date}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                      t.type === 'Buy' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {t.type === 'Buy' ? <ArrowDownCircle size={12} /> : <ArrowUpCircle size={12} />}
                      {t.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{t.farmer}</td>
                  <td className="px-4 py-3 text-right text-slate-700">{t.weight.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{t.moisture}%</td>
                  {isOwner && <td className="px-4 py-3 text-right text-slate-600">₱{t.pricePerKg}</td>}
                  {isOwner && <td className="px-4 py-3 text-right font-semibold text-slate-800">{peso(t.total)}</td>}
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      t.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      t.status === 'Processing' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 text-xs text-slate-500">
          Showing {filtered.length} of {txns.length} transactions
        </div>
      </div>

      <Modal open={showForm} onClose={() => setShowForm(false)} title="Record New Transaction">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Transaction Type</label>
            <div className="grid grid-cols-2 gap-3">
              {(['Buy', 'Sell'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm({ ...form, type: t })}
                  className={`py-2.5 rounded-lg text-sm font-medium border-2 transition-all ${
                    form.type === t
                      ? t === 'Buy' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-green-500 bg-green-50 text-green-700'
                      : 'border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {t === 'Buy' ? 'Buy (Procurement)' : 'Sell'}
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
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              {form.type === 'Buy' ? 'Farmer / Agent Name' : 'Buyer Name'}
            </label>
            <input type="text" value={form.farmer} onChange={(e) => setForm({ ...form, farmer: e.target.value })}
              placeholder={form.type === 'Buy' ? 'e.g. Juan Dela Cruz' : 'e.g. NFA Warehouse'}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Weight (kg)</label>
              <input type="number" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })}
                placeholder="e.g. 2500"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Moisture %</label>
              <input type="number" step="0.1" value={form.moisture} onChange={(e) => setForm({ ...form, moisture: e.target.value })}
                placeholder="e.g. 18.5"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Price per kg (₱)</label>
            <input type="number" step="0.5" value={form.pricePerKg} onChange={(e) => setForm({ ...form, pricePerKg: e.target.value })}
              placeholder="e.g. 21"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
          </div>

          {form.weight && form.pricePerKg && (
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-xs text-slate-500">Auto-calculated Total</p>
              <p className="text-xl font-bold text-slate-800">{peso(parseFloat(form.weight) * parseFloat(form.pricePerKg))}</p>
            </div>
          )}

          <button type="submit"
            className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium text-sm transition-colors">
            Record Transaction
          </button>
        </form>
      </Modal>
    </div>
  );
}
