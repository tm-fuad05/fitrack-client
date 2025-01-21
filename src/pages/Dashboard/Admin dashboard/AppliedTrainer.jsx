import React from "react";
import useAppliedTrainer from "../../../hooks/useAppliedTrainer";
import { TiTick } from "react-icons/ti";
import { FaTrash } from "react-icons/fa6";
import { TbListDetails } from "react-icons/tb";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
// SweetAlert
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import useUser from "../../../hooks/useUser";
const AppliedTrainer = () => {
  const { appliedTrainers, refetch } = useAppliedTrainer();
  const axiosPublic = useAxiosPublic();
  const { users } = useUser();

  const handleConfirmTrainer = (trainer) => {
    const currentTrainer = users.find((u) => u.email === trainer.email);

    const confirmedTrainer = {
      fullName: trainer.fullName,
      email: trainer.email,
      age: trainer.age,
      profileImage: trainer.profileImage,
      skills: trainer.skills,
      availableDays: trainer.availableDays,
      availableTime: trainer.availableTime,
    };
    Swal.fire({
      title: "Are you sure?",
      text: `You want to confirm ${trainer.fullName} as trainer?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        // Post to ConfirmedTrainer
        axiosPublic.post("/confirmed-trainer", confirmedTrainer).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Confirmed!",
              text: `${trainer.fullName} is Trainer now.`,
              icon: "success",
            });
          }
        });

        // Delete from appliedTrainer
        axiosPublic.delete(`/applied-as-trainer/${trainer._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
          }
        });

        // Role Change from users
        axiosPublic
          .patch(`/users/make-trainer/${currentTrainer._id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
            }
          });
      }
    });
  };

  return (
    <div>
      <div>
        {/* Simple Header */}
        <h1 className="text-2xl font-bold mb-4">All appliedTrainers</h1>

        {/* Total Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Total Applied Trainers: {appliedTrainers?.length}
          </p>
        </div>

        {/* Simple Table */}
        <div className="overflow-x-auto  ">
          <table className="w-full bg-white border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Details</th>
                <th className="p-3 text-left">Confirm</th>
                <th className="p-3 text-left">Reject</th>
              </tr>
            </thead>
            <tbody>
              {appliedTrainers &&
                appliedTrainers.map((trainer) => (
                  <tr key={trainer._id} className="border hover:bg-gray-50">
                    <td className="p-3">{trainer.fullName}</td>
                    <td className="p-3">{trainer.email}</td>
                    <td className={`p-3 font-semibold text-primary`}>
                      {trainer.status}
                    </td>
                    <td className="p-3">
                      <Link to={trainer._id}>
                        <button
                          onClick={() => handleRole(trainer)}
                          className="text-xl p-2 bg-secondary  text-white rounded-md hover:bg-opacity-50"
                        >
                          {" "}
                          <TbListDetails />{" "}
                        </button>
                      </Link>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleConfirmTrainer(trainer)}
                        className="text-xl p-2 bg-green-600 text-white rounded-md hover:bg-opacity-50"
                      >
                        {" "}
                        <TiTick />{" "}
                      </button>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(trainer)}
                        className="text-xl p-2 bg-red-600 text-white rounded-md hover:bg-opacity-50"
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

export default AppliedTrainer;
