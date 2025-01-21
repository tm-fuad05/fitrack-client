import React from "react";
import useAppliedTrainer from "../../../hooks/useAppliedTrainer";
import { TiTick } from "react-icons/ti";
import { FaTrash } from "react-icons/fa6";
import { TbListDetails } from "react-icons/tb";
import { Link } from "react-router-dom";

const AppliedTrainer = () => {
  const { appliedTrainers } = useAppliedTrainer();
  console.log(appliedTrainers);
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
                        onClick={() => handleRole(trainer)}
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
