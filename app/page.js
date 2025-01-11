import LandingDashBoard from "@/components/LandingDashBoard";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import DeveloperCarousel from "@/components/DeveloperCarousel";
import Footer from "@/components/Footer";

const App = () => {
    return (
        <div>
            <LandingDashBoard/>
            <HeroSection/>
            <FeaturesSection/>
            <DeveloperCarousel/>
            <Footer/>
        </div>
    );
};

export default App;
