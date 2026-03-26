import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899'];

function SpendingChart({ transactions }) {
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }));

  if (data.length === 0) return null;

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(v) => `$${v}`} />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Bar dataKey="value" name="Amount">
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
