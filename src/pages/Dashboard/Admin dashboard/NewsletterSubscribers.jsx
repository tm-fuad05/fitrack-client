import React, { useState } from "react";
import useNewsletter from "../../../hooks/useNewsletter";
import { Helmet } from "react-helmet-async";
import Loader from "../../../components/Shared/Loader";

const NewsletterSubscribers = () => {
  const { newsletters, isLoading } = useNewsletter();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Helmet>
        <title>FitRack | Newsletters</title>
      </Helmet>
      {/* Simple Header */}
      <h1 className="text-2xl font-bold mb-4 dark:text-white">
        Newsletter Subscribers
      </h1>

      {/* Total Count */}
      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-500">
          Total Subscribers: {newsletters.length}
        </p>
      </div>

      {/* Simple Table */}
      {newsletters?.length === 0 ? (
        <p className="text-center mt-5">No newsletters found</p>
      ) : (
        <div className="overflow-x-auto  ">
          <table className="w-full bg-white border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-left">Message</th>
              </tr>
            </thead>
            <tbody>
              {newsletters.map((subscriber) => (
                <tr
                  key={subscriber.id}
                  className="border dark:border-gray-900 dark:bg-gray-900 dark:text-white even:bg-gray-50 dark:even:bg-gray-900/90"
                >
                  <td className="p-3">{subscriber.name}</td>
                  <td className="p-3">{subscriber.email}</td>
                  <td className="p-3">{subscriber.phone}</td>
                  <td className="p-3">{subscriber.subject}</td>
                  <td className="p-3">{subscriber.message}</td>
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
