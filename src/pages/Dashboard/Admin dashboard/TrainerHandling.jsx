import React from "react";
import { FaTrash } from "react-icons/fa6";
import useUser from "../../../hooks/useUser";
import Back from "../../../components/Shared/Back";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const TrainerHandling = () => {
  const { users, refetch } = useUser();
  const axiosPublic = useAxiosPublic();
  const trainers = users.filter((u) => u.role === "trainer");

  const handleRemoveTrainerRole = (trainer) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Would you want to make ${trainer.name} member?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.patch(`/users/make-member/${trainer._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            console.log(res.data);
            refetch();
            Swal.fire({
              title: `${trainer.name} is now a member!`,
              icon: "success",
            });
          }
        });
        // axiosPublic.delete(`/users/${trainer._id}`).then((res) => {
        //   if (res.data.deletedCount > 0) {
        //     refetch();
        //   }
        // });
      }
    });
  };

  return (
    <div>
      <Back></Back>
      <div>
        {/* Simple Header */}
        <h1 className="text-2xl font-bold mb-4">Trainers</h1>

        {/* Total Count */}
        <div className="mb-4">
          <p className="text-gray-600">Total Trainers: {trainers?.length}</p>
        </div>

        {/* Simple Table */}
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
                  <tr key={trainer._id} className="border-t even:bg-gray-50">
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
      </div>
    </div>
  );
};

export default TrainerHandling;
