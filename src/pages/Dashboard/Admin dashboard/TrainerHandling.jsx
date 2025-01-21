import React from "react";
import useTrainer from "../../../hooks/useTrainer";
import { MdGroups2 } from "react-icons/md";

const TrainerHandling = () => {
  const { trainers } = useTrainer();
  console.log(trainers);
  return (
    <div>
      <div>
        {/* Simple Header */}
        <h1 className="text-2xl font-bold mb-4">All Trainers</h1>

        {/* Total Count */}
        <div className="mb-4">
          <p className="text-gray-600">Total trainers: {trainers?.length}</p>
        </div>

        {/* Simple Table */}
        <div className="overflow-x-auto  ">
          <table className="w-full bg-white border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Photo</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Year of Experience</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {trainers &&
                trainers.map((trainer) => (
                  <tr key={trainer._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      <img
                        className="w-20 h-12 object-cover"
                        src={trainer.profileImage}
                        alt=""
                      />
                    </td>
                    <td className="p-3">{trainer.trainerName}</td>
                    <td className="p-3">{trainer.yearsOfExperience}</td>
                    <td className="p-3">
                      <button className="text-2xl p-2 bg-primary text-white rounded-md hover:bg-opacity-50">
                        {" "}
                        <MdGroups2 />{" "}
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
