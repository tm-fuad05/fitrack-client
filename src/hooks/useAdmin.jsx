import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin, isPending: adminLoading } = useQuery({
    queryKey: [user?.email, "admin"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/admin/${user?.email}`);
      console.log(data);
      return data.isAdmin;
    },
  });
  return { isAdmin, adminLoading };
};

export default useAdmin;
