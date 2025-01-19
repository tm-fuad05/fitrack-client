import newsletter from "../../assets/newsletter.png";
import Button from "../Shared/Button";
import SectionTitle from "../Shared/SectionTitle";

const Newsletter = () => {
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
      <form className="grid grid-cols-2 gap-3 w-10/12 mx-auto lg:w-7/12 mt-10">
        <input
          type="text"
          placeholder="Name"
          className="input  input-bordered w-full "
        />
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full "
        />
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full "
        />
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full "
        />
        <textarea
          type="text"
          placeholder="Name"
          className="textarea textarea-bordered w-full col-span-2"
          rows={5}
        />
        <Button text={"Send now"} textColor={"white"}></Button>
      </form>
    </div>
  );
};

export default Newsletter;
