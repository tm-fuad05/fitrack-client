import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa6";
import Swal from "sweetalert2";
import Loader from "../../../components/Shared/Loader";
import {
  FiGrid,
  FiUser,
  FiCalendar,
  FiDollarSign,
  FiStar,
  FiMessageSquare,
  FiX,
  FiCheckCircle,
} from "react-icons/fi";

const BookedTrainer = () => {
  const [open, setOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [ratingValue, setRatingValue] = useState(5); // Default high-tier state

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleOpen = (trainerData = null) => {
    setSelectedTrainer(trainerData);
    setRatingValue(5); // Reset parameter
    setOpen(!open);
  };

  const { data: payments = [], isLoading } = useQuery({
    queryKey: [user?.email, "payments"],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get(
          `/payments/user?email=${user?.email}`,
        );
        return data;
      } catch (error) {
        console.error("Failed to load pipeline datasets", error);
        return [];
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedback = e.target.feedback.value;

    const review = {
      name: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
      trainerEmail: selectedTrainer?.trainerEmail || "", // Mapping context identifier
      trainerName: selectedTrainer?.trainer || "",
      review: feedback,
      rating: ratingValue,
      timestamp: new Date().toISOString(),
    };

    try {
      const { data } = await axiosSecure.post("/reviews", review);

      if (data.success) {
        setOpen(false);
        Swal.fire({
          title: "Feedback Ledger Broadcasted",
          text: "Thank you! Your assessment footprint has been re-indexed.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Failed to post payload structural asset", error);
      Swal.fire("Error", "Transmission sequence broken.", "error");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-6 antialiased pb-12">
      <Helmet>
        <title>FitRack | Booked Node</title>
      </Helmet>

      {/* Luxury Sci-Fi Section Header Layout */}
      <div className="p-6 rounded-2xl bg-white dark:bg-transparent border border-gray-300/60 dark:border-white/10 backdrop-blur-md shadow-sm relative overflow-hidden">
        <div className="absolute top-[-30%] right-[-10%] w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-black tracking-tight text-surface-dark dark:text-white uppercase flex items-center gap-2">
              <FiGrid className="text-primary animate-pulse" /> Verified Booked
              Subscriptions
            </h1>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-600 mt-0.5">
              Review current authorization structures, transaction values, and
              broadcast node reviews.
            </p>
          </div>
          {payments?.length > 0 && (
            <span className="px-3 py-1 w-fit text-[10px] font-black bg-primary/10 border border-primary/25 text-primary rounded-md tracking-wider uppercase">
              Active Clusters: {payments.length}
            </span>
          )}
        </div>
      </div>

      {/* Grid Iteration Flow Framework */}
      {payments.length === 0 ? (
        <div className="py-20 text-center rounded-2xl border-2 border-dashed border-gray-300 dark:border-white/10 bg-white dark:bg-transparent">
          <p className="text-sm font-bold text-gray-500 dark:text-gray-600 tracking-wide uppercase">
            Void Node: No Trainer Subscriptions Reserved
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {payments.map((p, idx) => (
            <div
              key={p._id || idx}
              className="group bg-white dark:bg-transparent rounded-[1.5rem] border border-gray-300/60 dark:border-white/5 p-6 flex flex-col justify-between shadow-sm hover:border-primary/20 transition-all duration-300 relative overflow-hidden"
            >
              {/* Card Geometric Lighting Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full pointer-events-none group-hover:from-primary/10 transition-all" />

              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary block mb-1">
                  {p.membershipType || "Standard Pack"}
                </span>

                <h2 className="text-xl font-black text-surface-dark dark:text-white uppercase tracking-tight truncate flex items-center gap-1.5">
                  <FiUser className="text-primary text-base flex-shrink-0" />{" "}
                  {p.trainer}
                </h2>

                <div className="h-[1px] w-full bg-gray-200 dark:bg-white/5 my-4" />

                {/* Metrics Stack */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-gray-600 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                      <FiDollarSign /> Resource Value
                    </span>
                    <span className="text-base font-black text-primary">
                      ${p.price}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-gray-600 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                      <FiCalendar /> Re-index Date
                    </span>
                    <span className="text-slate-800 dark:text-gray-300 font-mono text-[11px]">
                      {p.date || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Vector Broadcast Trigger */}
              <button
                onClick={() => handleOpen(p)}
                className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-slate-50 dark:bg-white/5 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary border border-gray-300 dark:border-white/10 group-hover:border-transparent text-surface-dark dark:text-gray-300 group-hover:text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-sm transition-all duration-300 cursor-pointer"
              >
                <FiMessageSquare /> Transmit Feedback
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Globalized Unified Scope Dialog Structure */}
      <Dialog
        open={open}
        handler={() => handleOpen()}
        className="bg-white dark:bg-[#12131a] border border-gray-300 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden focus:outline-none"
        size="sm"
      >
        <DialogHeader className="flex items-center justify-between border-b border-gray-200 dark:border-white/5 p-4 text-surface-dark dark:text-white font-black text-base uppercase tracking-tight">
          <span className="flex items-center gap-2">
            <FiMessageSquare className="text-primary" /> Review Node:{" "}
            <span className="text-secondary tracking-normal">
              {selectedTrainer?.trainer}
            </span>
          </span>
          <button
            onClick={() => handleOpen()}
            className="p-1 text-gray-600 hover:text-red-500 transition-colors cursor-pointer"
          >
            <FiX className="text-xl" />
          </button>
        </DialogHeader>

        <DialogBody className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Feedback Content Payload */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-600 flex items-center gap-1.5">
                Feedback Narrative
              </label>
              <textarea
                name="feedback"
                placeholder="Document your pipeline performance assessment details here..."
                className="w-full min-h-[100px] bg-slate-50 dark:bg-transparent text-surface-dark dark:text-white border border-gray-300 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm font-medium transition-all outline-none resize-none"
                required
              />
            </div>

            {/* Premium Interactive Star Matrix Widget */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-center space-y-2">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-500 flex items-center justify-center gap-1.5">
                <FiStar className="text-primary" /> Matrix Index Assessment
              </h3>

              <div className="pt-1 flex justify-center">
                <Rating
                  onChange={setRatingValue}
                  initialRating={ratingValue}
                  emptySymbol={
                    <FaRegStar className="text-2xl text-gray-300 dark:text-white/20 mx-1 hover:scale-110 transition-transform" />
                  }
                  fullSymbol={
                    <FaStar className="text-2xl text-primary mx-1 hover:scale-110 transition-transform drop-shadow-[0_0_6px_rgba(255,82,0,0.4)]" />
                  }
                  max={5}
                />
              </div>
            </div>

            {/* Control Handshake Pipeline Actions */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-200 dark:border-white/5">
              <button
                type="button"
                onClick={() => handleOpen()}
                className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-white/10 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-600 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer"
              >
                Abort
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-primary to-secondary hover:opacity-95 transition-all cursor-pointer shadow-lg shadow-primary/10 flex items-center gap-1.5"
              >
                <FiCheckCircle /> Broadcast Review
              </button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default BookedTrainer;
