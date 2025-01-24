import React, { useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import useTrainer from "../../../hooks/useTrainer";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AddClass = () => {
  const axiosSecure = useAxiosSecure();
  const { trainers } = useTrainer();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    trainers: [],
  });

  const trainersName = trainers.map((trainer) => ({
    value: trainer.fullName,
    label: trainer.fullName,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const classesInfo = formData;
    axiosSecure.post("/classes", classesInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Successfully Added Class",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg lg:p-8">
      <Helmet>
        <title>FitRack | Add class</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Add Class
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Class Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Class Name
          </label>
          <input
            type="text"
            placeholder="Class Name"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        {/* Details */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Details
          </label>
          <textarea
            type="text"
            placeholder="Class Details"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={4}
            required
          />
        </div>
        {/* Trainers Specialize */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Trainers For this Class
          </label>
          <Select
            isMulti
            options={trainersName}
            className="w-full"
            onChange={(selected) =>
              setFormData({
                ...formData,
                trainers: selected.map((t) => t.value),
              })
            }
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-primary to-secondary py-3 rounded-md w-full text-white font-medium hover:bg-gradient-to-r hover:from-secondary hover:to-primary  border-none"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClass;
