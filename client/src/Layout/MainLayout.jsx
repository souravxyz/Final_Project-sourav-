import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-8">
        {" "}
        {/* Added padding-top to account for fixed navbar */}
        <Outlet />
      </main>
    </div>
  );
}
