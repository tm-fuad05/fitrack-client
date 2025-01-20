import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const AllClasses = () => {
  // Sample data for 12 classes
  const classes = [
    {
      id: 1,
      name: "Yoga",
      description:
        "Beginner friendly yoga sessions focusing on flexibility and mindfulness",
      trainers: [
        { id: 1, name: "Sarah Smith", image: "/api/placeholder/150/150" },
        { id: 2, name: "Michael Chen", image: "/api/placeholder/150/150" },
      ],
    },
    {
      id: 2,
      name: "Pilates",
      description:
        "Core strengthening and posture improvement through controlled movements",
      trainers: [
        { id: 3, name: "Emma Davis", image: "/api/placeholder/150/150" },
        { id: 4, name: "John Wilson", image: "/api/placeholder/150/150" },
      ],
    },
    {
      id: 3,
      name: "HIIT Training",
      description: "High-intensity interval training for maximum calorie burn",
      trainers: [
        { id: 5, name: "Alex Johnson", image: "/api/placeholder/150/150" },
      ],
    },
    {
      id: 4,
      name: "Zumba",
      description:
        "Dance fitness program featuring Latin and international music",
      trainers: [
        { id: 6, name: "Maria Garcia", image: "/api/placeholder/150/150" },
        { id: 7, name: "Carlos Rodriguez", image: "/api/placeholder/150/150" },
      ],
    },
    {
      id: 5,
      name: "Strength Training",
      description: "Build muscle and increase strength with weighted exercises",
      trainers: [
        { id: 8, name: "David Brown", image: "/api/placeholder/150/150" },
        { id: 9, name: "Lisa Wang", image: "/api/placeholder/150/150" },
      ],
    },
    {
      id: 6,
      name: "Spinning",
      description: "Indoor cycling workouts for cardio and leg strength",
      trainers: [
        { id: 10, name: "Chris Thompson", image: "/api/placeholder/150/150" },
      ],
    },
    {
      id: 7,
      name: "Boxing",
      description: "Learn boxing techniques while getting a full-body workout",
      trainers: [
        { id: 11, name: "Mike Taylor", image: "/api/placeholder/150/150" },
        { id: 12, name: "Sam Lee", image: "/api/placeholder/150/150" },
      ],
    },
    {
      id: 8,
      name: "Meditation",
      description:
        "Guided meditation sessions for mental wellness and stress relief",
      trainers: [
        { id: 13, name: "Rachel Green", image: "/api/placeholder/150/150" },
      ],
    },
    {
      id: 9,
      name: "CrossFit",
      description: "High-intensity functional movements for overall fitness",
      trainers: [
        { id: 14, name: "Tom Wilson", image: "/api/placeholder/150/150" },
        { id: 15, name: "Kate Miller", image: "/api/placeholder/150/150" },
      ],
    },
    {
      id: 10,
      name: "Swimming",
      description: "Swimming lessons and water-based workouts for all levels",
      trainers: [
        { id: 16, name: "Andrew Clark", image: "/api/placeholder/150/150" },
      ],
    },
    {
      id: 11,
      name: "Dance",
      description: "Various dance styles from ballet to contemporary",
      trainers: [
        { id: 17, name: "Sofia Martinez", image: "/api/placeholder/150/150" },
        { id: 18, name: "James Wilson", image: "/api/placeholder/150/150" },
      ],
    },
    {
      id: 12,
      name: "Kickboxing",
      description: "Combine martial arts techniques with fast-paced cardio",
      trainers: [
        { id: 19, name: "Ryan Kim", image: "/api/placeholder/150/150" },
        { id: 20, name: "Nina Patel", image: "/api/placeholder/150/150" },
      ],
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  // Calculate page count
  const pageCount = Math.ceil(classes.length / itemsPerPage);

  // Get current page items
  const offset = currentPage * itemsPerPage;
  const currentClasses = classes.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    // Scroll to top when page changes
    window.scrollTo(0, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">All Classes</h1>
        <p className="text-gray-600">
          Explore our comprehensive selection of classes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentClasses.map((classItem) => (
          <div
            key={classItem.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {classItem.name}
              </h2>
              <p className="text-gray-600 text-sm">{classItem.description}</p>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span>Trainers ({classItem.trainers.length})</span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {classItem.trainers.slice(0, 5).map((trainer) => (
                    <div
                      key={trainer.id}
                      className="group cursor-pointer"
                      onClick={() =>
                        (window.location.href = `/trainer/${trainer.id}`)
                      }
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white group-hover:border-blue-500 transition-colors">
                        <img
                          src={trainer.image}
                          alt={trainer.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs text-center mt-1 text-gray-600 group-hover:text-blue-500">
                        {trainer.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ReactPaginate
        previousLabel={
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        }
        nextLabel={
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        }
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName="flex items-center justify-center gap-2 mt-8"
        pageClassName="rounded-md"
        pageLinkClassName="px-4 py-2 rounded-md border hover:bg-gray-50 block"
        activeClassName="bg-blue-500 text-white border-blue-500"
        activeLinkClassName="hover:bg-blue-500 text-white"
        previousClassName="rounded-md border p-2 hover:bg-gray-50"
        nextClassName="rounded-md border p-2 hover:bg-gray-50"
        disabledClassName="opacity-50 cursor-not-allowed hover:bg-white"
        breakClassName="px-4 py-2"
      />
    </div>
  );
};
export default AllClasses;
