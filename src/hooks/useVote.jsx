/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export const useVote = (community) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [isVoted, setIsVoted] = useState(
    community?.votedBy?.includes(user?.email),
  );
  const [voteCount, setVoteCount] = useState(community?.votedBy?.length || 0);

  const mutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/communities/vote/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["community"],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error?.message);
    },
  });

  useEffect(() => {
    setIsVoted(community?.votedBy?.includes(user?.email));
    setVoteCount(community?.votedBy?.length || 0);
  }, [community, user?.email]);

  const handleVote = (id) => {
    if (user) {
      setIsVoted((prev) => !prev);
      setVoteCount((prev) => (isVoted ? prev - 1 : prev + 1));
      mutation.mutate(id);
    } else {
      navigate("/login", { state: pathname });
    }
  };

  return { isVoted, voteCount, handleVote };
};
