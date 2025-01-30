import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";
import { Helmet } from "react-helmet-async";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import useTrainerCheck from "../../../hooks/useTrainerCheck";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AddForum = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { isAdmin } = useAdmin();

  const axiosSecure = useAxiosSecure();

  const date = new Date();
  const [formData, setFormData] = useState({
    title: "",
    author: user?.displayName,
    date: moment(date).format("MMM DD YYYY"),
    category: "",
    role: `${isAdmin ? "admin" : "trainer"}`,
    description: "",
    votes: 0,
  });

  const handlePost = async (e) => {
    e.preventDefault();
    const forumInfo = formData;
    try {
      const { data } = await axiosSecure.post("/community", forumInfo);
      if (data.insertedId) {
        Swal.fire({
          title: "Successfully Added",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate("/community");
        }, 1500);
      }
    } catch (error) {
      alert("Failed to post", error);
    }
  };

  return (
    <div className="w-11/12 mx-auto bg-white rounded-lg lg:p-8">
      <Helmet>
        <title>FitRack | Add Forum</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Post a Forum
      </h1>
      <form onSubmit={handlePost} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            placeholder="Forum title"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <input
            type="text"
            placeholder="Forum Category"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            required
          />
        </div>
        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            type="textarea"
            placeholder="Forum Description"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={6}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-primary to-secondary py-3 rounded-md w-full text-white font-medium hover:bg-gradient-to-r hover:from-secondary hover:to-primary  border-none"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForum;
