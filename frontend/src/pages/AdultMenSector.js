import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chatbot from '../components/Chatbot';
import { openHealthData } from '../data/prescriptionData'; // Importing your mock data

const AdultMenSector = () => {
    const navigate = useNavigate();
    const [openCategory, setOpenCategory] = useState(null);

    const healthCategories = [
        {
            category: "Cardiovascular Health (Heart Care)",
            issues: [
                {
                    issue: "Heart Stress / High BP",
                    reason: "High stress, poor diet, or sedentary lifestyle leading to arterial plaque.",
                    naturalRemedies: [
                        "Increase Omega-3 intake (Walnuts, Chia seeds, or Fatty fish).",
                        "Perform 30 minutes of brisk walking or cardio daily.",
                        "Practice deep breathing exercises to manage cortisol levels."
                    ],
                    medication: "Statins or Blood Pressure regulators as prescribed.",
                    doctor: "Dr. Robert Chase (Cardiologist)"
                }
            ]
        },
        {
            category: "Digestive Issues / Gastritis",
            issues: [
                {
                    issue: "Gastritis / Acid Reflux",
                    reason: "High protein intake without enough fiber or irregular eating habits.",
                    naturalRemedies: [
                        "Drink warm lemon water in the morning.",
                        "Incorporate fermented foods like yogurt or kefir for gut flora.",
                        "Avoid heavy meals 3 hours before sleep."
                    ],
                    medication: "Antacids or Probiotics as per medical advice.",
                    doctor: "Dr. Gregory House (General Physician)"
                }
            ]
        }
    ];

    // UPDATED FUNCTION: Fetches data from openHealthData and triggers Chatbot
    const handleSetReminder = () => {
        const item = window.prompt("Enter medication name (e.g., Iron, Meftal, BP Pill):");
        if (!item) return;

        // Fetch details from our "Open Source" local mock
        const fetchedData = openHealthData[item] || {
            dosage: "Please consult a pharmacist for dosage.",
            sideEffects: "N/A",
            source: "General Medical Database"
        };

        // 1. Save to localStorage for Dashboard and Global Reminders page
        const newReminder = {
            id: Date.now(),
            text: `Men's Care: ${item}`,
            prescription: fetchedData.dosage,
            source: fetchedData.source,
            date: new Date().toLocaleString()
        };
        const existing = JSON.parse(localStorage.getItem("userReminders") || "[]");
        localStorage.setItem("userReminders", JSON.stringify([...existing, newReminder]));

        // 2. TRIGGER THE CHATBOT
        // Sending fetched data via the Custom Event
        const event = new CustomEvent("activateChatbotAgent", { 
            detail: { 
                item: item, 
                prescription: fetchedData.dosage,
                sideEffects: fetchedData.sideEffects,
                source: fetchedData.source
            } 
        });
        window.dispatchEvent(event);

        alert(`✅ Details for ${item} fetched from ${fetchedData.source}. Check the Chatbot!`);
    };

    return (
        <div 
            className="adult-men-sector-page" 
            style={{
                minHeight: '100vh',
                padding: '20px',
                backgroundColor: '#e1f5fe',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflowY: 'auto'
            }}
        >
            <h2 style={{ color: '#01579b', textAlign: 'center', marginBottom: '20px' }}>
                👨 Adult Men's Health Portal
            </h2>
            <p style={{ textAlign: 'center', color: '#555' }}>
                Focus on heart health, digestive wellness, and preventive care.
            </p>

            {/* Health Categories Accordion */}
            <div style={{ width: '100%', maxWidth: '800px', marginTop: '20px' }}>
                {healthCategories.map((category, idx) => (
                    <div key={idx} style={{ marginBottom: '15px' }}>
                        <div
                            onClick={() => setOpenCategory(openCategory === idx ? null : idx)}
                            style={{
                                backgroundColor: '#4fc3f7',
                                padding: '10px',
                                cursor: 'pointer',
                                borderRadius: '8px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        >
                            <h4 style={{ color: '#01579b', margin: 0 }}>
                                {category.category} {openCategory === idx ? "▲" : "▼"}
                            </h4>
                        </div>

                        {openCategory === idx && (
                            <div style={{ marginTop: '10px' }}>
                                {category.issues.map((issue, i) => (
                                    <div key={i} style={{ marginTop: '10px', borderLeft: '5px solid #0288d1', paddingLeft: '10px', backgroundColor: '#e0f7fa', borderRadius: '5px', padding: '15px', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
                                        <h5 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>{issue.issue}</h5>
                                        <p style={{ fontSize: '13px' }}><strong>Reason:</strong> {issue.reason}</p>
                                        <div style={{ margin: '10px 0', fontSize: '13px' }}>
                                            <strong>🌱 Natural Remedies:</strong>
                                            <ul style={{ paddingLeft: '20px', marginTop: '5px' }}>
                                                {issue.naturalRemedies.map((r, idx) => <li key={idx} style={{ marginBottom: '3px' }}>{r}</li>)}
                                            </ul>
                                        </div>
                                        <p style={{ fontSize: '13px' }}><strong>💊 Medication:</strong> {issue.medication}</p>
                                        <p style={{ fontSize: '13px', color: '#0288d1', fontWeight: 'bold', marginTop: '10px' }}>🩺 Recommended: {issue.doctor}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Smart Reminder Action Box */}
            <div style={{
                marginTop: '30px',
                width: '100%',
                maxWidth: '800px',
                textAlign: 'center',
                backgroundColor: '#f0faff',
                border: '2px dashed #4fc3f7',
                padding: '25px',
                borderRadius: '12px'
            }}>
                <p style={{ fontWeight: 'bold', color: '#01579b', marginBottom: '15px' }}>🕒 MediSmart AI Fetching Agent</p>
                <button
                    onClick={handleSetReminder}
                    style={{
                        background: 'linear-gradient(90deg, #0288d1, #01579b)',
                        color: 'white',
                        padding: '12px 30px',
                        border: 'none',
                        borderRadius: '50px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    + Fetch Prescription & Set Reminder
                </button>

                <br />

                <button
                    onClick={() => navigate('/dashboard')}
                    style={{
                        marginTop: '25px',
                        width: '140px',
                        background: 'white',
                        color: '#0288d1',
                        padding: '8px 15px',
                        border: '2px solid #0288d1',
                        borderRadius: '50px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                >
                    Go Back
                </button>
            </div>

            {/* Chatbot integrated here */}
            <Chatbot />
        </div>
    );
};

export default AdultMenSector;