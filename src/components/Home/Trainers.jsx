import React from "react";
import SectionTitle from "../Shared/SectionTitle";

const Trainers = () => {
  const trainers = [
    {
      name: "Dr. Ayesha Rahman",
      bio: "Dr. Ayesha Rahman is a seasoned educator with over 15 years of experience in academic counseling and leadership training. She has worked with various educational institutions to design effective learning modules and mentoring systems.",
      expertise: [
        "Leadership Development",
        "Academic Counseling",
        "Soft Skills Training",
      ],
      photo:
        "https://media.istockphoto.com/id/856797530/photo/portrait-of-a-beautiful-woman-at-the-gym.jpg?s=612x612&w=0&k=20&c=0wMa1MYxt6HHamjd66d5__XGAKbJFDFQyu9LCloRsYU=",
    },
    {
      name: "Mr. Tariq Hasan",
      bio: "Tariq Hasan is a tech entrepreneur and software engineer who has spent a decade mentoring students in programming, web development, and tech startups. He regularly speaks at international tech conferences.",
      expertise: [
        "Web Development",
        "Programming Languages",
        "Startup Mentorship",
      ],
      photo:
        "https://media.istockphoto.com/id/1324042769/photo/confident-gym-owner.jpg?s=612x612&w=0&k=20&c=2ARveP6nctKY2V1180dCOXS7yJrZjRg-TTIDkazond8=",
    },
    {
      name: "Ms. Nazia Hossain",
      bio: "Nazia Hossain is a public speaking coach and communication expert with a strong background in media and public relations. She has helped over 500 individuals build confidence and improve their public speaking skills.",
      expertise: [
        "Public Speaking",
        "Communication Strategies",
        "Media Training",
      ],
      photo:
        "https://t3.ftcdn.net/jpg/07/32/65/04/360_F_732650497_jXQjmlrrB6qT3nZrexd0WrnmeKejmxSc.jpg",
    },
  ];

  return (
    <div>
      <SectionTitle title={"TEAM OF EXPERT COACHES"} subtitle={"our team"} />
      <div className="bg-gradient-to-b from-primary to-secondary  py-16 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 w-10/12 mx-auto">
          {trainers.map((trainer, idx) => (
            <div
              key={idx}
              className="text-white space-y-3 flex flex-col justify-center items-center group"
            >
              <img
                className="w-[250px] h-[250px] rounded-full object-cover group-hover:scale-105 group-hover:opacity-70 duration-300"
                src={trainer.photo}
                alt=""
              />
              <h4 className="text-2xl lg:text-3xl font-bold">{trainer.name}</h4>
              <p className="text-sm lg:text-md text-center">{trainer.bio}</p>
              <p className="font-bold">Expertise in:</p>
              <ul className="text-sm lg:text-md list-disc">
                {trainer.expertise.map((point) => (
                  <li>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trainers;
