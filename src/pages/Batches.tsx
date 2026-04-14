import { Boxes, ArrowRight } from 'lucide-react';
import { batches } from '../data/mockData';

const statusFlow = ['Received', 'Drying', 'Dried', 'Storage', 'Sold'] as const;

const statusStyle: Record<string, { bg: string; text: string; dot: string }> = {
  Received: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  Drying: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
  Dried: { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
  Storage: { bg: 'bg-indigo-100', text: 'text-indigo-700', dot: 'bg-indigo-500' },
  Sold: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
};

export default function Batches() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Batch Tracking</h1>
        <p className="text-slate-500 text-sm mt-1">Monitor palay batches from procurement through drying, storage, and selling</p>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-slate-100 p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Batch Flow Pipeline</h3>
        <div className="flex items-center justify-between gap-2 flex-wrap overflow-x-auto pb-1">
          {statusFlow.map((s, i) => {
            const count = batches.filter(b => b.status === s).length;
            const st = statusStyle[s];
            return (
              <div key={s} className="flex items-center gap-2 shrink-0">
                <div className={`rounded-xl px-3 sm:px-4 py-2 sm:py-3 ${st.bg} text-center min-w-[70px] sm:min-w-[100px]`}>
                  <p className={`text-xl sm:text-2xl font-bold ${st.text}`}>{count}</p>
                  <p className="text-[10px] sm:text-xs text-slate-600 mt-0.5">{s}</p>
                </div>
                {i < statusFlow.length - 1 && <ArrowRight size={14} className="text-slate-300 shrink-0 hidden sm:block" />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {batches.map((b) => {
          const st = statusStyle[b.status];
          const stepIndex = statusFlow.indexOf(b.status as typeof statusFlow[number]);
          return (
            <div key={b.id} className="bg-card rounded-xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                    <Boxes size={18} className="text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{b.id}</p>
                    <p className="text-xs text-slate-500">{b.farmer}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${st.bg} ${st.text}`}>
                  {b.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs mb-4">
                <div>
                  <p className="text-slate-400">Date Received</p>
                  <p className="text-slate-700 font-medium">{b.dateReceived}</p>
                </div>
                <div>
                  <p className="text-slate-400">Drying Method</p>
                  <p className="text-slate-700 font-medium">{b.dryingMethod}</p>
                </div>
                <div>
                  <p className="text-slate-400">Weight In</p>
                  <p className="text-slate-700 font-medium">{b.weightIn.toLocaleString()} kg</p>
                </div>
                <div>
                  <p className="text-slate-400">Weight Out</p>
                  <p className="text-slate-700 font-medium">{b.weightOut ? `${b.weightOut.toLocaleString()} kg` : '—'}</p>
                </div>
                <div>
                  <p className="text-slate-400">Moisture</p>
                  <p className="text-slate-700 font-medium">{b.moisture}%</p>
                </div>
                <div>
                  <p className="text-slate-400">Weight Loss</p>
                  <p className="text-slate-700 font-medium">
                    {b.weightOut ? `${(b.weightIn - b.weightOut).toLocaleString()} kg (${(((b.weightIn - b.weightOut) / b.weightIn) * 100).toFixed(1)}%)` : '—'}
                  </p>
                </div>
              </div>

              {b.status === 'Drying' && (
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">Drying Progress</span>
                    <span className="font-medium text-amber-600">{b.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all"
                      style={{ width: `${b.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {b.status !== 'Drying' && (
                <div className="flex items-center gap-1 mt-1">
                  {statusFlow.map((s, i) => (
                    <div key={s} className="flex items-center gap-1 flex-1">
                      <div className={`w-2.5 h-2.5 rounded-full ${i <= stepIndex ? statusStyle[s].dot : 'bg-slate-200'}`} />
                      {i < statusFlow.length - 1 && (
                        <div className={`flex-1 h-0.5 ${i < stepIndex ? 'bg-green-300' : 'bg-slate-200'}`} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
