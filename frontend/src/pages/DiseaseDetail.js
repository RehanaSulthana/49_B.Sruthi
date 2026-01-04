import React from "react";
import { useParams } from "react-router-dom";
import Chatbot from "../components/Chatbot";

function DiseaseDetail() {
  const { disease } = useParams();

  return (
    <div style={{ padding: "20px" }}>
      <h2>{disease}</h2>

      <p>Basic information and precautions related to {disease}.</p>

      <p style={{ color: "red" }}>
        Disclaimer: Educational purpose only.
      </p>

      <Chatbot />
    </div>
  );
}

export default DiseaseDetail;
