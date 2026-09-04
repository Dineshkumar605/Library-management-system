import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

function PageLayout({ children }) {
  const isDesktop = useMediaQuery("(min-width: 993px)");

  return (
    <div className="app-layout">
      <main className="main-content">
        <Sidebar />
        <div
          className="page-container fade-in"
          style={{
            marginLeft: isDesktop ? 0 : 0,
            width: "100%",
            paddingTop: isDesktop ? undefined : "76px",
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}

export default PageLayout;
