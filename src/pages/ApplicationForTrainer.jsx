import React, { useState } from "react";
import Select from "react-select";
import useAuth from "../hooks/useAuth";
// SweetAlert
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useTrainerCheck from "../hooks/useTrainerCheck";
import useAppliedTrainer from "../hooks/useAppliedTrainer";

const ApplicationForTrainer = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();
  const { isTrainer } = useTrainerCheck();
  const { appliedTrainers } = useAppliedTrainer();

  const currentUser = appliedTrainers.find((u) => u.email === user.email);

  const [formData, setFormData] = useState({
    fullName: user.displayName,
    email: user.email,
    age: "",
    profileImage: "",
    yearsOfExperience: "",
    skills: [],
    availableDays: [],
    availableTime: "",
  });

  const skillsOptions = [
    { value: "Leadership Development", label: "Leadership Development" },
    { value: "Academic Counseling", label: "Academic Counseling" },
    { value: "Soft Skills Training", label: "Soft Skills Training" },
    { value: "Web Development", label: "Web Development" },
    { value: "Programming Languages", label: "Programming Languages" },
    { value: "Startup Mentorship", label: "Startup Mentorship" },
    { value: "Public Speaking", label: "Public Speaking" },
    { value: "Communication Strategies", label: "Communication Strategies" },
    { value: "Media Training", label: "Media Training" },
    { value: "Weight Loss Coaching", label: "Weight Loss Coaching" },
    { value: "Nutrition Planning", label: "Nutrition Planning" },
    { value: "Bodybuilding", label: "Bodybuilding" },
    { value: "Strength Conditioning", label: "Strength Conditioning" },
    { value: "Pilates", label: "Pilates" },
    { value: "Core Strength", label: "Core Strength" },
    { value: "Posture Alignment", label: "Posture Alignment" },
    { value: "HIIT", label: "HIIT" },
    { value: "Fat Burn", label: "Fat Burn" },
    { value: "Endurance Building", label: "Endurance Building" },
    { value: "Rehabilitation Training", label: "Rehabilitation Training" },
    { value: "Mobility Enhancement", label: "Mobility Enhancement" },
    { value: "Injury Prevention", label: "Injury Prevention" },
  ];

  const daysOptions = [
    { value: "Sunday", label: "Sunday" },
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trainerInfo = formData;

    try {
      const { data } = await axiosSecure.post("/applied-as-trainer", {
        ...trainerInfo,
        status: "pending",
      });

      if (data.insertedId) {
        const form = e.target;
        form.reset();
        Swal.fire({
          title: "Successfully Applied",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate("/dashboard/activity-log");
        }, 1500);
      }
    } catch (error) {
      alert(`Failed to apply : ${error.message || error}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
      <Helmet>
        <title>FitRack | Become a trainer</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Apply to Be a Trainer
      </h1>
      {isAdmin || isTrainer ? (
        <p className="text-red-500 min-h-screen mt-10 text-center">
          You can't apply to become a trainer
        </p>
      ) : currentUser?.status === "pending" ? (
        <p className="text-red-500 min-h-screen mt-10 text-center">
          Your submission for trainer is pending...
        </p>
      ) : (
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
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
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
              className="w-full border rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
              value={formData.email}
              readOnly
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Age</label>
            <input
              type="number"
              placeholder="Enter your age"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
              required
            />
          </div>

          {/* Profile Image */}
          {/* <div>
          <label className="block text-gray-700 font-medium mb-2">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            name="profileImage"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none"
            onChange={(e) =>
              setFormData({ ...formData, profileImage: e.target.files[0] })
            }
          />
        </div> */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Photo
            </label>
            <input
              type="text"
              placeholder="Photo URL"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.profileImage}
              onChange={(e) =>
                setFormData({ ...formData, profileImage: e.target.value })
              }
              required
            />
          </div>
          {/* Years of exp */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Years of Experience
            </label>
            <input
              type="text"
              placeholder="Years"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.yearsOfExperience}
              onChange={(e) =>
                setFormData({ ...formData, yearsOfExperience: e.target.value })
              }
              required
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Skills
            </label>
            <Select
              isMulti
              options={skillsOptions}
              className="w-full"
              onChange={(selected) =>
                setFormData({
                  ...formData,
                  skills: selected.map((s) => s.value),
                })
              }
            />
          </div>

          {/* Available Days */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Available Days in a Week
            </label>
            <Select
              isMulti
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

          {/* Available Time */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Available Time in a Day (Include AM/PM)
            </label>
            <input
              type="text"
              placeholder="e.g., 9:00 AM - 5:00 PM"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.availableTime}
              onChange={(e) =>
                setFormData({ ...formData, availableTime: e.target.value })
              }
              required
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
      )}
    </div>
  );
};

export default ApplicationForTrainer;
