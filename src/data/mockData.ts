export const monthlySales = [
  { month: 'Jan', revenue: 285000, expenses: 198000, net: 87000 },
  { month: 'Feb', revenue: 312000, expenses: 215000, net: 97000 },
  { month: 'Mar', revenue: 298000, expenses: 201000, net: 97000 },
  { month: 'Apr', revenue: 425000, expenses: 278000, net: 147000 },
  { month: 'May', revenue: 510000, expenses: 325000, net: 185000 },
  { month: 'Jun', revenue: 478000, expenses: 298000, net: 180000 },
  { month: 'Jul', revenue: 392000, expenses: 256000, net: 136000 },
  { month: 'Aug', revenue: 368000, expenses: 241000, net: 127000 },
  { month: 'Sep', revenue: 445000, expenses: 289000, net: 156000 },
  { month: 'Oct', revenue: 520000, expenses: 338000, net: 182000 },
  { month: 'Nov', revenue: 495000, expenses: 312000, net: 183000 },
  { month: 'Dec', revenue: 410000, expenses: 268000, net: 142000 },
];

export const yearlySalesComparison = [
  { year: '2023', harvest: 2850000, nonHarvest: 1420000 },
  { year: '2024', harvest: 3210000, nonHarvest: 1580000 },
  { year: '2025', harvest: 3680000, nonHarvest: 1820000 },
  { year: '2026 (Proj)', harvest: 4100000, nonHarvest: 2050000 },
];

export const volumeData = [
  { month: 'Jan', bought: 4200, dried: 3800, sold: 3500 },
  { month: 'Feb', bought: 4800, dried: 4300, sold: 4100 },
  { month: 'Mar', bought: 4500, dried: 4100, sold: 3900 },
  { month: 'Apr', bought: 6200, dried: 5700, sold: 5400 },
  { month: 'May', bought: 7800, dried: 7200, sold: 6900 },
  { month: 'Jun', bought: 7100, dried: 6500, sold: 6200 },
  { month: 'Jul', bought: 5500, dried: 5000, sold: 4800 },
  { month: 'Aug', bought: 5200, dried: 4700, sold: 4500 },
  { month: 'Sep', bought: 6400, dried: 5900, sold: 5600 },
  { month: 'Oct', bought: 7500, dried: 7000, sold: 6700 },
  { month: 'Nov', bought: 7200, dried: 6600, sold: 6300 },
  { month: 'Dec', bought: 6000, dried: 5500, sold: 5200 },
];

export const predictionData = [
  { month: 'Jul', actual: 392000, predicted: null },
  { month: 'Aug', actual: 368000, predicted: null },
  { month: 'Sep', actual: 445000, predicted: null },
  { month: 'Oct', actual: 520000, predicted: null },
  { month: 'Nov', actual: 495000, predicted: null },
  { month: 'Dec', actual: 410000, predicted: null },
  { month: 'Jan (F)', actual: null, predicted: 435000 },
  { month: 'Feb (F)', actual: null, predicted: 462000 },
  { month: 'Mar (F)', actual: null, predicted: 488000 },
  { month: 'Apr (F)', actual: null, predicted: 540000 },
  { month: 'May (F)', actual: null, predicted: 605000 },
  { month: 'Jun (F)', actual: null, predicted: 568000 },
];

export type Transaction = {
  id: string;
  date: string;
  type: 'Buy' | 'Sell';
  farmer: string;
  weight: number;
  moisture: number;
  pricePerKg: number;
  total: number;
  status: 'Completed' | 'Pending' | 'Processing';
};

export const transactions: Transaction[] = [
  { id: 'TXN-001', date: '2026-04-14', type: 'Buy', farmer: 'Juan Dela Cruz', weight: 2500, moisture: 18.5, pricePerKg: 21, total: 52500, status: 'Completed' },
  { id: 'TXN-002', date: '2026-04-14', type: 'Buy', farmer: 'Maria Santos', weight: 1800, moisture: 19.2, pricePerKg: 20.5, total: 36900, status: 'Processing' },
  { id: 'TXN-003', date: '2026-04-13', type: 'Sell', farmer: 'NFA Warehouse', weight: 5000, moisture: 14.0, pricePerKg: 27, total: 135000, status: 'Completed' },
  { id: 'TXN-004', date: '2026-04-13', type: 'Buy', farmer: 'Pedro Reyes', weight: 3200, moisture: 20.1, pricePerKg: 19.5, total: 62400, status: 'Completed' },
  { id: 'TXN-005', date: '2026-04-12', type: 'Sell', farmer: 'Rice Miller Co.', weight: 4200, moisture: 14.0, pricePerKg: 26.5, total: 111300, status: 'Completed' },
  { id: 'TXN-006', date: '2026-04-12', type: 'Buy', farmer: 'Ana Villanueva', weight: 1500, moisture: 17.8, pricePerKg: 21.5, total: 32250, status: 'Pending' },
  { id: 'TXN-007', date: '2026-04-11', type: 'Buy', farmer: 'Ricardo Aquino', weight: 2800, moisture: 18.9, pricePerKg: 20, total: 56000, status: 'Completed' },
  { id: 'TXN-008', date: '2026-04-11', type: 'Sell', farmer: 'Provincial Trader', weight: 3800, moisture: 14.0, pricePerKg: 26, total: 98800, status: 'Completed' },
  { id: 'TXN-009', date: '2026-04-10', type: 'Buy', farmer: 'Elena Garcia', weight: 2100, moisture: 19.5, pricePerKg: 20, total: 42000, status: 'Completed' },
  { id: 'TXN-010', date: '2026-04-10', type: 'Sell', farmer: 'Metro Rice Supply', weight: 6000, moisture: 14.0, pricePerKg: 27.5, total: 165000, status: 'Pending' },
];

export type ScheduleItem = {
  id: string;
  date: string;
  service: 'Drying' | 'Hauling' | 'Delivery' | 'Worker';
  resource: string;
  assignedTo: string;
  timeSlot: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Conflict';
  details: string;
};

export const schedules: ScheduleItem[] = [
  { id: 'SCH-001', date: '2026-04-14', service: 'Drying', resource: 'Mechanical Dryer #1', assignedTo: 'Batch-042', timeSlot: '06:00 - 18:00', status: 'In Progress', details: '2,500 kg - Juan Dela Cruz' },
  { id: 'SCH-002', date: '2026-04-14', service: 'Drying', resource: 'Mechanical Dryer #2', assignedTo: 'Batch-041', timeSlot: '06:00 - 18:00', status: 'In Progress', details: '3,200 kg - Pedro Reyes' },
  { id: 'SCH-003', date: '2026-04-14', service: 'Drying', resource: 'Solar Drying Area A', assignedTo: 'Batch-040', timeSlot: '07:00 - 16:00', status: 'In Progress', details: '1,800 kg - Maria Santos' },
  { id: 'SCH-004', date: '2026-04-14', service: 'Hauling', resource: 'Truck #1 (Isuzu)', assignedTo: 'Driver: Miguel Torres', timeSlot: '05:00 - 09:00', status: 'Completed', details: 'Pickup from Brgy. San Jose - 2 trips' },
  { id: 'SCH-005', date: '2026-04-14', service: 'Delivery', resource: 'Truck #2 (Mitsubishi)', assignedTo: 'Driver: Carlos Ramos', timeSlot: '10:00 - 14:00', status: 'Scheduled', details: 'Deliver to NFA Warehouse - 5,000 kg' },
  { id: 'SCH-006', date: '2026-04-14', service: 'Worker', resource: 'Labor Team A (4 pax)', assignedTo: 'Drying Area', timeSlot: '06:00 - 17:00', status: 'In Progress', details: 'Loading/unloading + drying ops' },
  { id: 'SCH-007', date: '2026-04-15', service: 'Drying', resource: 'Mechanical Dryer #1', assignedTo: 'Batch-043', timeSlot: '06:00 - 18:00', status: 'Scheduled', details: '2,800 kg - Ricardo Aquino' },
  { id: 'SCH-008', date: '2026-04-15', service: 'Hauling', resource: 'Truck #1 (Isuzu)', assignedTo: 'Driver: Miguel Torres', timeSlot: '05:00 - 10:00', status: 'Scheduled', details: 'Pickup from Brgy. Maligaya' },
  { id: 'SCH-009', date: '2026-04-15', service: 'Worker', resource: 'Labor Team B (3 pax)', assignedTo: 'Warehouse', timeSlot: '07:00 - 16:00', status: 'Scheduled', details: 'Storage & weighing operations' },
  { id: 'SCH-010', date: '2026-04-15', service: 'Delivery', resource: 'Truck #2 (Mitsubishi)', assignedTo: 'Driver: Carlos Ramos', timeSlot: '08:00 - 12:00', status: 'Scheduled', details: 'Deliver to Rice Miller Co. - 4,200 kg' },
];

export type Resource = {
  id: string;
  type: 'Machine' | 'Worker' | 'Vehicle';
  name: string;
  status: 'Active' | 'Idle' | 'Maintenance' | 'On Leave';
  details: string;
  utilization: number;
  lastActivity: string;
};

export const resources: Resource[] = [
  { id: 'R-001', type: 'Machine', name: 'Mechanical Dryer #1', status: 'Active', details: 'Capacity: 5,000 kg | Fuel: Diesel', utilization: 85, lastActivity: 'Drying Batch-042' },
  { id: 'R-002', type: 'Machine', name: 'Mechanical Dryer #2', status: 'Active', details: 'Capacity: 4,000 kg | Fuel: Diesel', utilization: 78, lastActivity: 'Drying Batch-041' },
  { id: 'R-003', type: 'Machine', name: 'Solar Drying Area A', status: 'Active', details: 'Capacity: 2,000 kg | Type: Open area', utilization: 62, lastActivity: 'Drying Batch-040' },
  { id: 'R-004', type: 'Machine', name: 'Solar Drying Area B', status: 'Idle', details: 'Capacity: 2,000 kg | Type: Open area', utilization: 45, lastActivity: 'Last used Apr 12' },
  { id: 'R-005', type: 'Machine', name: 'Moisture Tester', status: 'Active', details: 'Model: Kett PM-450 | Digital', utilization: 90, lastActivity: 'Testing incoming palay' },
  { id: 'R-006', type: 'Machine', name: 'Weighing Scale (Large)', status: 'Active', details: 'Capacity: 10,000 kg | Platform type', utilization: 88, lastActivity: 'Weighing Batch-042' },
  { id: 'R-007', type: 'Vehicle', name: 'Truck #1 (Isuzu Elf)', status: 'Active', details: 'Capacity: 6,000 kg | Plate: ABC-1234', utilization: 72, lastActivity: 'Hauling from Brgy. San Jose' },
  { id: 'R-008', type: 'Vehicle', name: 'Truck #2 (Mitsubishi Canter)', status: 'Active', details: 'Capacity: 8,000 kg | Plate: DEF-5678', utilization: 68, lastActivity: 'Delivery to NFA' },
  { id: 'R-009', type: 'Vehicle', name: 'Multicab (Suzuki)', status: 'Maintenance', details: 'Light transport | Plate: GHI-9012', utilization: 35, lastActivity: 'Engine repair - since Apr 10' },
  { id: 'R-010', type: 'Worker', name: 'Miguel Torres', status: 'Active', details: 'Role: Driver | Truck #1 assigned', utilization: 75, lastActivity: 'Hauling - Apr 14' },
  { id: 'R-011', type: 'Worker', name: 'Carlos Ramos', status: 'Active', details: 'Role: Driver | Truck #2 assigned', utilization: 70, lastActivity: 'Delivery scheduled - Apr 14' },
  { id: 'R-012', type: 'Worker', name: 'Labor Team A (4 pax)', status: 'Active', details: 'Role: Loading/Drying Ops', utilization: 82, lastActivity: 'Drying area ops - Apr 14' },
  { id: 'R-013', type: 'Worker', name: 'Labor Team B (3 pax)', status: 'Idle', details: 'Role: Warehouse/Weighing', utilization: 60, lastActivity: 'Warehouse ops - Apr 13' },
  { id: 'R-014', type: 'Worker', name: 'Jose Mendoza', status: 'On Leave', details: 'Role: Dryer Operator', utilization: 55, lastActivity: 'On leave since Apr 12' },
];

export type Batch = {
  id: string;
  farmer: string;
  dateReceived: string;
  weightIn: number;
  moisture: number;
  dryingMethod: string;
  weightOut: number | null;
  status: 'Received' | 'Drying' | 'Dried' | 'Storage' | 'Sold';
  progress: number;
};

export const batches: Batch[] = [
  { id: 'B-042', farmer: 'Juan Dela Cruz', dateReceived: '2026-04-14', weightIn: 2500, moisture: 18.5, dryingMethod: 'Mechanical #1', weightOut: null, status: 'Drying', progress: 45 },
  { id: 'B-041', farmer: 'Pedro Reyes', dateReceived: '2026-04-13', weightIn: 3200, moisture: 20.1, dryingMethod: 'Mechanical #2', weightOut: null, status: 'Drying', progress: 72 },
  { id: 'B-040', farmer: 'Maria Santos', dateReceived: '2026-04-13', weightIn: 1800, moisture: 19.2, dryingMethod: 'Solar Area A', weightOut: null, status: 'Drying', progress: 58 },
  { id: 'B-039', farmer: 'Ricardo Aquino', dateReceived: '2026-04-11', weightIn: 2800, moisture: 18.9, dryingMethod: 'Mechanical #1', weightOut: 2380, status: 'Storage', progress: 100 },
  { id: 'B-038', farmer: 'Elena Garcia', dateReceived: '2026-04-10', weightIn: 2100, moisture: 19.5, dryingMethod: 'Solar Area B', weightOut: 1785, status: 'Dried', progress: 100 },
  { id: 'B-037', farmer: 'NFA Batch', dateReceived: '2026-04-08', weightIn: 5000, moisture: 14.0, dryingMethod: 'N/A (pre-dried)', weightOut: 5000, status: 'Sold', progress: 100 },
  { id: 'B-036', farmer: 'Rice Miller Co.', dateReceived: '2026-04-07', weightIn: 4200, moisture: 14.0, dryingMethod: 'N/A (pre-dried)', weightOut: 4200, status: 'Sold', progress: 100 },
  { id: 'B-035', farmer: 'Ana Villanueva', dateReceived: '2026-04-06', weightIn: 1500, moisture: 17.8, dryingMethod: 'Mechanical #2', weightOut: 1275, status: 'Storage', progress: 100 },
];
