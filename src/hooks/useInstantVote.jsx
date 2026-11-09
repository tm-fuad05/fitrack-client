/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

export const useInstantVote = (community) => {
  const { user } = useAuth();
  const [isVoted, setIsVoted] = useState(
    community?.votedBy?.includes(user?.email),
  );
  const [voteCount, setVoteCount] = useState(community?.votedBy?.length);

  //   useEffect(() => {
  //     setIsVoted((prev) => !prev);
  //     setVoteCount((prev) => (isVoted ? prev + 1 : prev - 1));
  //   }, [isVoted, voteCount]);

  return { isVoted, voteCount };
};
