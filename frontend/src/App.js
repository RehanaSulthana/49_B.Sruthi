
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import "./App.css";

// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";

// import ChildrenSector from "./pages/ChildrenSector";
// import AdultWomenSector from "./pages/AdultWomenSector";
// import AdultMenSector from "./pages/AdultMenSector";
// import OldAgeSector from "./pages/OldAgeSector";
// import Reminders from "./pages/Reminders";

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Default */}
//         <Route path="/" element={<Navigate to="/register" />} />

//         {/* Auth */}
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />

//         {/* Dashboard */}
//         <Route path="/dashboard" element={<Dashboard />} />

//         {/* Sectors */}
//         <Route path="/sector/children" element={<ChildrenSector />} />
//         <Route path="/sector/women" element={<AdultWomenSector />} />
//         <Route path="/sector/men" element={<AdultMenSector />} />
//         <Route path="/sector/old-age" element={<OldAgeSector />} />
//         <Route path="/reminders" element={<Reminders />} />
//       </Routes>
//     </Router>
//   );
// }


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Auth & Main
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// Sector Pages
import ChildrenSector from "./pages/ChildrenSector";
import AdultWomenSector from "./pages/AdultWomenSector";
import AdultMenSector from "./pages/AdultMenSector";
import OldAgeSector from "./pages/OldAgeSector";

// New Care & Booking Pages
import Reminders from "./pages/Reminders";
import Booking from "./pages/Booking";         // Added
import Appointments from "./pages/Appointments"; // Added

// Shared Components
import Navbar from "./components/Navbar";       // Added

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes don't usually show the Navbar */}
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard and Health Routes with Navbar wrapper */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                
                {/* Sectors */}
                <Route path="/sector/children" element={<ChildrenSector />} />
                <Route path="/sector/women" element={<AdultWomenSector />} />
                <Route path="/sector/men" element={<AdultMenSector />} />
                <Route path="/sector/old-age" element={<OldAgeSector />} />

                {/* Features */}
                <Route path="/reminders" element={<Reminders />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/appointments" element={<Appointments />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
}