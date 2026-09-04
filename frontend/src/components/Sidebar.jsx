import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiHome,
  HiUsers,
  HiBookOpen,
  HiStar,
  HiPlus,
  HiTrash,
  HiPencil,
  HiSearch,
  HiMenu,
  HiX,
} from "react-icons/hi";
import "bootstrap/dist/css/bootstrap.min.css";

const navSections = [
  {
    label: "Home",
    items: [{ to: "/", icon: <HiHome size={20} />, text: "Dashboard" }],
  },
  {
    label: "Users",
    items: [
      { to: "/adduser", icon: <HiPlus size={20} />, text: "Add User" },
      { to: "/allusers", icon: <HiUsers size={20} />, text: "All Users" },
      { to: "/fetchusers", icon: <HiSearch size={20} />, text: "Fetch User" },
      { to: "/updateName", icon: <HiPencil size={20} />, text: "Update Name" },
      { to: "/deleteUser", icon: <HiTrash size={20} />, text: "Delete User" },
    ],
  },
  {
    label: "Books",
    items: [
      { to: "/addauthor", icon: <HiPlus size={20} />, text: "Add Author" },
      { to: "/addbook", icon: <HiBookOpen size={20} />, text: "Add Book" },
      { to: "/allbooks", icon: <HiBookOpen size={20} />, text: "All Books" },
    ],
  },
  {
    label: "Reviews",
    items: [
      { to: "/allreviews", icon: <HiStar size={20} />, text: "All Reviews" },
      { to: "/addreview", icon: <HiPlus size={20} />, text: "Add Review" },
      { to: "/bookDetails", icon: <HiSearch size={20} />, text: "Book Reviews" },
    ],
  },
  {
    label: "Manage",
    items: [
      { to: "/deleteBook", icon: <HiTrash size={20} />, text: "Delete Book" },
    ],
  },
];

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

function Sidebar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 993px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 992px)");

  const isActive = (path) => location.pathname === path;

  const closeSidebar = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    closeSidebar();
  }, [location.pathname, closeSidebar]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const sidebarStyle = {
    position: isDesktop ? "sticky" : "fixed",
    top: 0,
    width: isDesktop ? 260 : isTablet ? 72 : 280,
    height: "100vh",
    backgroundColor: "var(--sidebar-bg)",
    borderRight: "1px solid var(--sidebar-border)",
    overflowY: "auto",
    overflowX: "hidden",
    zIndex: 100,
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    transition: "transform var(--transition-slow), width var(--transition-normal)",
    transform: isDesktop ? "translateX(0)" : mobileOpen ? "translateX(0)" : "translateX(-100%)",
  };

  const brandStyle = {
    padding: isTablet ? "20px 12px" : "20px 24px",
    borderBottom: "1px solid var(--border-color)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    minHeight: "73px",
  };

  const brandLeftStyle = {
    display: "flex",
    alignItems: "center",
    gap: isTablet ? 0 : "12px",
    minWidth: 0,
  };

  const logoStyle = {
    width: "36px",
    height: "36px",
    backgroundColor: "var(--primary)",
    borderRadius: "var(--border-radius)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "700",
    fontSize: "1rem",
    flexShrink: 0,
  };

  const sectionLabelStyle = {
    padding: isTablet ? "12px 0 6px" : "16px 24px 8px",
    fontSize: isTablet ? "0.65rem" : "0.75rem",
    fontWeight: "600",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    textAlign: isTablet ? "center" : "left",
  };

  const linkStyle = (path) => ({
    display: "flex",
    alignItems: "center",
    gap: isTablet ? 0 : "12px",
    padding: isTablet ? "10px 0" : "10px 24px",
    justifyContent: isTablet ? "center" : "flex-start",
    color: isActive(path) ? "var(--primary)" : "var(--text-secondary)",
    backgroundColor: isActive(path) ? "var(--sidebar-active)" : "transparent",
    textDecoration: "none",
    fontSize: isTablet ? "0" : "0.875rem",
    fontWeight: isActive(path) ? "600" : "500",
    borderRight: isActive(path) && !isTablet ? "3px solid var(--primary)" : isTablet && isActive(path) ? "none" : "3px solid transparent",
    borderBottom: isTablet && isActive(path) ? "3px solid var(--primary)" : "none",
    transition: "all var(--transition-fast)",
    position: "relative",
    borderRadius: isTablet ? "0" : "0",
    whiteSpace: "nowrap",
    overflow: "hidden",
  });

  const tooltipStyle = {
    position: "absolute",
    left: "100%",
    top: "50%",
    transform: "translateY(-50%)",
    marginLeft: "8px",
    backgroundColor: "var(--text-primary)",
    color: "#fff",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "0.75rem",
    whiteSpace: "nowrap",
    pointerEvents: "none",
    opacity: 0,
    transition: "opacity var(--transition-fast)",
    zIndex: 200,
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 99,
    display: mobileOpen ? "block" : "none",
  };

  return (
    <>
      {/* Mobile/Tablet top bar */}
      {!isDesktop && (
        <div
          className="mobile-topbar"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "60px",
            backgroundColor: "var(--bg-card)",
            borderBottom: "1px solid var(--border-color)",
            boxShadow: "var(--shadow-sm)",
            zIndex: 90,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px",
                flexShrink: 0,
              }}
            >
              <HiMenu size={26} color="var(--text-primary)" />
            </button>
            <div style={logoStyle}>L</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: "700", fontSize: "1rem", color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                LMS
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Library Management
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay */}
      <div style={overlayStyle} onClick={closeSidebar} />

      {/* Sidebar */}
      <aside
        style={sidebarStyle}
        className="sidebar-component flex-column"
      >
        {/* Brand */}
        <div style={brandStyle} className="sidebar-brand">
          <div style={brandLeftStyle} className="sidebar-brand-left">
            <div style={logoStyle}>L</div>
            {!isTablet && (
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: "700", fontSize: "1rem", color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  LMS
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Library Management
                </div>
              </div>
            )}
          </div>
          {!isDesktop && (
            <button
              onClick={closeSidebar}
              aria-label="Close navigation"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                padding: "4px",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <HiX size={20} color="var(--text-secondary)" />
            </button>
          )}
        </div>

        {/* Nav sections */}
        <nav style={{ flex: 1, padding: isTablet ? "8px 0" : "8px 0" }}>
          {navSections.map((section) => (
            <div key={section.label}>
              {!isTablet && (
                <div style={sectionLabelStyle} className="sidebar-section-label">
                  {section.label}
                </div>
              )}
              {isTablet && (
                <div style={{ ...sectionLabelStyle, fontSize: "0.6rem", padding: "8px 0 2px" }}>
                  {section.label}
                </div>
              )}
              {section.items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  style={linkStyle(item.to)}
                  className="sidebar-link"
                  onMouseEnter={(e) => {
                    if (!isActive(item.to)) {
                      e.currentTarget.style.backgroundColor = "var(--sidebar-hover)";
                      e.currentTarget.style.color = "var(--text-primary)";
                    }
                    const tip = e.currentTarget.querySelector(".sidebar-tooltip");
                    if (tip) tip.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.to)) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }
                    const tip = e.currentTarget.querySelector(".sidebar-tooltip");
                    if (tip) tip.style.opacity = "0";
                  }}
                  onClick={closeSidebar}
                >
                  {item.icon}
                  {!isTablet && item.text}
                  {isTablet && (
                    <span className="sidebar-tooltip" style={tooltipStyle}>
                      {item.text}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
        {!isTablet && (
          <div
            style={{
              padding: "16px 24px",
              borderTop: "1px solid var(--border-color)",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              textAlign: "center",
            }}
          >
            React & Spring Boot
          </div>
        )}
      </aside>
    </>
  );
}

export default Sidebar;
