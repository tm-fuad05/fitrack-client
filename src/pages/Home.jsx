import { Helmet } from "react-helmet-async";
import About from "../components/Home/About";
import Banner from "../components/Home/Banner";
import Feaatured from "../components/Home/Feaatured";
import Newsletter from "../components/Home/Newsletter";

import Trainers from "../components/Home/Trainers";
import RecentCommunity from "../components/Home/RecentCommunity";
import Review from "../components/Home/Review";

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
      <div id="newsletter">
        <Newsletter></Newsletter>
      </div>
    </div>
  );
};

export default Home;
