import React from "react";
import { useNavigate } from "react-router-dom";

function CategoryCard({ title }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/category/${title}`)}
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "8px",
        cursor: "pointer",
        textAlign: "center"
      }}
    >
      <h3>{title}</h3>
    </div>
  );
}

export default CategoryCard;
