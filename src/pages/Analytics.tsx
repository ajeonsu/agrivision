import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  LineChart, Line, AreaChart, Area, ComposedChart,
} from 'recharts';
import { useState } from 'react';
import { TrendingUp, Calculator, GitCompare, Lightbulb, FileDown, Check } from 'lucide-react';
import { monthlySales, yearlySalesComparison, predictionData, volumeData } from '../data/mockData';

const peso = (n: number) => '₱' + n.toLocaleString();

const totalRevenue = monthlySales.reduce((s, m) => s + m.revenue, 0);
const totalExpenses = monthlySales.reduce((s, m) => s + m.expenses, 0);
const totalNet = totalRevenue - totalExpenses;
const avgMonthly = Math.round(totalRevenue / 12);

const resourceUtil = [
  { name: 'Mech. Dryer #1', hours: 312, category: 'Machine' },
  { name: 'Mech. Dryer #2', hours: 278, category: 'Machine' },
  { name: 'Truck #1', trips: 86, category: 'Vehicle' },
  { name: 'Truck #2', trips: 72, category: 'Vehicle' },
  { name: 'Labor Team A', days: 24, category: 'Worker' },
  { name: 'Labor Team B', days: 18, category: 'Worker' },
];

function exportCSV() {
  const header = 'Month,Revenue,Expenses,Net Income\n';
  const rows = monthlySales.map(m => `${m.month},${m.revenue},${m.expenses},${m.net}`).join('\n');
  const totals = `\nTOTAL,${totalRevenue},${totalExpenses},${totalNet}`;
  const blob = new Blob([header + rows + totals], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `AgriVision_Financial_Report_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function exportFullReport() {
  let content = 'AGRIVISION - MONTHLY OPERATIONS & FINANCIAL REPORT\n';
  content += `Generated: ${new Date().toLocaleDateString()}\n\n`;
  content += '=== FINANCIAL SUMMARY ===\n';
  content += `Total Revenue: P${totalRevenue.toLocaleString()}\n`;
  content += `Total Expenses: P${totalExpenses.toLocaleString()}\n`;
  content += `Net Income: P${totalNet.toLocaleString()}\n`;
  content += `Average Monthly Revenue: P${avgMonthly.toLocaleString()}\n\n`;
  content += '=== MONTHLY BREAKDOWN ===\n';
  content += 'Month,Revenue,Expenses,Net Income\n';
  monthlySales.forEach(m => { content += `${m.month},P${m.revenue.toLocaleString()},P${m.expenses.toLocaleString()},P${m.net.toLocaleString()}\n`; });
  content += '\n=== YEARLY COMPARISON (Harvest vs Non-Harvest) ===\n';
  content += 'Year,Harvest Season,Non-Harvest Season,Total\n';
  yearlySalesComparison.forEach(y => { content += `${y.year},P${y.harvest.toLocaleString()},P${y.nonHarvest.toLocaleString()},P${(y.harvest + y.nonHarvest).toLocaleString()}\n`; });
  content += '\n=== VOLUME DATA (kg) ===\n';
  content += 'Month,Bought,Dried,Sold\n';
  volumeData.forEach(v => { content += `${v.month},${v.bought},${v.dried},${v.sold}\n`; });
  content += '\n=== SALES FORECAST ===\n';
  content += 'Month,Actual,Predicted\n';
  predictionData.forEach(p => { content += `${p.month},${p.actual || '-'},${p.predicted || '-'}\n`; });

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `AgriVision_Full_Report_${new Date().toISOString().slice(0, 10)}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Analytics() {
  const [exported, setExported] = useState(false);

  const handleExport = (type: 'csv' | 'full') => {
    if (type === 'csv') exportCSV();
    else exportFullReport();
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Data Analytics</h1>
          <p className="text-slate-500 text-sm mt-1">Accounting, comparison, and prediction of sales</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button onClick={() => handleExport('csv')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-sm font-medium text-slate-700 transition-colors">
            <FileDown size={16} />
            <span className="hidden sm:inline">Export</span> CSV
          </button>
          <button onClick={() => handleExport('full')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-primary/25">
            <FileDown size={16} />
            <span className="hidden sm:inline">Generate</span> Report
          </button>
        </div>
      </div>

      {exported && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <Check size={18} className="text-green-600" />
          <p className="text-sm text-green-700 font-medium">Report downloaded successfully!</p>
        </div>
      )}

      {/* ACCOUNTING OF SALES */}
      <div className="bg-card rounded-xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center">
            <Calculator size={18} className="text-green-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-800">Accounting of Sales</h2>
            <p className="text-xs text-slate-500">Annual financial summary (2025-2026)</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="text-xs text-slate-500">Total Revenue</p>
            <p className="text-xl font-bold text-green-700">{peso(totalRevenue)}</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <p className="text-xs text-slate-500">Total Expenses</p>
            <p className="text-xl font-bold text-red-600">{peso(totalExpenses)}</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
            <p className="text-xs text-slate-500">Net Income</p>
            <p className="text-xl font-bold text-emerald-700">{peso(totalNet)}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="text-xs text-slate-500">Avg. Monthly Rev.</p>
            <p className="text-xl font-bold text-blue-700">{peso(avgMonthly)}</p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={monthlySales}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" fontSize={12} tickLine={false} />
            <YAxis fontSize={12} tickLine={false} tickFormatter={(v) => `₱${v / 1000}k`} />
            <Tooltip formatter={(v) => peso(Number(v))} />
            <Legend />
            <Bar dataKey="revenue" fill="#16a34a" radius={[4, 4, 0, 0]} name="Revenue" />
            <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} name="Expenses" />
            <Line type="monotone" dataKey="net" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 3 }} name="Net Income" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* COMPARISON OF SALES */}
      <div className="bg-card rounded-xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
            <GitCompare size={18} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-800">Comparison of Sales</h2>
            <p className="text-xs text-slate-500">Year-over-year harvest vs non-harvest season comparison</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-slate-600 mb-3">Yearly Revenue by Season</h4>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={yearlySalesComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="year" fontSize={12} tickLine={false} />
                <YAxis fontSize={12} tickLine={false} tickFormatter={(v) => `₱${v / 1000000}M`} />
                <Tooltip formatter={(v) => peso(Number(v))} />
                <Legend />
                <Bar dataKey="harvest" fill="#16a34a" radius={[4, 4, 0, 0]} name="Harvest Season" />
                <Bar dataKey="nonHarvest" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Non-Harvest Season" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h4 className="text-sm font-medium text-slate-600 mb-3">Monthly Volume Comparison</h4>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" fontSize={12} tickLine={false} />
                <YAxis fontSize={12} tickLine={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="bought" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} name="Bought (kg)" />
                <Line type="monotone" dataKey="dried" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} name="Dried (kg)" />
                <Line type="monotone" dataKey="sold" stroke="#16a34a" strokeWidth={2} dot={{ r: 3 }} name="Sold (kg)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* PREDICTION OF SALES */}
      <div className="bg-card rounded-xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center">
            <TrendingUp size={18} className="text-purple-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-800">Prediction of Sales</h2>
            <p className="text-xs text-slate-500">Trend-based forecasting using historical data patterns</p>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 mb-5 flex items-start gap-3">
          <Lightbulb size={18} className="text-purple-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-purple-800">Forecast Insight</p>
            <p className="text-xs text-purple-600 mt-0.5">
              Based on historical trends, projected revenue for the next 6 months shows a <strong>15.2% growth</strong> trajectory.
              Peak expected in May at ₱605,000 driven by harvest season demand.
            </p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={predictionData}>
            <defs>
              <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="actGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16a34a" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" fontSize={12} tickLine={false} />
            <YAxis fontSize={12} tickLine={false} tickFormatter={(v) => `₱${v / 1000}k`} />
            <Tooltip formatter={(v) => peso(Number(v))} />
            <Legend />
            <Area type="monotone" dataKey="actual" stroke="#16a34a" fill="url(#actGrad)" strokeWidth={2.5} name="Actual Revenue" connectNulls={false} />
            <Area type="monotone" dataKey="predicted" stroke="#8b5cf6" fill="url(#predGrad)" strokeWidth={2.5} strokeDasharray="6 3" name="Predicted Revenue" connectNulls={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* RESOURCE UTILIZATION */}
      <div className="bg-card rounded-xl shadow-sm border border-slate-100 p-5">
        <h2 className="text-base font-semibold text-slate-800 mb-4">Resource Utilization Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resourceUtil.map((r) => (
            <div key={r.name} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-sm font-medium text-slate-800">{r.name}</p>
              <p className="text-xs text-slate-500 mb-2">{r.category}</p>
              <p className="text-lg font-bold text-slate-700">
                {'hours' in r && r.hours !== undefined ? `${r.hours} hrs` : 'trips' in r && r.trips !== undefined ? `${r.trips} trips` : `${r.days} days`}
              </p>
              <p className="text-xs text-slate-400">This month</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
