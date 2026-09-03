import React, { useState } from "react";
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

function Sidebar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const sidebarStyle = {
    position: "sticky",
    top: 0,
    width: 260,
    height: "100vh",
    backgroundColor: "var(--sidebar-bg)",
    borderRight: "1px solid var(--sidebar-border)",
    overflowY: "auto",
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    transition: "transform var(--transition-normal)",
  };

  const brandStyle = {
    padding: "20px 24px",
    borderBottom: "1px solid var(--border-color)",
    display: "flex",
    alignItems: "center",
    gap: "12px",
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
  };

  const sectionLabelStyle = {
    padding: "16px 24px 8px",
    fontSize: "0.75rem",
    fontWeight: "600",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };

  const linkStyle = (path) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 24px",
    color: isActive(path) ? "var(--primary)" : "var(--text-secondary)",
    backgroundColor: isActive(path) ? "var(--sidebar-active)" : "transparent",
    textDecoration: "none",
    fontSize: "0.875rem",
    fontWeight: isActive(path) ? "600" : "500",
    borderRight: isActive(path) ? "3px solid var(--primary)" : "3px solid transparent",
    transition: "all var(--transition-fast)",
  });

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 9,
    display: "none",
  };

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        style={{
          position: "fixed",
          top: "16px",
          left: "16px",
          zIndex: 8,
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--border-radius)",
          padding: "8px",
          cursor: "pointer",
          boxShadow: "var(--shadow)",
        }}
        className="d-md-none"
      >
        <HiMenu size={24} color="var(--text-primary)" />
      </button>

      {/* Mobile overlay */}
      <div
        style={{ ...overlayStyle, display: mobileOpen ? "block" : "none" }}
        onClick={() => setMobileOpen(false)}
      />

      {/* Sidebar */}
      <aside
        style={sidebarStyle}
        className={`sidebar-component flex-column${mobileOpen ? " sidebar-open" : ""}`}
      >
        {/* Brand */}
        <div style={brandStyle}>
          <div style={logoStyle}>L</div>
          <div>
            <div style={{ fontWeight: "700", fontSize: "1rem", color: "var(--text-primary)" }}>
              LMS
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              Library Management
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              marginLeft: "auto",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              padding: "4px",
            }}
            className="d-md-none"
          >
            <HiX size={20} color="var(--text-secondary)" />
          </button>
        </div>

        {/* Nav sections */}
        <nav style={{ flex: 1, padding: "8px 0" }}>
          {navSections.map((section) => (
            <div key={section.label}>
              <div style={sectionLabelStyle}>{section.label}</div>
              {section.items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  style={linkStyle(item.to)}
                  onMouseEnter={(e) => {
                    if (!isActive(item.to)) {
                      e.currentTarget.style.backgroundColor = "var(--sidebar-hover)";
                      e.currentTarget.style.color = "var(--text-primary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.to)) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.icon}
                  {item.text}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
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
      </aside>
    </>
  );
}

export default Sidebar;
