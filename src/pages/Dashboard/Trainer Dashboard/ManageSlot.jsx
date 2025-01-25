import React from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import useTrainer from "../../../hooks/useTrainer";
import { FaTrash } from "react-icons/fa6";
import usePayment from "../../../hooks/usePayment";
import { TiTick } from "react-icons/ti";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Select from "react-select/base";

const ManageSlot = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const { user } = useAuth();
  const { trainers } = useTrainer();
  const { payments } = usePayment();

  const currentTrainer = trainers.find((t) => t.email === user.email);
  console.log(currentTrainer);

  const bookingSlots = payments.filter((p) => p.trainer === user.displayName);
  console.log(bookingSlots);

  // const defaultSlots = currentTrainer?.availableDays?.map((day) => ({
  //   value: day,
  //   label: day,
  // }));

  return (
    <div>
      <Helmet>
        <title>FitRack | Manage Slot</title>
      </Helmet>

      <div>
        {/* Simple Header */}
        <h1 className="text-2xl font-bold mb-4">All Users</h1>

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
                  {currentTrainer.availableDays?.map((d) => (
                    <p>
                      {d} ({currentTrainer.availableTime})
                    </p>
                  ))}
                </td>
                <td className="p-3">
                  <button className="text-xl p-2 bg-red-600 text-white rounded-md hover:bg-opacity-50">
                    {" "}
                    <FaTrash />{" "}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="bg-yellow-50 w-fit p-5 mt-5">
            <h3 className="text-xl font-semibold mb-2">My Booking Slots:</h3>

            {bookingSlots.length > 0 ? (
              <div>
                {bookingSlots.map((slot) => (
                  <p className="flex items-center">
                    <TiTick className="text-lg text-green-500" /> {slot.slot}
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
