import React from "react";
import { useNavigate, Link } from "react-router-dom";

import childrenImg from "../assets/children.jpg";
import womenImg from "../assets/women.jpg";
import menImg from "../assets/Adult men.jpg";
import oldAgeImg from "../assets/Oldage people.avif";

const Dashboard = () => {
  const navigate = useNavigate();

  const sectors = [
    {
      name: "Children",
      color: "#E8F5E9",
      description: "Pediatric care, vaccinations, and nutrition.",
      img: childrenImg
    },
    {
      name: "Adult Women",
      color: "#C8E6C9",
      description: "Maternal health, screenings, and wellness.",
      img: womenImg
    },
    {
      name: "Adult Men",
      color: "#A5D6A7",
      description: "Fitness, preventive care, and heart health.",
      img: menImg
    },
    {
      name: "Old Age",
      color: "#81C784",
      description: "Geriatric support, joint care, and chronic help.",
      img: oldAgeImg
    }
  ];

  const handleSectorClick = (name) => {
    if (name === "Children") navigate("/sector/children");
    else if (name === "Adult Women") navigate("/sector/women");
    else if (name === "Adult Men") navigate("/sector/men");
    else navigate("/sector/old-age");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "auto", padding: "20px" }}>
      {/* NAVBAR */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 30px",
          backgroundColor: "#2e7d32",
          color: "white",
          fontWeight: "bold",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          borderRadius: "10px",
          marginBottom: "30px",
          flexWrap: "wrap"
        }}
      >
        <h2 style={{ margin: 0 }}>MediSmart Dashboard</h2>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <Link
            to="/booking"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "16px",
              transition: "0.2s",
            }}
            onMouseEnter={e => e.target.style.opacity = 0.8}
            onMouseLeave={e => e.target.style.opacity = 1}
          >
            Booking
          </Link>
          <Link
            to="/appointments"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "16px",
              transition: "0.2s",
            }}
            onMouseEnter={e => e.target.style.opacity = 0.8}
            onMouseLeave={e => e.target.style.opacity = 1}
          >
            Appointments
          </Link>
          <Link
            to="/reminders"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "16px",
              transition: "0.2s",
            }}
            onMouseEnter={e => e.target.style.opacity = 0.8}
            onMouseLeave={e => e.target.style.opacity = 1}
          >
            Reminders
          </Link>
        </div>
      </nav>

      <h3 style={{ textAlign: "center", marginBottom: "25px", color: "#2e7d32" }}>
        Select Health Category
      </h3>

      {/* SECTOR CARDS - UPDATED FOR 2x2 GRID */}
      <div
        style={{
          display: "grid",
          // Changed from auto-fit to repeat(2, 1fr) to force 2 columns
          gridTemplateColumns: "repeat(2, 1fr)", 
          gap: "25px",
          maxWidth: "700px", // Limits width so cards don't get too stretched
          margin: "0 auto"    // Centers the 2x2 grid
        }}
      >
        {sectors.map((sector) => (
          <div
            key={sector.name}
            onClick={() => handleSectorClick(sector.name)}
            style={{
              background: `linear-gradient(145deg, ${sector.color}, #ffffff)`,
              padding: "25px 15px",
              cursor: "pointer",
              textAlign: "center",
              borderRadius: "15px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)";
            }}
          >
            <img
              src={sector.img}
              alt={sector.name}
              width="100"
              height="100"
              style={{ borderRadius: "50%", marginBottom: "15px", objectFit: "cover" }}
            />
            <h4 style={{ marginBottom: "10px", color: "#1b5e20" }}>{sector.name}</h4>
            <p style={{ fontSize: "14px", color: "#555" }}>{sector.description}</p>
          </div>
        ))}
      </div>

      {/* LOGOUT BUTTON */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <button
          onClick={handleLogout}
          style={{
            background: "linear-gradient(90deg, #ff5252, #e53935)",
            color: "white",
            width: "140px",
            height: "45px",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px", // Added a small radius for a cleaner look
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;