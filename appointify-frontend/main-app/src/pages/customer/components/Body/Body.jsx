import React from "react";
import HeroSection from "./HeroSection";
import CategoriesCardSection from "./CategoriesCardSection";
import Review from "./Review";
import TopHospitals from "./TopHospitals";
import HowItWorks from "./HowItWorks";

const Body = () => {
  return (
    <div className="bg-[#FFD3D5]">
      <HeroSection />
      <CategoriesCardSection />
      {/* <TopHospitals /> */}
      <HowItWorks />
      <Review />
    </div>
  );
};

export default Body;
