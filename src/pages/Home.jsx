import Banner from "../components/Home/Banner";
import Feaatured from "../components/Home/Feaatured";
import Newsletter from "../components/Home/Newsletter";
import Trainers from "../components/Home/Trainers";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Trainers></Trainers>
      <Feaatured></Feaatured>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
