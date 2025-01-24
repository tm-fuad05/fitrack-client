import { Helmet } from "react-helmet-async";
import About from "../components/Home/About";
import Banner from "../components/Home/Banner";
import Feaatured from "../components/Home/Feaatured";
import Newsletter from "../components/Home/Newsletter";
import Review from "../components/Home/Review";
import Trainers from "../components/Home/Trainers";
import RecentCommunity from "../components/Home/RecentCommunity";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>FitRack | Home </title>
      </Helmet>
      <Banner></Banner>
      <Trainers></Trainers>
      <About></About>
      <RecentCommunity></RecentCommunity>
      <Review></Review>
      <Feaatured></Feaatured>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
