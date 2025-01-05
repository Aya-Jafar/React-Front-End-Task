import React, { useState, useEffect } from "react";
import { LayoutBuilder } from "./components/Layout/LayoutBuilder";
import "./App.css";

export default function App() {
  // Managing activeTab state in the App component
  const [activeTab, setActiveTab] = useState("subscribers");

  useEffect(() => {
    console.log(activeTab);
  }, [activeTab]);

  return (
    <LayoutBuilder
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    ></LayoutBuilder>
  );
}
