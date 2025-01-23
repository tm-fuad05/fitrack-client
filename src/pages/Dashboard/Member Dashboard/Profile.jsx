import React from "react";
import useAuth from "../../../hooks/useAuth";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

import useUser from "../../../hooks/useUser";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Profile = () => {
  const [open, setOpen] = React.useState(false);
  const axiosPublic = useAxiosPublic();
  const handleOpen = () => setOpen(!open);

  const { user, updateUserProfile } = useAuth();
  const { users, refetch } = useUser();

  const currentUser = users.find((u) => u.email === user.email);
  console.log(currentUser);

  const handleUpdate = (e) => {
    handleOpen();
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const updateProfile = { name };
    updateUserProfile({ displayName: name, photoURL: photo })
      .then(() => {
        Swal.fire({
          title: "Profile updated",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        axiosPublic
          .patch(`/users/${currentUser._id}`, updateProfile)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
            }
          });
      })
      .catch(() => alert("something went wrong!"));
  };
  return (
    <div className="relative">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <div className="bg-gradient-to-t from-primary to-secondary min-h-[300px] rounded-xl"></div>
      <div className="rounded-xl  bg-white shadow-2xl w-9/12 relative p-5 pt-0 -translate-x-1/2 left-1/2 -top-24 z-10">
        <img
          className="rounded-full lg:h-32 lg:w-32 h-24 w-24 object-cover mx-auto absolute -translate-x-1/2 left-1/2 -top-12 lg:-top-16"
          src={user?.photoURL}
          alt=""
        />
        <div className="pt-16 lg:pt-24 text-center space-y-1">
          <h3 className=" font-bold text-xl md:text-2xl lg:text-3xl text-gray-800">
            {user?.displayName}
          </h3>
          <p className="text-gray-500 text-sm md:text-md lg:text-lg">
            {user?.email}
          </p>
          <p className="text-gray-500 text-sm md:text-md lg:text-lg">
            <span className="font-semibold text-gray-800">
              Last Login time: <br />
            </span>{" "}
            {user.metadata.lastSignInTime}{" "}
          </p>
          <div>
            <button
              onClick={handleOpen}
              className="bg-primary text-white px-4 py-2 rounded-full mt-5 hover:opacity-50"
            >
              Update
            </button>
            <Dialog open={open} handler={handleOpen}>
              <DialogHeader>Change your info</DialogHeader>
              <DialogBody>
                <form onSubmit={handleUpdate} className="space-y-3">
                  <Input
                    label="Name"
                    name="name"
                    defaultValue={user?.displayName}
                  />
                  <Input
                    label="Photo URL"
                    name="photo"
                    defaultValue={user?.photoURL}
                  />
                  <div className="text-right mt-2">
                    <button className="capitalize bg-gradient-to-r from-primary to-secondary text-white hover:bg-gradient-to-l hoverfrom-primary hover:to-secondary font-[400] px-3 py-2 rounded-md">
                      Update
                    </button>
                  </div>
                </form>
              </DialogBody>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
