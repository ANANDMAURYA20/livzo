import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  CalendarCheck,
  TrendingUp,
  XCircle,
  PlusCircle,
  ArrowRight,
  Clock,
} from 'lucide-react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { analyticsService } from '../services/analyticsService';
import { inquiryService } from '../services/inquiryService';
import { CardSkeleton, TableSkeleton } from '../components/ui/Skeleton';
import Badge from '../components/ui/Badge';
import { formatDate, formatCurrency, timeAgo } from '../utils/formatters';
import { CHART_COLORS } from '../utils/constants';

const StatCard = ({ label, value, icon: Icon, loading, color = '#f1f1f1', delta }) => (
  <div className="stat-card">
    <div className="flex items-center justify-between">
      <span className="text-xs text-text-muted">{label}</span>
      <div className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center">
        <Icon size={14} style={{ color }} />
      </div>
    </div>
    {loading ? (
      <div className="skeleton h-8 w-24 mt-1" />
    ) : (
      <span className="text-2xl font-semibold text-text-primary">{value ?? 0}</span>
    )}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-panel border border-white/[0.08] rounded-btn px-3 py-2 text-xs shadow-modal">
      <p className="text-text-muted mb-1">{label}</p>
      <p className="text-text-primary font-medium">{payload[0].value} inquiries</p>
    </div>
  );
};

const PieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-panel border border-white/[0.08] rounded-btn px-3 py-2 text-xs shadow-modal">
      <p className="text-text-primary font-medium">{payload[0].name}: {payload[0].value}</p>
    </div>
  );
};

const DashboardPage = () => {
  const [overview, setOverview] = useState(null);
  const [monthly, setMonthly] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingRecent, setLoadingRecent] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ovData, mData, sData] = await Promise.all([
          analyticsService.getOverview(),
          analyticsService.getMonthly(),
          analyticsService.getStatusBreakdown(),
        ]);
        setOverview(ovData.data);
        setMonthly(mData.data);
        setStatusData(sData.data);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const data = await inquiryService.getAll({ limit: 8, sortBy: 'createdAt', sortOrder: 'desc' });
        setRecentInquiries(data.inquiries);
      } finally {
        setLoadingRecent(false);
      }
    };
    fetchRecent();
  }, []);

  const stats = [
    { label: 'Total Inquiries', value: overview?.total, icon: Users, color: '#3b82f6' },
    { label: "Today's Visitors", value: overview?.today, icon: Clock, color: '#f59e0b' },
    { label: 'Visit Scheduled', value: overview?.visitScheduled, icon: CalendarCheck, color: '#a855f7' },
    { label: 'Joined', value: overview?.joined, icon: TrendingUp, color: '#22c55e' },
    { label: 'Rejected', value: overview?.rejected, icon: XCircle, color: '#ef4444' },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-text-primary">Overview</h2>
          <p className="text-xs text-text-muted mt-0.5">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <Link to="/inquiries/create" className="btn-primary text-sm flex items-center gap-2">
          <PlusCircle size={14} />
          New Inquiry
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
        {loadingStats
          ? Array(5).fill(0).map((_, i) => <CardSkeleton key={i} />)
          : stats.map((s) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: stats.indexOf(s) * 0.05 }}
              >
                <StatCard {...s} loading={loadingStats} />
              </motion.div>
            ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Monthly Line Chart */}
        <div className="vf-card p-5 xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="section-title">Monthly Inquiries</p>
              <p className="section-subtitle">Inquiry volume over time</p>
            </div>
          </div>
          {loadingStats ? (
            <div className="skeleton h-48 w-full rounded-btn" />
          ) : monthly.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-text-muted text-sm">
              No data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Status Pie Chart */}
        <div className="vf-card p-5">
          <div className="mb-4">
            <p className="section-title">Status Overview</p>
            <p className="section-subtitle">Breakdown by status</p>
          </div>
          {loadingStats ? (
            <div className="skeleton h-48 w-full rounded-btn" />
          ) : statusData.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-text-muted text-sm">
              No data available
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {statusData.map((entry) => (
                      <Cell key={entry.name} fill={CHART_COLORS[entry.name] || '#6b7280'} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-2 w-full">
                {statusData.map((d) => (
                  <div key={d.name} className="flex items-center gap-1.5">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: CHART_COLORS[d.name] || '#6b7280' }}
                    />
                    <span className="text-xs text-text-muted truncate">{d.name}</span>
                    <span className="text-xs text-text-primary ml-auto">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Inquiries */}
      <div className="vf-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <div>
            <p className="section-title">Recent Inquiries</p>
            <p className="section-subtitle">Latest 8 entries</p>
          </div>
          <Link to="/inquiries" className="btn-ghost text-xs flex items-center gap-1">
            View all <ArrowRight size={11} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="vf-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Branch</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            {loadingRecent ? (
              <TableSkeleton rows={5} cols={6} />
            ) : (
              <tbody>
                {recentInquiries.map((inq) => (
                  <motion.tr
                    key={inq._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <td>
                      <Link to={`/inquiries/${inq._id}`} className="text-text-primary hover:text-accent transition-colors font-medium">
                        {inq.name}
                      </Link>
                    </td>
                    <td className="text-text-secondary">{inq.mobile}</td>
                    <td className="text-text-secondary">{inq.branch}</td>
                    <td className="text-text-secondary">{formatCurrency(inq.budget)}</td>
                    <td><Badge status={inq.status} /></td>
                    <td className="text-text-muted text-xs">{timeAgo(inq.createdAt)}</td>
                  </motion.tr>
                ))}
                {recentInquiries.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-text-muted text-sm">
                      No inquiries yet.{' '}
                      <Link to="/inquiries/create" className="text-accent hover:underline">
                        Create your first one
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
