import { Helmet } from "react-helmet-async";
import Back from "../../../../components/Shared/Back";
import usePayment from "../../../../hooks/usePayment";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Barchart from "./Barchart";
import useUser from "../../../../hooks/useUser";
import Loader from "../../../../components/Shared/Loader";

const Balance = () => {
  const axiosSecure = useAxiosSecure();
  const { users } = useUser();
  console.log(users);
  const { data: recentPayments = [], isLoading } = useQuery({
    queryKey: [" recent payments"],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get(`/recent-payments`);
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });
  const { payments } = usePayment();
  const totalBalance = payments.reduce(
    (accum, total) => accum + parseInt(total.price),
    0
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Helmet>
        <title>FitRack | Balance</title>
      </Helmet>
      <Back></Back>
      <div>
        {/* Simple Header */}
        <h1 className="text-2xl font-bold mb-4 dark:text-white">
          Total: ${totalBalance}
        </h1>

        {/* Simple Table */}
        {recentPayments?.length === 0 ? (
          <p className="text-center mt-5">No Transactions</p>
        ) : (
          <div className="overflow-x-auto  ">
            <table className="w-full bg-white border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Member</th>
                  <th className="p-3 text-left">Package</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments &&
                  recentPayments.map((p) => (
                    <tr
                      key={p._id}
                      className="border dark:border-gray-900 dark:bg-gray-900 dark:text-white even:bg-gray-50 dark:even:bg-gray-900/90"
                    >
                      <td className="p-3">{p.name}</td>
                      <td className="p-3">{p.membershipType}</td>
                      <td className={`p-3 font-semibold text-primary`}>
                        {p.price}$
                      </td>
                      <td className={`p-3`}>{p.date}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Barchart></Barchart>
    </div>
  );
};

export default Balance;
