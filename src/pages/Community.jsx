import React from "react";
import SectionTitle from "../components/Shared/SectionTitle";
import CommunityCards from "../components/Community/CommunityCards";
import { Helmet } from "react-helmet-async";

const Community = () => {
  return (
    <div className="my-10 w-10/12 mx-auto">
      <Helmet>
        <title>FitRack | Community</title>
      </Helmet>
      <SectionTitle
        subtitle={"our community"}
        title={"explore community insights"}
      ></SectionTitle>
      <CommunityCards></CommunityCards>
    </div>
  );
};

export default Community;
