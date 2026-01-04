import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chatbot from '../components/Chatbot';
import { openHealthData } from '../data/prescriptionData'; // Ensure path matches your file name

const AdultWomenSector = () => {
    const navigate = useNavigate();
    const [openCondition, setOpenCondition] = useState(null);

    const menstrualConditions = [
        {
            condition: "Dysmenorrhea (Severe Cramps)",
            reason: "Prostaglandins causing uterine contractions.",
            naturalRemedies: [
                "Apply a heating pad to the lower abdomen.",
                "Sip warm Ginger or Chamomile tea.",
                "Gentle yoga stretches (Cobra or Child's pose)."
            ],
            medication: "NSAIDs (like Ibuprofen) as per doctor's advice.",
            doctor: "Dr. Elena Gilbert (Gynaecologist)"
        },
        {
            condition: "Menstrual Migraines",
            reason: "Drop in estrogen levels before the cycle starts.",
            naturalRemedies: [
                "Magnesium-rich foods (Dark chocolate, Almonds).",
                "Rest in a dark, quiet room.",
                "Stay hydrated with electrolyte-rich water."
            ],
            medication: "Specific migraine relief medication.",
            doctor: "Dr. Sarah Jenkins (Women's Health Specialist)"
        }
    ];

    // UPDATED: Fetches detailed info from Open Source mock and triggers Chatbot
    const handleSetReminder = () => {
        const item = window.prompt("Enter medication or supplement (e.g., Iron, Meftal):");
        if (!item) return;

        // Standardize input for lookup (e.g., "iron" -> "Iron")
        const formattedItem = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();

        // Fetch details from openHealthData
        const fetchedData = openHealthData[formattedItem] || {
            dosage: "Dosage not found. Please follow your doctor's handwritten notes.",
            sideEffects: "Consult a pharmacist for safety info.",
            source: "General Medical Database"
        };

        // 1. Save to localStorage for Dashboard and Reminders page
        const newReminder = {
            id: Date.now(),
            text: `Women's Health: ${formattedItem}`,
            prescription: fetchedData.dosage,
            date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        const existingReminders = JSON.parse(localStorage.getItem("userReminders") || "[]");
        localStorage.setItem("userReminders", JSON.stringify([...existingReminders, newReminder]));

        // 2. TRIGGER THE CHATBOT AGENT
        // We pass the professional data fetched from our open-source mock
        const event = new CustomEvent("activateChatbotAgent", { 
            detail: { 
                item: formattedItem, 
                prescription: fetchedData.dosage,
                source: fetchedData.source,
                sideEffects: fetchedData.sideEffects
            } 
        });
        window.dispatchEvent(event);

        alert(`✅ Professional info for ${formattedItem} fetched! Open Chatbot to view.`);
    };

    return (
        <div 
            className="adult-women-sector-page"
            style={{
                minHeight: '100vh',
                padding: '20px',
                backgroundColor: '#fce4ec',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflowY: 'auto'
            }}
        >
            <h2 style={{ color: '#ad1457', textAlign: 'center', marginBottom: '20px' }}>
                👩 Adult Women's Health Portal
            </h2>

            {/* Menstrual Cycle Conditions Accordion */}
            <div style={{ width: '100%', maxWidth: '850px' }}>
                {menstrualConditions.map((item, i) => (
                    <div key={i} style={{ marginBottom: '15px' }}>
                        <div
                            onClick={() => setOpenCondition(openCondition === i ? null : i)}
                            style={{
                                backgroundColor: '#f8bbd0',
                                padding: '12px',
                                cursor: 'pointer',
                                borderRadius: '8px',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <h4 style={{ color: '#880e4f', margin: 0 }}>
                                {item.condition} {openCondition === i ? "▲" : "▼"}
                            </h4>
                        </div>

                        {openCondition === i && (
                            <div style={{ padding: '15px', background: '#fff1f8', borderRadius: '8px', marginTop: '5px', borderLeft: '5px solid #ad1457' }}>
                                <p style={{ fontSize: '13px' }}><strong>Reason:</strong> {item.reason}</p>
                                <div style={{ margin: '10px 0', fontSize: '13px' }}>
                                    <strong>🌱 Natural Remedies:</strong>
                                    <ul>
                                        {item.naturalRemedies.map((r, idx) => <li key={idx}>{r}</li>)}
                                    </ul>
                                </div>
                                <p style={{ fontSize: '13px' }}><strong>💊 Medication:</strong> {item.medication}</p>
                                <p style={{ fontSize: '13px', color: '#ad1457', fontWeight: 'bold' }}>🩺 Recommended: {item.doctor}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Smart Reminder Container */}
            <div style={{ 
                marginTop: '30px', 
                width: '100%', 
                maxWidth: '850px', 
                textAlign: 'center', 
                backgroundColor: '#fff1f8', 
                border: '2px dashed #f8bbd0', 
                padding: '20px', 
                borderRadius: '8px' 
            }}>
                <p style={{ fontWeight: 'bold', color: '#ad1457', marginBottom: '10px' }}>🕒 Smart Menstrual Care Agent</p>
                <button 
                    onClick={handleSetReminder} 
                    style={{ 
                        background: 'linear-gradient(90deg, #ad1457, #880e4f)', 
                        color: 'white', 
                        padding: '12px 25px', 
                        border: 'none', 
                        borderRadius: '50px', 
                        cursor: 'pointer', 
                        fontWeight: 'bold',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        transition: 'transform 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    + Set Reminder & Fetch Info
                </button>
            </div>

            {/* Back Button */}
            <button
                onClick={() => navigate('/dashboard')}
                style={{
                    marginTop: '30px',
                    width: '150px',
                    background: 'white',
                    color: '#ad1457',
                    padding: '10px 20px',
                    border: '2px solid #ad1457',
                    borderRadius: '50px',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                }}
            >
                Go Back
            </button>

            {/* Chatbot integrated here */}
            <Chatbot />
        </div>
    );
};

export default AdultWomenSector;