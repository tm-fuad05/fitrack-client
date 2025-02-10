import React from "react";
import useAppliedTrainer from "../../../hooks/useAppliedTrainer";
import { TiTick } from "react-icons/ti";
import { FaTrash } from "react-icons/fa6";
import { TbListDetails } from "react-icons/tb";
import { Link } from "react-router-dom";

// SweetAlert
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import useUser from "../../../hooks/useUser";
import Back from "../../../components/Shared/Back";
// Material Ui
import { Dialog, DialogBody, Input, Textarea } from "@material-tailwind/react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Loader from "../../../components/Shared/Loader";

const AppliedTrainer = () => {
  const { appliedTrainers, refetch, isLoading } = useAppliedTrainer();
  const pendingFilter = appliedTrainers?.filter((p) => p.status === "pending");
  const axiosSecure = useAxiosSecure();
  const { users } = useUser();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const handleConfirmTrainer = async (trainer) => {
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

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You want to confirm ${trainer.fullName} as trainer?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    });
    if (!result.isConfirmed) return;
    try {
      const [postRes, deleteRes, patchRes] = await Promise.all([
        axiosSecure.post("/trainers", confirmedTrainer), // Add trainer
        axiosSecure.delete(`/applied-as-trainer/${trainer._id}`), // Remove application
        axiosSecure.patch(`/users/make-trainer/${currentTrainer._id}`), // Update role
      ]);

      if (!postRes.data.success) aler("Failed to confirm trainer.");
      if (!deleteRes.data.success)
        alert("Failed to remove trainer application.");
      if (!patchRes.data.success) alert("Failed to update trainer role.");

      refetch();
      Swal.fire({
        title: "Confirmed!",
        text: `${trainer.fullName} is Trainer now.`,
        icon: "success",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Something went wrong!",
        text: `${error}`,
        icon: "error",
      });
    }
  };

  //   Rejecting feedback
  const handleSendFeedback = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const feedback = form.feedback.value;
    const rejectionFeedback = {
      email,
      feedback,
    };
    try {
      const { data } = await axiosSecure.post(
        "/rejection-feedback",
        rejectionFeedback
      );
      if (data.insertedId) {
        Swal.fire({
          title: "Feedback Sent",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Failed to send feedback:", error);
    }
  };

  const handleReject = async (trainer) => {
    handleOpen();

    // Delete from appliedTrainer
    try {
      const { data } = await axiosSecure.patch(
        `/applied-as-trainer/${trainer._id}`
      );
      if (data.modifiedCount > 0) {
        refetch();
      }
    } catch (error) {
      console.error("Failed to reject:", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Helmet>
        <title>FitRack | Applied trainers</title>
      </Helmet>
      <Back></Back>
      <div>
        {/* Simple Header */}
        <h1 className="text-2xl font-bold mb-4">Applied Trainers</h1>

        {/* Total Count */}
        {pendingFilter?.length > 0 && (
          <div className="mb-4">
            <p className="text-gray-600">
              Total Applied Trainers: {pendingFilter?.length}
            </p>
          </div>
        )}

        {/* Simple Table */}
        {pendingFilter?.length === 0 ? (
          <p className="text-center mt-5">No users apply for trainer</p>
        ) : (
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
                            <Textarea
                              label="Feedback"
                              name="feedback"
                              required
                            />

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
        )}
      </div>
    </div>
  );
};

export default AppliedTrainer;
