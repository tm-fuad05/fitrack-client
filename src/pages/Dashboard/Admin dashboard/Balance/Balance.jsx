import { Helmet } from "react-helmet-async";
import Back from "../../../../components/Shared/Back";
import usePayment from "../../../../hooks/usePayment";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Barchart from "./Barchart";
import useUser from "../../../../hooks/useUser";
import Loader from "../../../../components/Shared/Loader";
import {
  FiDollarSign,
  FiTrendingUp,
  FiCreditCard,
  FiCalendar,
} from "react-icons/fi";

const Balance = () => {
  const axiosSecure = useAxiosSecure();
  const { users } = useUser();
  console.log(users);

  const { data: recentPayments = [], isLoading } = useQuery({
    queryKey: ["recent payments"], // Removed whitespace prefix from key
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get(`/recent-payments`);
        return data;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  });

  const { payments } = usePayment();
  const totalBalance = payments.reduce(
    (accum, total) => accum + parseInt(total.price || 0),
    0,
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-8 antialiased">
      <Helmet>
        <title>FitRack | Balance Overview</title>
      </Helmet>

      <div className="flex items-center justify-between">
        <Back />
      </div>

      {/* Metrics Stat Cards Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Revenue Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-transparent border border-gray-300/60 dark:border-white/10 backdrop-blur-md shadow-sm relative overflow-hidden group">
          <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-extrabold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Total Aggregated Revenue
              </p>
              <h3 className="text-3xl font-black text-slate-950 dark:text-white mt-1.5 tracking-tight flex items-baseline">
                <span className="text-primary text-2xl font-bold mr-0.5">
                  $
                </span>
                {totalBalance.toLocaleString()}
              </h3>
            </div>
            <div className="p-3.5 rounded-xl bg-primary/10 text-primary text-xl border border-primary/20">
              <FiDollarSign />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-green-500 bg-green-500/10 w-fit px-2 py-1 rounded-md border border-green-500/10">
            <FiTrendingUp /> Active Terminal Account
          </div>
        </div>

        {/* Recent Transactions Meter */}
        <div className="p-6 rounded-2xl bg-white dark:bg-transparent border border-gray-300/60 dark:border-white/10 backdrop-blur-md shadow-sm relative overflow-hidden group">
          <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-extrabold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Monitored Volume
              </p>
              <h3 className="text-3xl font-black text-slate-950 dark:text-white mt-1.5 tracking-tight">
                {recentPayments?.length || 0}{" "}
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Batches
                </span>
              </h3>
            </div>
            <div className="p-3.5 rounded-xl bg-secondary/10 text-secondary text-xl border border-secondary/20">
              <FiCreditCard />
            </div>
          </div>
          <div className="mt-4 text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Realtime Payment Handlers Active
          </div>
        </div>
      </div>

      {/* Industrial Grade Data Table Module */}
      <div className="mb-5">
        <h2 className="text-lg font-black tracking-tight text-slate-950 dark:text-white uppercase">
          Recent Logs Terminal
        </h2>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-0.5">
          Comprehensive audit overview of inbound system ledger payments.
        </p>
      </div>

      {recentPayments?.length === 0 ? (
        <div className="py-12 text-center rounded-xl border-2 border-dashed border-gray-300 dark:border-white/10">
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 tracking-wide uppercase">
            No Transactions Registered In Current Frame
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-300/60 dark:border-white/5">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white dark:bg-white/5 border-b border-gray-300 dark:border-white/10">
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Member ID
                </th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Package Scope
                </th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Price Metric
                </th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/5">
              {recentPayments.map((p) => (
                <tr
                  key={p._id}
                  className="group bg-gray-50 dark:bg-transparent dark:hover:bg-white/5 transition-colors duration-200"
                >
                  <td className="p-4 text-sm font-bold text-slate-950 dark:text-gray-200">
                    {p.name}
                  </td>
                  <td className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 border border-gray-300/50 dark:border-white/10">
                      {p.membershipType}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-black text-primary tracking-wide">
                    ${parseFloat(p.price || 0).toLocaleString()}
                  </td>
                  <td className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-0.5">
                    <FiCalendar className="text-secondary" /> {p.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Analytics Visualization Block */}
      <div className="p-6 rounded-2xl bg-white dark:bg-transparent border border-gray-300/60 dark:border-white/10 backdrop-blur-md shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-black tracking-tight text-slate-950 dark:text-white uppercase">
            Revenue Metrics Chart
          </h2>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-0.5">
            Data visualization matrix mapping overall financial performance
            distribution.
          </p>
        </div>
        <Barchart />
      </div>
    </div>
  );
};

export default Balance;
