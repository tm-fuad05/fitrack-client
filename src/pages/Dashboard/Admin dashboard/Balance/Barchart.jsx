import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import useNewsletter from "../../../../hooks/useNewsletter";
import usePayment from "../../../../hooks/usePayment";

// Custom Premium Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 dark:bg-neutral-950/90 backdrop-blur-md px-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl shadow-xl">
        <p className="text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">
          {payload[0].payload.name}
        </p>
        <p className="text-lg font-black text-slate-950 dark:text-white tracking-tight">
          {payload[0].value.toLocaleString()}{" "}
          <span className="text-xs font-bold text-gray-400 uppercase">
            Total
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const Barchart = () => {
  const { newsletters } = useNewsletter();
  const { payments } = usePayment();

  const data = [
    {
      name: "Newsletters",
      total: newsletters?.length || 0,
    },
    {
      name: "Paid Members",
      total: payments?.length || 0,
    },
  ];

  return (
    <div className="w-full h-[320px] md:h-[400px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
        >
          {/* Subtle Grid System Alternative using standard CSS or fine axes */}
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "currentColor", fontSize: 11, fontWeight: 700 }}
            className="text-gray-500 dark:text-gray-400 uppercase tracking-wider"
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "currentColor", fontSize: 11, fontWeight: 600 }}
            className="text-gray-400 dark:text-gray-500"
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "currentColor", opacity: 0.04 }}
          />

          {/* Bar with Dynamic Theme Gradient Orbs / Colors */}
          <Bar dataKey="total" radius={[10, 10, 0, 0]} maxBarSize={60}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                // Primary tracking color for index 0, Secondary brand gradient for index 1
                fill={
                  index === 0
                    ? "url(#primaryGradient)"
                    : "url(#secondaryGradient)"
                }
              />
            ))}
          </Bar>

          {/* SVG Gradients Injection for Premium Aesthetics */}
          <defs>
            <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--color-primary, #ff5200)"
                stopOpacity={1}
              />
              <stop
                offset="100%"
                stopColor="var(--color-primary, #ff5200)"
                stopOpacity={0.6}
              />
            </linearGradient>
            <linearGradient id="secondaryGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--color-secondary, #00ffcc)"
                stopOpacity={1}
              />
              <stop
                offset="100%"
                stopColor="var(--color-secondary, #00ffcc)"
                stopOpacity={0.6}
              />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Barchart;
