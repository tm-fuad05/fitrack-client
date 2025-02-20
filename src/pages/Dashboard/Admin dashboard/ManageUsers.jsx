import React from "react";
import useUser from "../../../hooks/useUser";
import { MdGroups2 } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
// SweetAlert
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Back from "../../../components/Shared/Back";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Loader from "../../../components/Shared/Loader";

const ManageUsers = () => {
  const { users, refetch, isLoading } = useUser();

  const axiosSecure = useAxiosSecure();

  const handleDelete = async (user) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete ",
    });

    if (!result.isConfirmed) return;
    try {
      const { data } = await axiosSecure.delete(`/users/${user._id}`);
      if (data.success) {
        refetch();
        Swal.fire({
          title: "Deleted User!",
          text: `${user.name} has been deleted.`,
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const handleRole = async (user) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Would you want to make ${user.name} Admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Make Admin",
    });
    if (!result.isConfirmed) return;
    try {
      const { data } = await axiosSecure.patch(`/users/make-admin/${user._id}`);

      if (data.success) {
        refetch();
        Swal.fire({
          title: `${user.name} is now Admin!`,
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Failed to promote", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Helmet>
        <title>FitRack | Manage users</title>
      </Helmet>
      <Back></Back>
      <div>
        {/* Simple Header */}
        <h1 className="text-2xl font-bold mb-4 dark:text-white">All Users</h1>

        {/* Total Count */}
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-500">
            Total users: {users?.length}
          </p>
        </div>

        {/* Simple Table */}
        <div className="overflow-x-auto  ">
          <table className="w-full bg-white border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Action</th>
                <th className="p-3 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users?.map((user) => (
                  <tr
                    key={user._id}
                    className="border dark:border-gray-900 dark:bg-gray-900 dark:text-white even:bg-gray-50 dark:even:bg-gray-900/90"
                  >
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td
                      className={`p-3 font-semibold ${
                        user.role === "admin"
                          ? "text-green-500"
                          : user.role === "trainer"
                          ? "text-red-500"
                          : "text-black dark:text-white"
                      }`}
                    >
                      {user.role}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleRole(user)}
                        className="text-xl p-2 bg-green-600 text-white rounded-md hover:bg-opacity-50"
                      >
                        {" "}
                        <MdGroups2 />{" "}
                      </button>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(user)}
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

export default ManageUsers;
