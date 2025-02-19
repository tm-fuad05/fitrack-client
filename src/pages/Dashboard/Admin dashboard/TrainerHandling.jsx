import React from "react";
import { FaTrash } from "react-icons/fa6";
import useUser from "../../../hooks/useUser";
import Back from "../../../components/Shared/Back";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const TrainerHandling = () => {
  const { users, refetch } = useUser();
  const axiosSecure = useAxiosSecure();
  const trainers = users.filter((u) => u.role === "trainer");

  const handleRemoveTrainerRole = async (trainer) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Would you want to make ${trainer.name} member?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    });
    if (!result.isConfirmed) return;
    try {
      const { data } = await axiosSecure.patch(
        `/users/make-member/${trainer._id}`
      );
      if (data.success) {
        refetch();
        Swal.fire({
          title: `${trainer.name} is now a member!`,
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Failed to remove trainer role", error);
    }
  };

  return (
    <div>
      <Helmet>
        <title>FitRack | Trainers</title>
      </Helmet>
      <Back></Back>
      <div>
        {/* Simple Header */}
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Trainers</h1>

        {/* Total Count */}
        {trainers?.length > 0 && (
          <div className="mb-4">
            <p className="text-gray-600 dark:text-gray-500">
              Total Trainers: {trainers?.length}
            </p>
          </div>
        )}

        {/* Simple Table */}
        {trainers?.length === 0 ? (
          <p className="text-center mt-5">No trainers found in your website </p>
        ) : (
          <div className="overflow-x-auto  ">
            <table className="w-full bg-white border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {trainers &&
                  trainers.map((trainer) => (
                    <tr
                      key={trainer._id}
                      className="border dark:border-gray-900 dark:bg-gray-900 dark:text-white even:bg-gray-50 dark:even:bg-gray-900/90"
                    >
                      <td className="p-3">{trainer.name}</td>
                      <td className="p-3">{trainer.email}</td>
                      <td className="p-3 text-red-500 font-semibold">
                        {trainer.role}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleRemoveTrainerRole(trainer)}
                          className="text-xl p-2 bg-primary text-white rounded-md hover:bg-opacity-50"
                        >
                          {" "}
                          <FaTrash />{" "}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerHandling;
