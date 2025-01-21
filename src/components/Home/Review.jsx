import React from "react";
import reviewbg from "../../assets/reviewbg.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

import { Autoplay, Navigation, FreeMode, Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaQuoteRight } from "react-icons/fa6";
import SectionTitle from "../Shared/SectionTitle";

const Review = () => {
  const axiosPublic = useAxiosPublic();

  const { data: reviews = [] } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/reviews");
      return data;
    },
  });

  return (
    <div
      className="min-h-screen bg-cover text-white flex flex-col gap-10 justify-center items-center"
      style={{ backgroundImage: `url(${reviewbg})` }}
    >
      <SectionTitle subtitle={"Testimonials"} title={"What our clients say"} />
      <Swiper
        slidesPerView={3}
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
        className="mySwiper w-10/12 mx-auto"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div
              key={review._id}
              className="border border-secondary bg-secondary bg-opacity-10 p-5 text-center flex flex-col gap-2 h-72 md:h-52 lg:h-64"
            >
              <FaQuoteRight className="text-4xl w-fit mx-auto text-secondary" />
              <h3 className="text-xl lg:text-2xl font-bold ">{review.name}</h3>
              <p className="text-sm  lg:text-md flex-grow">{review.review}</p>
              <div className="border-[1px] border-secondary mt-3 w-1/4 mx-auto"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Review;
