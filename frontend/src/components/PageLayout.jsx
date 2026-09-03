import React from "react";
import Sidebar from "./Sidebar";

function PageLayout({ children }) {
  return (
    <div className="app-layout">
      <main className="main-content">
        <Sidebar />
        <div className="page-container fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}

export default PageLayout;
