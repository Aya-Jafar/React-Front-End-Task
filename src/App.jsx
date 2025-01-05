import React, { useState, useEffect } from "react";
import { LayoutBuilder } from "./Layout/LayoutBuilder";
import "./App.css";

export const App = () => {
  const [activeTab, setActiveTab] = useState("subscribers");

  return (
    <LayoutBuilder
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    ></LayoutBuilder>
  );
};

export default App;
