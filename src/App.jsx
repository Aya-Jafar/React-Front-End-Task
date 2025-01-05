import React, { useState, useEffect } from "react";
import { LayoutBuilder } from "./components/Layout/LayoutBuilder";

export default function App() {
  // Managing activeTab state in the App component
  const [activeTab, setActiveTab] = useState("subscribers");

  useEffect(() => {
    console.log(activeTab);
  }, [activeTab]);

  return (
    <LayoutBuilder activeTab={activeTab} setActiveTab={setActiveTab}>
      {/* No need to manually call generateTabContent here, it's handled in LayoutBuilder */}
    </LayoutBuilder>
  );
}
