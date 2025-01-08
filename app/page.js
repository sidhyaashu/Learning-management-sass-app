import Header from "@/components/Header";
import Benefits from "@/components/Benefits";
import Hero from "@/components/Hero";
import Collaboration from "@/components/Collaboration";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Roadmap from "@/components/Roadmap";
import ButtonGradient from "@/public/assets/svg/ButtonGradient";
import Footer from "@/components/Footer";


const App = () => {
    return (
        <>
            <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
                <Header />
                <Hero />
                <Benefits />
                <Collaboration />
                <Services />
                <Pricing />
                <Roadmap />
                <Footer />
            </div>
            <ButtonGradient />
        </>
    );
};

export default App;
