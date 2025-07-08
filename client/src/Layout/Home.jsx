import Navbar from "../components/Navbar";
import GuestNavbar from "../components/GuestNavbar";
import Hero from "../pages/home/Hero";
import WhyChooseUs from "../pages/home/WhyChooseUs";
import HowItWorks from "../pages/home/HowItWorks";
import Testimonials from "../pages/home/Testimonials";
import GetStarted from "../pages/home/GetStarted";
import Footer from "../pages/home/Footer";

export default function Home() {
  const token = localStorage.getItem("token");

  return (
    <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      {token ? <Navbar /> : <GuestNavbar />}
      <main className="pt-20">
        <Hero />
        <WhyChooseUs />
        <HowItWorks />
        <Testimonials />
        <GetStarted />
      </main>
      <Footer />
    </div>
  );
}
