import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import useTrainer from "../../../hooks/useTrainer";
import { FaEye, FaTrash } from "react-icons/fa6";
import usePayment from "../../../hooks/usePayment";
import { TiTick } from "react-icons/ti";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import Select from "react-select";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const ManageSlot = () => {
  const axiosSecure = useAxiosSecure();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const { user } = useAuth();
  const { trainers, refetch } = useTrainer();
  const { payments } = usePayment();

  const currentTrainer = trainers.find((t) => t.email === user.email);

  const [formData, setFormData] = useState({
    availableDays: [],
  });
  console.log(formData);
  const bookingSlots = payments.filter((p) => p.trainer === user.displayName);

  const selectedSlots = currentTrainer?.availableDays?.map((d) => ({
    value: d,
    label: d,
  }));

  const handleManageSlots = (e) => {
    e.preventDefault();
    const managedSlots = formData;
    axiosSecure
      .patch(`/trainers/${currentTrainer._id}`, managedSlots)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Slot Deleted",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div>
      <Helmet>
        <title>FitRack | Manage Slot</title>
      </Helmet>

      <div>
        {/* Simple Header */}
        <h1 className="text-2xl font-bold mb-4">My Slots</h1>

        {/* Total Count */}
        <div className="mb-4">
          {/* <p className="text-gray-600">Total users: {users?.length}</p> */}
        </div>

        {/* Simple Table */}
        <div className="overflow-x-auto  ">
          <table className="w-full bg-white border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Slots</th>
                <th className="p-3 text-left">Delete a Slot</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3">{user?.displayName}</td>
                <td className="p-3">
                  {currentTrainer?.availableDays?.map((d) => (
                    <p>
                      {d} ({currentTrainer?.availableTime})
                    </p>
                  ))}
                </td>
                <td className="p-3">
                  <button
                    onClick={handleOpen}
                    className="text-xl p-2 bg-red-600 text-white rounded-md hover:bg-opacity-50"
                  >
                    {" "}
                    <FaTrash />{" "}
                  </button>
                  <Dialog open={open} handler={handleOpen}>
                    <DialogHeader>Slot Management</DialogHeader>
                    <DialogBody>
                      <form onSubmit={handleManageSlots}>
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Your Slots
                          </label>
                          <Select
                            isMulti
                            defaultValue={selectedSlots}
                            className="w-full"
                            onChange={(selected) =>
                              setFormData({
                                ...formData,
                                availableDays: selected.map((d) => d.value),
                              })
                            }
                          />
                        </div>
                        <div className="text-right">
                          <button
                            onClick={handleOpen}
                            className="mt-3 capitalize bg-gradient-to-r from-primary to-secondary text-white  hover:bg-gradient-to-l hoverfrom-primary hover:to-secondary font-[400] px-3 py-2 rounded-md"
                          >
                            Save changes
                          </button>
                        </div>
                      </form>
                    </DialogBody>
                  </Dialog>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="bg-yellow-50 w-fit p-5 mt-5">
            <h3 className="text-xl font-semibold mb-2">Booked Slots:</h3>

            {bookingSlots.length > 0 ? (
              <div>
                {bookingSlots.map((slot) => (
                  <p className="flex items-center">
                    <TiTick className="text-lg text-green-500" /> {slot.slot} ||
                    (Booked by: {slot.name})
                  </p>
                ))}
              </div>
            ) : (
              <p>No Booking Slots</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSlot;
