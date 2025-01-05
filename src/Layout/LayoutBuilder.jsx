import React from "react";
import { Nav } from "../components/common/Nav";
import { SideBar } from "../components/common/SideBar";

// Lazy load components
const Home = React.lazy(() => import("../pages/Home"));

/**
 * LayoutBuilder is a reusable layout container that can structure the page.
 *
 * @param {React.ReactNode} children - The content to render inside the layout.
 * @param {string} activeTab - The currently active tab.
 * @param {function} setActiveTab - Function to change the active tab.
 */
export const LayoutBuilder = ({ children, activeTab, setActiveTab }) => {
  
  const generateTabContent = (activeTab) => {
    switch (activeTab) {
      case "subscribers":
        return <Home />;
      default:
        return <h1>Default Page</h1>;
    }
  };

  return (
    <div>
      <Nav />
      <div className="flex">
        {/* Layout structure: main content and sidebar */}
        <main className="flex-grow p-4">
          {/* Dynamic content based on activeTab or based on the passed children if avaliable */}
          {!children ? generateTabContent(activeTab) : children}
        </main>
        <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};
