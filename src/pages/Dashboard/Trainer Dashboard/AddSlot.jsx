import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTrainer from "../../../hooks/useTrainer";
import useAuth from "../../../hooks/useAuth";
import Select from "react-select";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";

const AddSlot = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { trainers, refetch } = useTrainer();
  const currentTrainer = trainers.find((t) => t.email === user.email);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: user.displayName,
    email: user?.email,
    age: currentTrainer?.age,
    profileImage: currentTrainer?.profileImage,
    skills: [],
    availableDays: [],
    slotName: "",
    availableTime: currentTrainer?.availableTime,
  });

  const selectedSkills = currentTrainer?.skills?.map((s) => ({
    value: s,
    label: s,
  }));

  const selectedSlots = currentTrainer?.availableDays?.map((d) => ({
    value: d,
    label: d,
  }));

  const daysOptions = [
    { value: "Sunday", label: "Sunday" },
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
  ];

  const classesOptions = [
    { value: "yoga", label: "Yoga" },
    { value: "hiit", label: "HIIT (High-Intensity Interval Training)" },
    { value: "zumba", label: "Zumba" },
    { value: "pilates", label: "Pilates" },
    { value: "spinning", label: "Spinning" },
    { value: "strength_training", label: "Strength Training" },
    { value: "boxing", label: "Boxing" },
    { value: "dance", label: "Dance Fitness" },
    { value: "crossfit", label: "CrossFit" },
    { value: "aqua_aerobics", label: "Aqua Aerobics" },
    { value: "barre", label: "Barre" },
    { value: "kickboxing", label: "Kickboxing" },
    { value: "tai_chi", label: "Tai Chi" },
    { value: "stretching", label: "Stretching" },
    { value: "cardio", label: "Cardio Workouts" },
    { value: "functional_training", label: "Functional Training" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const addedSlot = formData;
    axiosSecure
      .patch(`/trainers/addSlot/${currentTrainer._id}`, addedSlot)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Slot Added Successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            navigate("/dashboard/manage-slot");
          }, 1500);
        }
      });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
      <Helmet>
        <title>FitRack | Add Slots</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Apply to Be a Trainer
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            defaultValue={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            disabled
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Email (Read-Only)
          </label>
          <input
            type="email"
            placeholder="Your email"
            className="w-full border rounded-lg px-4 py-2 bg-gray-100"
            defaultValue={formData.email}
            disabled
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Age</label>
          <input
            type="number"
            placeholder="Enter your age"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            defaultValue={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            disabled
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Photo</label>
          <input
            type="text"
            placeholder="Photo URL"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            defaultValue={formData.profileImage}
            onChange={(e) =>
              setFormData({ ...formData, profileImage: e.target.value })
            }
            disabled
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Skills</label>
          <Select
            isMulti
            defaultValue={selectedSkills}
            className="w-full"
            onChange={(selected) =>
              setFormData({ ...formData, skills: selected.map((s) => s.value) })
            }
            isDisabled
          />
        </div>

        {/* Available Days */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Available Days in a Week
          </label>
          <Select
            isMulti
            defaultValue={selectedSlots}
            options={daysOptions}
            className="w-full"
            onChange={(selected) =>
              setFormData({
                ...formData,
                availableDays: selected.map((d) => d.value),
              })
            }
          />
        </div>
        {/* Classes */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Classes
          </label>
          <Select
            isMulti
            options={classesOptions}
            className="w-full"
            onChange={(selected) =>
              setFormData({
                ...formData,
                classes: selected.map((c) => c.value),
              })
            }
          />
        </div>

        {/* Slot Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Slot Name
          </label>
          <input
            type="text"
            placeholder="e.g., morning,afternoon,night..."
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.slotName}
            onChange={(e) =>
              setFormData({ ...formData, slotName: e.target.value })
            }
            required
          />
        </div>
        {/* Available Time */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Available Time in a Day (Include AM/PM)
          </label>
          <input
            type="text"
            placeholder="e.g., 9:00 AM - 5:00 PM"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            defaultValue={formData.availableTime}
            onChange={(e) =>
              setFormData({ ...formData, availableTime: e.target.value })
            }
            disabled
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-primary to-secondary py-3 rounded-md w-full text-white font-medium hover:bg-gradient-to-r hover:from-secondary hover:to-primary  border-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSlot;
