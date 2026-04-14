import type { LucideIcon } from 'lucide-react';

type Props = {
  title: string;
  value: string;
  change?: string;
  changeType?: 'up' | 'down';
  icon: LucideIcon;
  color: string;
};

export default function StatCard({ title, value, change, changeType, icon: Icon, color }: Props) {
  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
          {change && (
            <p className={`text-xs font-medium mt-1 ${changeType === 'up' ? 'text-green-600' : 'text-red-500'}`}>
              {changeType === 'up' ? '↑' : '↓'} {change}
            </p>
          )}
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
    </div>
  );
}
