import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: isAdmin,
    isPending: adminLoading,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "admin"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/admin/${user?.email}`);

      return data.isAdmin;
    },
  });
  return { isAdmin, adminLoading, refetch };
};

export default useAdmin;
