import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./axios_hook/useAxiosSecure";

const useAdmin = () => {
  const { user, loader } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin, isPending: adminLoading } = useQuery({
    queryKey: [user?.email, "admin"],
    enabled: !loader,
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get(`/user/admin/${user.email}`);

        return data?.isAdmin;
      } catch (error) {
        console.error(error);
      }
    },
  });
  return { isAdmin, adminLoading };
};

export default useAdmin;
