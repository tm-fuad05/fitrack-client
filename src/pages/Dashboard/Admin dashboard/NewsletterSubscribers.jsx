import React, { useState } from "react";
import useNewsletter from "../../../hooks/useNewsletter";

const NewsletterSubscribers = () => {
  const newsletters = useNewsletter();
  return (
    <div>
      {/* Simple Header */}
      <h1 className="text-2xl font-bold mb-4">Newsletter Subscribers</h1>

      {/* Total Count */}
      <div className="mb-4">
        <p className="text-gray-600">Total Subscribers: {newsletters.length}</p>
      </div>

      {/* Simple Table */}
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
              <tr key={subscriber.id} className="border-t hover:bg-gray-50">
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
    </div>
  );
};

export default NewsletterSubscribers;
