import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hospitalData } from '../data/hospitalData';

const Booking = () => {
  const navigate = useNavigate();
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedSpecialist, setSelectedSpecialist] = useState("");
  const [date, setDate] = useState("");

  const handleBooking = (e) => {
    e.preventDefault();
    if (!selectedHospital || !selectedSpecialist || !date) {
      alert("Please fill all details");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      hospital: selectedHospital,
      specialist: selectedSpecialist,
      date: date,
      status: "Confirmed"
    };

    // Save to localStorage for the Appointments page
    const existing = JSON.parse(localStorage.getItem("userAppointments") || "[]");
    localStorage.setItem("userAppointments", JSON.stringify([...existing, newAppointment]));

    alert("Appointment Booked Successfully!");
    navigate("/appointments"); // Redirect to final list
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", padding: "20px", background: "#f9f9f9", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
      <h2 style={{ color: "#2e7d32", textAlign: "center" }}>Book Appointment</h2>
      <form onSubmit={handleBooking} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        
        <label>Select Hospital:</label>
        <select onChange={(e) => setSelectedHospital(e.target.value)} value={selectedHospital}>
          <option value="">-- Choose Hospital --</option>
          {hospitalData.map(h => <option key={h.id} value={h.name}>{h.name}</option>)}
        </select>

        {selectedHospital && (
          <>
            <label>Available Specialists:</label>
            <select onChange={(e) => setSelectedSpecialist(e.target.value)} value={selectedSpecialist}>
              <option value="">-- Select Specialist --</option>
              {hospitalData.find(h => h.name === selectedHospital).specialists.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </>
        )}

        <label>Appointment Date:</label>
        <input type="date" onChange={(e) => setDate(e.target.value)} value={date} />

        <button type="submit" style={{ padding: "10px", background: "#2e7d32", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
          Confirm Appointment
        </button>
      </form>
    </div>
  );
};

export default Booking;