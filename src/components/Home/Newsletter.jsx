import newsletter from "../../assets/newsletter.png";
import Button from "../Shared/Button";
import SectionTitle from "../Shared/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
// SweetAlert
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const Newsletter = () => {
  const axiosPublic = useAxiosPublic();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const subject = form.subject.value;
    const message = form.message.value;
    const newsLetterInfo = {
      name,
      phone,
      email,
      subject,
      message,
    };

    axiosPublic.post("/newsletter", newsLetterInfo).then((res) => {
      if (res.data.insertedId) {
        form.reset();
        Swal.fire({
          title: "Message Sent",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div
      className=" bg-cover py-16"
      style={{ backgroundImage: `url(${newsletter})` }}
    >
      <SectionTitle
        subtitle={"contact us"}
        title={"join our team"}
        color={"white"}
      />
      <form
        onSubmit={handleSubmit}
        className="font-poppins grid grid-cols-1 md:grid-cols-2 gap-3 w-10/12 mx-auto lg:w-7/12 mt-10"
      >
        <input
          type="text"
          placeholder="Name"
          name="name"
          className=" rounded-md pl-4 py-3 focus:outline-none w-full "
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="rounded-md pl-4 py-3 focus:outline-none w-full "
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="rounded-md pl-4 py-3 focus:outline-none w-full "
          required
        />
        <input
          type="text"
          placeholder="Subject"
          name="subject"
          className="rounded-md pl-4 py-3 focus:outline-none w-full "
          required
        />
        <textarea
          type="text"
          name="message"
          placeholder="Send a message"
          className="rounded-md pl-4 pt-2 focus:outline-none w-full md:col-span-2"
          rows={6}
          required
        />
        <Button text={"subscribe now"} textColor={"white"}></Button>
      </form>
    </div>
  );
};

export default Newsletter;
