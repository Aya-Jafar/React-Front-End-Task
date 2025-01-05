import Home from "../pages/Home";

export const generateTabContent = (activeTab) => {
  switch (activeTab) {
    case "subscribers":
      return <Home />;
      
    default:
      break;
  }
};
