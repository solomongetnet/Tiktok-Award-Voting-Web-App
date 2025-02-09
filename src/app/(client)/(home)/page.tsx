import { Button } from "@/components/ui/button";
import HeroSection from "./hero-section";
import SponsorsSection from "./sponsors-section";
import AboutSection from "./about-section";
import StatsSection from "./stats-section";
import CategoriesSection  from "./categories-section";

const HomePage = () => {
  return (
    <div className="relative">
      <HeroSection />
      <SponsorsSection />
      <AboutSection />
      <StatsSection />
      <CategoriesSection/>
    </div>
  );
};

export default HomePage;
