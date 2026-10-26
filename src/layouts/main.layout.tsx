import { Navbar, Footer } from "./components";
import { Outlet } from "@tanstack/react-router";

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text">
      <Navbar />
      <main className="flex flex-1 flex-col px-6 py-12 md:py-20">
        <div className="mx-auto w-full max-w-[1200px] flex-1 rounded-lg border border-line bg-surface p-6 sm:p-10">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};
