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
import Back from "../../../components/Shared/Back";
// Material Ui
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";

const AppliedTrainer = () => {
  const { appliedTrainers, refetch } = useAppliedTrainer();
  const pendingFilter = appliedTrainers.filter((p) => p.status === "pending");
  const axiosPublic = useAxiosPublic();
  const { users } = useUser();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

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
        // Post to allTrainer
        axiosPublic.post("/trainers", confirmedTrainer).then((res) => {
          if (res.data.insertedId) {
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
              Swal.fire({
                title: "Confirmed!",
                text: `${trainer.fullName} is Trainer now.`,
                icon: "success",
              });
            }
          });
      }
    });
  };

  //   Rejecting feedback
  const handleSendFeedback = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const feedback = form.feedback.value;
    const rejectionFeedback = {
      email,
      feedback,
    };
    axiosPublic.post("/rejection-feedback", rejectionFeedback).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Feedback Sent",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleReject = (trainer) => {
    handleOpen();

    // Delete from appliedTrainer
    axiosPublic.patch(`/applied-as-trainer/${trainer._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    });
  };

  return (
    <div>
      <Back></Back>
      <div>
        {/* Simple Header */}
        <h1 className="text-2xl font-bold mb-4">Applied Trainers</h1>

        {/* Total Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Total Applied Trainers: {pendingFilter?.length}
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
              {pendingFilter &&
                pendingFilter.map((trainer) => (
                  <tr key={trainer._id} className="border even:bg-gray-50">
                    <td className="p-3">{trainer.fullName}</td>
                    <td className="p-3">{trainer.email}</td>
                    <td className={`p-3 font-semibold text-primary`}>
                      {trainer.status}
                    </td>
                    <td className="p-3">
                      <Link to={trainer._id}>
                        <button className="text-xl p-2 bg-secondary  text-white rounded-md hover:bg-opacity-50">
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
                        onClick={handleOpen}
                        className="text-xl p-2 bg-red-600 text-white rounded-md hover:bg-opacity-50"
                      >
                        {" "}
                        <FaTrash />{" "}
                      </button>
                    </td>
                    <Dialog open={open} size="xs">
                      <DialogBody className="font-poppins">
                        <h2 className="text-center text-xl font-bold ">
                          {trainer.fullName}'s Info
                        </h2>
                        <div className="mt-4">
                          <p>
                            <span className="font-[600]">Name:</span>{" "}
                            {trainer.fullName}
                          </p>
                          <p>
                            <span className="font-[600]">Email:</span>{" "}
                            {trainer.email}
                          </p>
                          <p>
                            <span className="font-[600]">Age:</span>{" "}
                            {trainer.age}
                          </p>
                        </div>
                      </DialogBody>
                      <DialogBody className="font-poppins">
                        <form
                          onSubmit={handleSendFeedback}
                          className="space-y-4"
                        >
                          {/* Email */}
                          <Input
                            label="email"
                            name="email"
                            defaultValue={trainer.email}
                            readOnly
                          />

                          {/* Feedback */}
                          <Textarea label="Feedback" name="feedback" required />

                          <div className="text-right mt-2">
                            <button
                              onClick={() => handleReject(trainer)}
                              className="capitalize bg-gradient-to-r from-primary to-secondary text-white hover:bg-gradient-to-l hoverfrom-primary hover:to-secondary font-[400] px-3 py-2 rounded-md"
                            >
                              send feedback
                            </button>
                          </div>
                        </form>
                        <button
                          className="px-3 py-2 rounded-md hover:bg-gray-100"
                          onClick={handleOpen}
                        >
                          Cancel
                        </button>
                      </DialogBody>
                    </Dialog>
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
