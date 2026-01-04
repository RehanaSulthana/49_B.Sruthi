import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userAppointments") || "[]");
    setList(saved);
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <button onClick={() => navigate("/dashboard")} style={{ marginBottom: "20px" }}>← Dashboard</button>
      <h2 style={{ borderBottom: "2px solid #2e7d32", paddingBottom: "10px" }}>My Appointments</h2>
      
      {list.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        list.map((apt) => (
          <div key={apt.id} style={{ padding: "15px", background: "#e8f5e9", marginBottom: "10px", borderRadius: "8px", borderLeft: "5px solid #2e7d32" }}>
            <h4 style={{ margin: "0 0 5px 0" }}>{apt.hospital}</h4>
            <div style={{ fontSize: "14px" }}>👩‍⚕️ **Specialist:** {apt.specialist}</div>
            <div style={{ fontSize: "14px" }}>📅 **Date:** {apt.date}</div>
            <div style={{ fontSize: "12px", color: "green", fontWeight: "bold", marginTop: "5px" }}>Status: {apt.status}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default Appointments;