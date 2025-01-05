import React from "react";
import { Nav } from "../common/Nav";

/**
 * LayoutBuilder is a reusable layout container that can structure the page.
 * It can include the header (Nav), main content, and other sections.
 *
 * @param {React.ReactNode} children - The content to render inside the layout.
 */
export const LayoutBuilder = ({ children }) => {
  return (
    <div>
      <Nav /> {/* Navigation bar */}
      <main>
        {children} {/* Main content goes here */}
      </main>
    </div>
  );
};
