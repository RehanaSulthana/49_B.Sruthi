// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";

// export default function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const register = async () => {
//     try {
//       await api.post("/auth/register", form);
//       alert("Registration successful");
//       navigate("/login");   // 👈 REDIRECT
//     } catch (err) {
//       alert(err.response.data.message);
//     }
//   };

//   return (
//     <div className="container">
//       <h3>Register</h3>
//       <input name="name" placeholder="Name" onChange={handleChange} />
//       <input name="age" placeholder="Age" onChange={handleChange} />
//       <input name="gender" placeholder="Gender" onChange={handleChange} />
//       <input name="email" placeholder="Email" onChange={handleChange} />
//       <input
//         name="password"
//         type="password"
//         placeholder="Password"
//         onChange={handleChange}
//       />
//       <button onClick={register}>Register</button>
//       <p onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
//         Already have an account? Login
//       </p>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    password: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const register = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form className="container" onSubmit={register}>
      <h3>Register</h3>

      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="age" placeholder="Age" onChange={handleChange} required />
      <input name="gender" placeholder="Gender" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />

      <button type="submit">Register</button>

      <p onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
        Already have an account? Login
      </p>
    </form>
  );
}
