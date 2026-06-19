import React from "react";
import reviewbg from "../../assets/reviewbg.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

import { Autoplay, Navigation, FreeMode, Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaQuoteRight, FaRegStar, FaStar } from "react-icons/fa6";
import SectionTitle from "../Shared/SectionTitle";
import Rating from "react-rating";
import { motion } from "framer-motion";

const Review = () => {
  const axiosPublic = useAxiosPublic();

  const { data: reviews = [] } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      try {
        const { data } = await axiosPublic.get("/reviews");
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-white flex flex-col gap-10 justify-center items-center py-16 overflow-hidden"
      style={{ backgroundImage: `url(${reviewbg})` }}
    >
      {/* Background layer overlay for a rich premium depth */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col gap-10 items-center">
        <SectionTitle
          subtitle={"Testimonials"}
          title={"What our clients say"}
          color="white"
        />

        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          freeMode={true}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          modules={[Navigation, FreeMode, Pagination, Autoplay]}
          className="mySwiper w-11/12 xl:w-10/12 mx-auto"
        >
          {reviews?.map((review) => (
            <SwiperSlide key={review._id} className="py-4">
              {/* Review Card with your layout, adding smooth transitions and hover lift */}
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="border border-secondary bg-secondary bg-opacity-[8%] p-6 text-center flex flex-col items-center justify-center gap-3 h-80 md:h-72 rounded-xl backdrop-blur-sm relative group overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-[0_0_25px_rgba(var(--primary-rgb),0.2)]"
              >
                {/* Decorative background glow shifter on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Animated Quote Icon */}
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="w-fit mx-auto"
                >
                  <FaQuoteRight className="text-4xl text-secondary group-hover:text-primary transition-colors duration-300" />
                </motion.div>

                {/* Client Name */}
                <h3 className="text-xl lg:text-2xl font-bold font-oxanium tracking-wide">
                  {review.name}
                </h3>

                {/* Animated Rating Container */}
                <motion.div
                  className="w-fit mx-auto"
                  whileHover={{ scale: 1.05 }}
                >
                  <Rating
                    initialRating={review.rating}
                    emptySymbol={
                      <FaRegStar className="text-xl text-secondary group-hover:text-primary transition-colors duration-300" />
                    }
                    fullSymbol={
                      <FaStar className="text-xl text-secondary group-hover:text-primary transition-colors duration-300" />
                    }
                    readonly
                  />
                </motion.div>

                {/* Client Review Message */}
                <p className="text-sm lg:text-base text-gray-300 group-hover:text-white line-clamp-4 font-poppins font-light transition-colors duration-300 leading-relaxed">
                  {review.review}
                </p>

                {/* Your Divider with clean gradient animation */}
                <div className="border-[1px] border-secondary mt-2 w-1/4 mx-auto group-hover:w-1/2 group-hover:border-primary transition-all duration-500"></div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Review;
