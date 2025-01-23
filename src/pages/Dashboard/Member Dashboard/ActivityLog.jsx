import React from "react";
import useAppliedTrainer from "../../../hooks/useAppliedTrainer";

import Back from "../../../components/Shared/Back";
import useAuth from "../../../hooks/useAuth";
import { IoEyeOutline } from "react-icons/io5";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa6";
import axios from "axios";

const ActivityLog = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  // Feedback
  const { data: rejectionFeedback = [] } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/rejection-feedback");
      return data;
    },
  });

  const rejectedUser = rejectionFeedback.find((u) => u.email === user.email);

  const { appliedTrainers, refetch } = useAppliedTrainer();

  const currentUser = appliedTrainers.find((u) => u.email === user.email);
  console.log(currentUser);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const handleDelete = () => {
    axiosPublic.delete(`/applied-as-trainer/${currentUser._id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        refetch();
        Swal.fire({
          title: "Deleted",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <Back></Back>
      <div>
        {/* Simple Header */}
        <h1 className="text-2xl font-bold mb-4">Activity Log</h1>

        {/* Simple Table */}
        <div className="overflow-x-auto  ">
          <table className="w-full bg-white border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Applied for</th>
                <th className="p-3 text-left">Status</th>
                {currentUser?.status === "rejected" && (
                  <th className="p-3 text-left">Feedback</th>
                )}
                <th className="p-3 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {currentUser && (
                <tr className="border even:bg-gray-50">
                  <td className="p-3">{currentUser?.fullName}</td>
                  <td className="p-3">{currentUser?.email}</td>
                  <td className="p-3 text-green-500 font-[600]">trainer</td>

                  <td className={`p-3 font-semibold text-primary`}>
                    {currentUser?.status}
                  </td>
                  {currentUser?.status === "rejected" && (
                    <td className={`p-3`}>
                      <button
                        onClick={handleOpen}
                        className="text-gray-700 text-2xl hover:text-gray-500"
                      >
                        <IoEyeOutline />
                      </button>
                    </td>
                  )}
                  <td className="p-3">
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 p-2 rounded-md hover:bg-opacity-50"
                    >
                      {" "}
                      <FaTrash className="text-white" />
                    </button>
                  </td>
                  <Dialog open={open} handler={handleOpen}>
                    <DialogHeader>Admin Feedback</DialogHeader>
                    <DialogBody>{rejectedUser?.feedback}</DialogBody>
                    <DialogFooter>
                      <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                      >
                        <span>Ok, I understand</span>
                      </Button>
                    </DialogFooter>
                  </Dialog>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
