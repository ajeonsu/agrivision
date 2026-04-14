import {
  PhilippinePeso,
  TrendingUp,
  Truck,
  Users,
  Wheat,
  Droplets,
  Package,
  CalendarClock,
  Lock,
  ClipboardList,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell,
} from 'recharts';
import StatCard from '../components/StatCard';
import { useAuth } from '../context/AuthContext';
import { monthlySales, volumeData, batches, schedules, resources, transactions } from '../data/mockData';

const peso = (n: number) => '₱' + n.toLocaleString();

const statusColors: Record<string, string> = {
  Received: '#3b82f6',
  Drying: '#f59e0b',
  Dried: '#8b5cf6',
  Storage: '#6366f1',
  Sold: '#16a34a',
};

const batchStatusData = Object.entries(
  batches.reduce<Record<string, number>>((acc, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1;
    return acc;
  }, {})
).map(([name, value]) => ({ name, value }));

const todaySchedules = schedules.filter((s) => s.date === '2026-04-14');
const activeResources = resources.filter((r) => r.status === 'Active').length;

function OwnerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Full overview of your palay trading operations</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Revenue (Apr)" value={peso(520000)} change="5.1% vs last month" changeType="up" icon={PhilippinePeso} color="bg-green-500" />
        <StatCard title="Total Volume (Apr)" value="7,500 kg" change="4.2% vs last month" changeType="up" icon={Wheat} color="bg-amber-500" />
        <StatCard title="Active Batches" value={String(batches.filter(b => b.status === 'Drying').length)} change="3 currently drying" changeType="up" icon={Droplets} color="bg-blue-500" />
        <StatCard title="Active Resources" value={`${activeResources} / ${resources.length}`} change={`${resources.filter(r => r.status === 'Maintenance').length} in maintenance`} changeType="down" icon={Truck} color="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-card rounded-xl shadow-sm border border-slate-100 p-5">
          <h3 className="text-base font-semibold text-slate-800 mb-4">Monthly Revenue & Expenses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlySales}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16a34a" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" fontSize={12} tickLine={false} />
              <YAxis fontSize={12} tickLine={false} tickFormatter={(v) => `₱${v / 1000}k`} />
              <Tooltip formatter={(v) => peso(Number(v))} />
              <Area type="monotone" dataKey="revenue" stroke="#16a34a" fill="url(#revGrad)" strokeWidth={2} name="Revenue" />
              <Area type="monotone" dataKey="expenses" stroke="#ef4444" fill="url(#expGrad)" strokeWidth={2} name="Expenses" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl shadow-sm border border-slate-100 p-5">
          <h3 className="text-base font-semibold text-slate-800 mb-4">Batch Status</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={batchStatusData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={4}>
                {batchStatusData.map((entry) => (
                  <Cell key={entry.name} fill={statusColors[entry.name] || '#94a3b8'} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {batchStatusData.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: statusColors[s.name] }} />
                {s.name} ({s.value})
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl shadow-sm border border-slate-100 p-5">
          <h3 className="text-base font-semibold text-slate-800 mb-4">Palay Volume (kg)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" fontSize={12} tickLine={false} />
              <YAxis fontSize={12} tickLine={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="bought" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Bought" />
              <Bar dataKey="dried" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Dried" />
              <Bar dataKey="sold" fill="#16a34a" radius={[4, 4, 0, 0]} name="Sold" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl shadow-sm border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-slate-800">Today's Schedule</h3>
            <span className="text-xs bg-primary/10 text-primary font-medium px-2.5 py-1 rounded-full">
              {todaySchedules.length} activities
            </span>
          </div>
          <ScheduleList />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl shadow-sm border border-slate-100 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
            <TrendingUp size={22} className="text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Net Income (Apr)</p>
            <p className="text-xl font-bold text-slate-800">{peso(182000)}</p>
          </div>
        </div>
        <div className="bg-card rounded-xl shadow-sm border border-slate-100 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <CalendarClock size={22} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Scheduled Today</p>
            <p className="text-xl font-bold text-slate-800">{todaySchedules.length} Services</p>
          </div>
        </div>
        <div className="bg-card rounded-xl shadow-sm border border-slate-100 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
            <Users size={22} className="text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Workers Active</p>
            <p className="text-xl font-bold text-slate-800">{resources.filter(r => r.type === 'Worker' && r.status === 'Active').length} / {resources.filter(r => r.type === 'Worker').length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StaffDashboard() {
  const pendingTxn = transactions.filter(t => t.status === 'Pending' || t.status === 'Processing').length;
  const dryingBatches = batches.filter(b => b.status === 'Drying');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Staff Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Your operational overview — encoding, scheduling & batch monitoring</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Today's Schedules" value={String(todaySchedules.length)} change="Activities to manage" changeType="up" icon={CalendarClock} color="bg-blue-500" />
        <StatCard title="Batches Drying" value={String(dryingBatches.length)} change="Currently in process" changeType="up" icon={Droplets} color="bg-amber-500" />
        <StatCard title="Pending Transactions" value={String(pendingTxn)} change="Needs attention" changeType="down" icon={ClipboardList} color="bg-red-500" />
        <StatCard title="Total Batches" value={String(batches.length)} change={`${batches.filter(b => b.status === 'Storage').length} in storage`} changeType="up" icon={Package} color="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl shadow-sm border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-slate-800">Today's Schedule</h3>
            <span className="text-xs bg-primary/10 text-primary font-medium px-2.5 py-1 rounded-full">
              {todaySchedules.length} activities
            </span>
          </div>
          <ScheduleList />
        </div>

        <div className="bg-card rounded-xl shadow-sm border border-slate-100 p-5">
          <h3 className="text-base font-semibold text-slate-800 mb-4">Batches Currently Drying</h3>
          {dryingBatches.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-8">No batches currently drying</p>
          ) : (
            <div className="space-y-3">
              {dryingBatches.map((b) => (
                <div key={b.id} className="p-3 rounded-lg bg-amber-50 border border-amber-100">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-bold text-slate-800">{b.id}</p>
                      <p className="text-xs text-slate-500">{b.farmer} &middot; {b.dryingMethod}</p>
                    </div>
                    <span className="text-xs font-medium bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{b.progress}%</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-600 mb-2">
                    <span>Weight: {b.weightIn.toLocaleString()} kg</span>
                    <span>Moisture: {b.moisture}%</span>
                  </div>
                  <div className="w-full h-2 bg-amber-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" style={{ width: `${b.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-slate-100 p-5">
        <h3 className="text-base font-semibold text-slate-800 mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-4 py-2.5 text-left font-medium">ID</th>
                <th className="px-4 py-2.5 text-left font-medium">Date</th>
                <th className="px-4 py-2.5 text-left font-medium">Type</th>
                <th className="px-4 py-2.5 text-left font-medium">Farmer / Buyer</th>
                <th className="px-4 py-2.5 text-right font-medium">Weight</th>
                <th className="px-4 py-2.5 text-center font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 5).map((t) => (
                <tr key={t.id} className="border-t border-slate-50">
                  <td className="px-4 py-2.5 font-medium text-slate-700">{t.id}</td>
                  <td className="px-4 py-2.5 text-slate-600">{t.date}</td>
                  <td className="px-4 py-2.5">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      t.type === 'Buy' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    }`}>{t.type}</span>
                  </td>
                  <td className="px-4 py-2.5 text-slate-700">{t.farmer}</td>
                  <td className="px-4 py-2.5 text-right text-slate-600">{t.weight.toLocaleString()} kg</td>
                  <td className="px-4 py-2.5 text-center">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      t.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      t.status === 'Processing' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center">
          <Lock size={18} className="text-slate-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-700">Restricted Access</p>
          <p className="text-xs text-slate-500">Analytics, resource management, and financial reports are available to owner accounts only.</p>
        </div>
      </div>
    </div>
  );
}

function ScheduleList() {
  return (
    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
      {todaySchedules.map((s) => (
        <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
            s.service === 'Drying' ? 'bg-amber-100 text-amber-600' :
            s.service === 'Hauling' ? 'bg-blue-100 text-blue-600' :
            s.service === 'Delivery' ? 'bg-green-100 text-green-600' :
            'bg-purple-100 text-purple-600'
          }`}>
            {s.service === 'Drying' ? <Droplets size={16} /> :
             s.service === 'Hauling' ? <Truck size={16} /> :
             s.service === 'Delivery' ? <Package size={16} /> :
             <Users size={16} />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-700 truncate">{s.resource}</p>
            <p className="text-xs text-slate-500">{s.timeSlot} &middot; {s.details}</p>
          </div>
          <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${
            s.status === 'Completed' ? 'bg-green-100 text-green-700' :
            s.status === 'In Progress' ? 'bg-amber-100 text-amber-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {s.status}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const { role } = useAuth();
  return role === 'owner' ? <OwnerDashboard /> : <StaffDashboard />;
}
