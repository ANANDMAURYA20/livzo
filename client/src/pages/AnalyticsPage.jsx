import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { TrendingUp, Users, CalendarCheck, DollarSign } from 'lucide-react';
import { analyticsService } from '../services/analyticsService';
import { formatCurrency, formatDate } from '../utils/formatters';
import { CHART_COLORS } from '../utils/constants';
import Badge from '../components/ui/Badge';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-panel border border-border rounded-btn px-3 py-2 text-xs shadow-modal">
      <p className="text-text-muted mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-text-primary" style={{ color: p.color }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

const AnalyticsPage = () => {
  const [overview, setOverview] = useState(null);
  const [monthly, setMonthly] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [branchData, setBranchData] = useState([]);
  const [upcomingVisits, setUpcomingVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [ov, mo, st, br, uv] = await Promise.all([
          analyticsService.getOverview(),
          analyticsService.getMonthly(),
          analyticsService.getStatusBreakdown(),
          analyticsService.getBranchPerformance(),
          analyticsService.getUpcomingVisits(),
        ]);
        setOverview(ov.data);
        setMonthly(mo.data);
        setStatusData(st.data);
        setBranchData(br.data);
        setUpcomingVisits(uv.data);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const conversionRate = overview
    ? overview.total > 0
      ? Math.round((overview.joined / overview.total) * 100)
      : 0
    : 0;

  const rejectionRate = overview
    ? overview.total > 0
      ? Math.round((overview.rejected / overview.total) * 100)
      : 0
    : 0;

  return (
    <div className="space-y-6 w-full">
      <div>
        <h2 className="text-lg font-medium text-text-primary">Analytics</h2>
        <p className="text-xs text-text-muted mt-0.5">Performance overview and trends</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Inquiries', value: overview?.total, icon: Users, color: '#016B46' },
          { label: 'Conversion Rate', value: `${conversionRate}%`, icon: TrendingUp, color: '#22c55e' },
          { label: 'Rejection Rate', value: `${rejectionRate}%`, icon: TrendingUp, color: '#ef4444' },
          { label: 'Visit Scheduled', value: overview?.visitScheduled, icon: CalendarCheck, color: '#a855f7' },
        ].map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="vf-card p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-text-muted">{k.label}</span>
              <k.icon size={14} style={{ color: k.color }} />
            </div>
            <span className="text-2xl font-semibold text-text-primary">
              {loading ? '—' : k.value ?? 0}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Monthly + Pie */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="vf-card p-5 xl:col-span-2">
          <p className="section-title mb-1">Monthly Inquiries</p>
          <p className="section-subtitle mb-4">Volume by month</p>
          {loading ? (
            <div className="skeleton h-52 w-full rounded-btn" />
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(1,76,51,0.08)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(1,76,51,0.48)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(1,76,51,0.48)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="count" stroke="#016B46" strokeWidth={2} dot={{ fill: '#016B46', r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="vf-card p-5">
          <p className="section-title mb-1">Status Breakdown</p>
          <p className="section-subtitle mb-4">Distribution by status</p>
          {loading ? (
            <div className="skeleton h-52 w-full rounded-btn" />
          ) : (
            <div>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value">
                    {statusData.map((d) => (
                      <Cell key={d.name} fill={CHART_COLORS[d.name] || '#6b7280'} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 mt-2">
                {statusData.map((d) => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[d.name] }} />
                      <span className="text-xs text-text-muted">{d.name}</span>
                    </div>
                    <span className="text-xs text-text-primary font-medium">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Branch Performance + Upcoming Visits */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Branch bar chart */}
        <div className="vf-card p-5">
          <p className="section-title mb-1">Branch Performance</p>
          <p className="section-subtitle mb-4">Total vs Joined by branch</p>
          {loading ? (
            <div className="skeleton h-52 w-full rounded-btn" />
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={branchData} barSize={12} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(1,76,51,0.08)" />
                <XAxis dataKey="branch" tick={{ fill: 'rgba(1,76,51,0.48)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(1,76,51,0.48)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="total" name="Total" fill="rgba(1,107,70,0.5)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="joined" name="Joined" fill="#22c55e" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Upcoming Visits */}
        <div className="vf-card p-5">
          <p className="section-title mb-1">Upcoming Visits</p>
          <p className="section-subtitle mb-4">Next scheduled visits</p>
          {loading ? (
            <div className="space-y-3">
              {Array(4).fill(0).map((_, i) => <div key={i} className="skeleton h-12 w-full rounded-btn" />)}
            </div>
          ) : upcomingVisits.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-text-muted text-sm">
              No upcoming visits scheduled
            </div>
          ) : (
            <div className="space-y-2">
              {upcomingVisits.map((v) => (
                <motion.div
                  key={v._id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 bg-panel rounded-btn border border-border"
                >
                  <div>
                    <p className="text-sm font-medium text-text-primary">{v.name}</p>
                    <p className="text-xs text-text-muted">{v.branch} · {v.mobile}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-text-secondary">{formatDate(v.visitDate)}</p>
                    <Badge status={v.status} className="mt-1" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
