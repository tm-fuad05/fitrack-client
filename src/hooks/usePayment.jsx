import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxios";

const usePayment = () => {
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get(`/payments`);
        return data;
      } catch (error) {
        console.error(error?.response?.data?.message || error?.message);
      }
    },
  });
  return { payments };
};

export default usePayment;
