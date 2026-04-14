import { useState } from 'react';
import { ArrowDownCircle, ArrowUpCircle, Search, Filter } from 'lucide-react';
import { transactions } from '../data/mockData';

const peso = (n: number) => '₱' + n.toLocaleString();

export default function Transactions() {
  const [filter, setFilter] = useState<'All' | 'Buy' | 'Sell'>('All');
  const [search, setSearch] = useState('');

  const filtered = transactions.filter((t) => {
    if (filter !== 'All' && t.type !== filter) return false;
    if (search && !t.farmer.toLowerCase().includes(search.toLowerCase()) && !t.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalBuy = transactions.filter(t => t.type === 'Buy').reduce((s, t) => s + t.total, 0);
  const totalSell = transactions.filter(t => t.type === 'Sell').reduce((s, t) => s + t.total, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Transactions</h1>
        <p className="text-slate-500 text-sm mt-1">Record and manage all buying and selling transactions</p>
      </div>

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
                <th className="px-4 py-3 text-right font-medium">Price/kg</th>
                <th className="px-4 py-3 text-right font-medium">Total</th>
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
                  <td className="px-4 py-3 text-right text-slate-600">₱{t.pricePerKg}</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-800">{peso(t.total)}</td>
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
          Showing {filtered.length} of {transactions.length} transactions
        </div>
      </div>
    </div>
  );
}
