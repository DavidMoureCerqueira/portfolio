import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Outlet } from "react-router";
export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar></Navbar>
      <main className="flex flex-1 flex-col px-3 sm:px-6 lg:px-10">
        <div className="mx-auto w-full flex-1 bg-surface p-6 shadow-lg sm:p-10">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
