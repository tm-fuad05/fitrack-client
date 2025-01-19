import About from "../components/Home/About";
import Banner from "../components/Home/Banner";
import Feaatured from "../components/Home/Feaatured";
import Newsletter from "../components/Home/Newsletter";
import Review from "../components/Home/Review";
import Trainers from "../components/Home/Trainers";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Trainers></Trainers>
      <About></About>
      <Feaatured></Feaatured>
      <Review></Review>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
