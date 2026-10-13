import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import HomePage from "./../../features/home/pages/HomePage";
export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar></Navbar>
      <main className="flex-1">
        <HomePage />
      </main>
      <Footer />
    </div>
  );
}
