import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import diseaseData from "../data/diseaseData";
import Chatbot from "../components/Chatbot";

function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h2>{category}</h2>

      {diseaseData[category]?.map((disease) => (
        <div
          key={disease}
          onClick={() => navigate(`/disease/${disease}`)}
          style={{
            margin: "10px 0",
            padding: "15px",
            border: "1px solid #ccc",
            cursor: "pointer"
          }}
        >
          {disease}
        </div>
      ))}

      <Chatbot />
    </div>
  );
}

export default CategoryPage;
