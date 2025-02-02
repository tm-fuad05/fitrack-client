import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const usePayment = () => {
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get(`/payments`);
        return data.data;
      } catch (error) {
        console.error(error);
      }
    },
  });
  return { payments };
};

export default usePayment;
