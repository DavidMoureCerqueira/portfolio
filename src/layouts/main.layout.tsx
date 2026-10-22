import { Navbar, Footer } from "./components";
import { Outlet } from "@tanstack/react-router";

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex flex-1 flex-col px-3 sm:px-6 lg:px-15">
        <div className="mx-auto w-full flex-1 bg-surface p-6 shadow-lg sm:p-10">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};
