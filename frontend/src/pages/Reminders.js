// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Reminders = () => {
//   const [reminders, setReminders] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("userReminders") || "[]");
//     setReminders(saved);
//   }, []);

//   const deleteReminder = (id) => {
//     const updated = reminders.filter(r => r.id !== id);
//     setReminders(updated);
//     localStorage.setItem("userReminders", JSON.stringify(updated));
//   };

//   return (
//     <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
//       <button onClick={() => navigate("/dashboard")} style={{ marginBottom: "20px", cursor: "pointer" }}>← Back to Dashboard</button>
//       <h2 style={{ color: "#2e7d32", borderBottom: "2px solid #2e7d32", paddingBottom: "10px" }}>My Reminders</h2>
      
//       {reminders.length === 0 ? (
//         <p style={{ textAlign: "center", color: "#777", marginTop: "30px" }}>No active reminders.</p>
//       ) : (
//         reminders.map((r) => (
//           <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "white", padding: "15px", marginBottom: "15px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
//             <div>
//               <div style={{ fontWeight: "bold", color: "#333" }}>{r.text}</div>
//               <div style={{ fontSize: "12px", color: "#888" }}>{r.date}</div>
//             </div>
//             <button onClick={() => deleteReminder(r.id)} style={{ backgroundColor: "#ff5252", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Reminders;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userReminders") || "[]");
    setReminders(saved);
  }, []);

  const deleteReminder = (id) => {
    const updated = reminders.filter(r => r.id !== id);
    setReminders(updated);
    localStorage.setItem("userReminders", JSON.stringify(updated));
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "20px" }}>
      <button 
        onClick={() => navigate("/dashboard")} 
        style={{ marginBottom: "20px", cursor: "pointer", border: "none", background: "#f0f0f0", padding: "8px 15px", borderRadius: "5px" }}
      >
        ← Back to Dashboard
      </button>

      <h2 style={{ color: "#2e7d32", borderBottom: "2px solid #2e7d32", paddingBottom: "10px" }}>
        My Medication & Care Reminders
      </h2>
      
      {reminders.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777", marginTop: "30px" }}>No active reminders set.</p>
      ) : (
        reminders.map((r) => (
          <div 
            key={r.id} 
            style={{ 
              background: "white", 
              padding: "20px", 
              marginBottom: "20px", 
              borderRadius: "12px", 
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              borderLeft: "6px solid #2e7d32"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h3 style={{ margin: "0 0 5px 0", color: "#1b5e20" }}>{r.text}</h3>
                <p style={{ fontSize: "12px", color: "#888", marginBottom: "10px" }}>📅 Set on: {r.date}</p>
              </div>
              <button 
                onClick={() => deleteReminder(r.id)} 
                style={{ backgroundColor: "#ffefef", color: "#ff5252", border: "1px solid #ff5252", padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "12px" }}
              >
                Delete
              </button>
            </div>

            {/* Prescription Details Section */}
            <div style={{ background: "#f9f9f9", padding: "10px", borderRadius: "8px", marginTop: "10px" }}>
              <div style={{ fontSize: "14px", marginBottom: "5px" }}>
                <strong>💊 Dosage:</strong> {r.prescription || "Follow doctor's guide."}
              </div>
              {r.source && (
                <div style={{ fontSize: "12px", color: "#555" }}>
                  <strong>🌐 Data Source:</strong> {r.source}
                </div>
              )}
            </div>

            {/* Emergency/Escalation Shortcut */}
            <div style={{ marginTop: "15px", display: "flex", gap: "10px", alignItems: "center" }}>
              <span style={{ fontSize: "13px", color: "#666" }}>Feeling serious pain?</span>
              <button 
                onClick={() => navigate("/booking")}
                style={{ background: "#2e7d32", color: "white", border: "none", padding: "5px 12px", borderRadius: "20px", fontSize: "12px", cursor: "pointer", fontWeight: "bold" }}
              >
                Meet Doctor
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Reminders;