import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import useNewsletter from "../../../../hooks/useNewsletter";
import usePayment from "../../../../hooks/usePayment";
const Barchart = () => {
  const { newsletters } = useNewsletter();
  console.log(newsletters);
  const { payments } = usePayment();

  const data = [
    {
      name: "Newsletters",
      total: newsletters?.length,
    },
    {
      name: "Paid Members",
      total: payments?.length,
    },
  ];

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-8">
        Newsletter Subscribers vs Paid Members
      </h3>
      <ResponsiveContainer width="50%" aspect={3}>
        <BarChart data={data} width={400} height={400}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8FBC8F" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Barchart;
