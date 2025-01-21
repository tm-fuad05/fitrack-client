import React from "react";
import useUser from "../../../hooks/useUser";
import { MdGroups2 } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
// SweetAlert
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const ManageUsers = () => {
  const { users, refetch } = useUser();

  const axiosPublic = useAxiosPublic();

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete ",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted User!",
              text: `${user.name} has been deleted.`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleRole = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Would you want to make ${user.name} Admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Make Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.patch(`/users/make-admin/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: `${user.name} is now Admin!`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <div>
        {/* Simple Header */}
        <h1 className="text-2xl font-bold mb-4">All Users</h1>

        {/* Total Count */}
        <div className="mb-4">
          <p className="text-gray-600">Total users: {users?.length}</p>
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
                users.map((user) => (
                  <tr key={user._id} className="border hover:bg-gray-50">
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td
                      className={`p-3 font-semibold ${
                        user.role === "admin"
                          ? "text-green-500"
                          : user.role === "trainer"
                          ? "text-red-500"
                          : "text-black"
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
