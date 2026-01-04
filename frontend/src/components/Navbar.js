

// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav
//       style={{
//         display: "flex",
//         justifyContent: "space-around",
//         alignItems: "center",
//         padding: "15px 0",
//         backgroundColor: "#4CAF50",
//         color: "white",
//         fontWeight: "bold",
//         boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
//         position: "sticky",
//         top: 0,
//         zIndex: 1000
//       }}
//     >
//       <Link
//         to="/booking"
//         style={{ color: "white", textDecoration: "none", fontSize: "16px" }}
//       >
//         Booking
//       </Link>
//       <Link
//         to="/appointments"
//         style={{ color: "white", textDecoration: "none", fontSize: "16px" }}
//       >
//         Appointments
//       </Link>
//       <Link
//         to="/reminders"
//         style={{ color: "white", textDecoration: "none", fontSize: "16px" }}
//       >
//         Reminders Applied For
//       </Link>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "15px 0",
        backgroundColor: "#2e7d32", // Darker green to match your dashboard theme
        color: "white",
        fontWeight: "bold",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}
    >
      {/* Home/Dashboard Link */}
      <Link to="/dashboard" style={{ color: "white", textDecoration: "none", fontSize: "16px" }}>
        🏠 Dashboard
      </Link>

      <Link to="/booking" style={{ color: "white", textDecoration: "none", fontSize: "16px" }}>
        📅 Booking
      </Link>

      <Link to="/appointments" style={{ color: "white", textDecoration: "none", fontSize: "16px" }}>
        ✅ My Appointments
      </Link>

      <Link to="/reminders" style={{ color: "white", textDecoration: "none", fontSize: "16px" }}>
        🕒 Reminders
      </Link>
    </nav>
  );
};

export default Navbar;