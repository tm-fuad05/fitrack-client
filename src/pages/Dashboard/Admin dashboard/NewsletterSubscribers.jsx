import React from "react";
import useNewsletter from "../../../hooks/useNewsletter";
import { Helmet } from "react-helmet-async";
import Loader from "../../../components/Shared/Loader";
import {
  FiUsers,
  FiMail,
  FiPhone,
  FiBookOpen,
  FiMessageSquare,
} from "react-icons/fi";

const NewsletterSubscribers = () => {
  const { newsletters = [], isLoading } = useNewsletter();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6 antialiased">
      <Helmet>
        <title>FitRack | Newsletter Subscribers</title>
      </Helmet>

      {/* Premium Analytics Metric & Header Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-transparent border border-gray-300/60 dark:border-white/10 backdrop-blur-md shadow-sm relative overflow-hidden">
        <div className="absolute top-[-30%] right-[-10%] w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-black tracking-tight text-surface-dark dark:text-white uppercase flex items-center gap-2">
              <FiUsers className="text-primary" /> Newsletter Subscribers
            </h1>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-0.5">
              Manage and analyze incoming audience leads and newsletter
              communications.
            </p>
          </div>

          {/* Total Counter Badge */}
          <div className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 flex items-center gap-3 w-fit">
            <span className="text-xs font-extrabold uppercase tracking-wider text-gray-600 dark:text-gray-400">
              Total Leads
            </span>
            <span className="text-2xl font-black text-surface-dark dark:text-white tracking-tight">
              {newsletters?.length || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Industrial Grade Ledger Table Module */}
      {newsletters?.length === 0 ? (
        <div className="py-16 text-center rounded-xl border-2 border-dashed border-gray-300 dark:border-white/10">
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 tracking-wide uppercase">
            No Subscriber Leads Registered
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-300/60 dark:border-white/5">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/80 bg-white dark:bg-white/5 border-b border-gray-300 dark:border-white/10">
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Subscriber Name
                </th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  <span className="flex items-center gap-1.5">
                    <FiMail className="text-primary" /> Email
                  </span>
                </th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  <span className="flex items-center gap-1.5">
                    <FiPhone className="text-secondary" /> Phone
                  </span>
                </th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  <span className="flex items-center gap-1.5">
                    <FiBookOpen /> Subject
                  </span>
                </th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  <span className="flex items-center gap-1.5">
                    <FiMessageSquare /> Message Payload
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/5">
              {newsletters.map((subscriber) => (
                <tr
                  key={subscriber.id || subscriber._id}
                  className="group bg-gray-50 dark:bg-transparent dark:hover:bg-white/5 transition-colors duration-200"
                >
                  {/* Name */}
                  <td className="p-4 text-sm font-bold text-surface-dark dark:text-gray-200 whitespace-nowrap">
                    {subscriber.name}
                  </td>

                  {/* Email */}
                  <td className="p-4 text-sm font-semibold text-slate-800 dark:text-gray-300 whitespace-nowrap">
                    {subscriber.email}
                  </td>

                  {/* Phone */}
                  <td className="p-4 text-xs font-bold tracking-wide text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {subscriber.phone || "N/A"}
                  </td>

                  {/* Subject */}
                  <td className="p-4 text-sm font-medium text-slate-900 dark:text-gray-300 max-w-[180px] truncate">
                    {subscriber.subject || "No Subject"}
                  </td>

                  {/* Message */}
                  <td
                    className="p-4 text-xs font-medium text-gray-500 dark:text-gray-400 max-w-[250px] truncate"
                    title={subscriber.message}
                  >
                    {subscriber.message || "Empty Payload"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NewsletterSubscribers;
