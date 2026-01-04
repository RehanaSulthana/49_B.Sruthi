import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chatbot from '../components/Chatbot';
import { openHealthData } from '../data/prescriptionData'; // Ensure path is correct

const OldAgeSector = () => {
    const navigate = useNavigate();
    const [openCategory, setOpenCategory] = useState(null);

    const healthCategories = [
        {
            category: "Osteoarthritis / Joint Pain",
            issues: [
                {
                    issue: "Joint Pain & Mobility Issues",
                    reason: "Wear and tear of protective cartilage over time.",
                    naturalRemedies: [
                        "Low-impact exercises: Daily walking or warm water swimming.",
                        "Anti-inflammatory diet: Turmeric & Ginger tea and Omega-3 rich foods.",
                        "Hot/Cold compress therapy on affected joints."
                    ],
                    medication: "Pain relievers or Glucosamine supplements as prescribed.",
                    doctor: "Dr. Eleanor Vance (Rheumatologist)"
                }
            ]
        },
        {
            category: "Memory Support / Cognitive Health",
            issues: [
                {
                    issue: "Memory Decline / Cognitive Support",
                    reason: "Natural aging process or reduced neuro-plasticity.",
                    naturalRemedies: [
                        "Mental Stimulation: Puzzles, reading, or learning a new hobby.",
                        "Social Engagement: Regular interaction with friends and family.",
                        "Rich Antioxidant Diet: Berries, leafy greens, and walnuts."
                    ],
                    medication: "Cognitive enhancers as per specialist advice.",
                    doctor: "Dr. Alan Turing (Geriatric Specialist)"
                }
            ]
        }
    ];

    // UPDATED: Fetches professional geriatric data and triggers Chatbot
    const handleSetReminder = () => {
        const item = window.prompt("Enter Medication or Wellness activity (e.g., BP Pill, Iron):");
        if (!item) return;

        // Standardize input for lookup
        const formattedItem = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();

        // Fetch details from openHealthData mock
        const fetchedData = openHealthData[formattedItem] || {
            dosage: "Dosage details not found in database. Please follow prescribed instructions.",
            sideEffects: "Consult your specialist for safety information.",
            source: "General Geriatric Database",
            instructions: "Take care and move slowly after medication."
        };

        // 1. Save to localStorage for Dashboard/Reminders page
        const newReminder = {
            id: Date.now(),
            text: `Senior Care: ${formattedItem}`,
            prescription: fetchedData.dosage,
            date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        const existingReminders = JSON.parse(localStorage.getItem("userReminders") || "[]");
        localStorage.setItem("userReminders", JSON.stringify([...existingReminders, newReminder]));

        // 2. TRIGGER THE CHATBOT AGENT
        // Dispatches the custom event with full medical details
        const event = new CustomEvent("activateChatbotAgent", { 
            detail: { 
                item: formattedItem, 
                prescription: fetchedData.dosage,
                source: fetchedData.source,
                instructions: fetchedData.instructions,
                sideEffects: fetchedData.sideEffects
            } 
        });
        window.dispatchEvent(event);

        alert(`✅ Senior Care info for ${formattedItem} fetched! Opening Chatbot for monitoring.`);
    };

    return (
        <div 
            className="old-age-sector-page" 
            style={{
                minHeight: '100vh',
                padding: '20px',
                backgroundColor: '#f1f8e9',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflowY: 'auto'
            }}
        >
            <h2 style={{ color: '#33691e', textAlign: 'center', marginBottom: '20px' }}>
                👵 Old Age Health Portal
            </h2>
            <p style={{ textAlign: 'center', color: '#555' }}>
                Comprehensive geriatric care, joint health, and chronic support.
            </p>

            {/* Health Categories Accordion */}
            <div style={{ width: '100%', maxWidth: '800px', marginTop: '20px' }}>
                {healthCategories.map((category, idx) => (
                    <div key={idx} style={{ marginBottom: '15px' }}>
                        <div
                            onClick={() => setOpenCategory(openCategory === idx ? null : idx)}
                            style={{
                                backgroundColor: '#c5e1a5',
                                padding: '10px',
                                cursor: 'pointer',
                                borderRadius: '8px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        >
                            <h4 style={{ color: '#558b2f', margin: 0 }}>
                                {category.category} {openCategory === idx ? "▲" : "▼"}
                            </h4>
                        </div>

                        {openCategory === idx && (
                            <div style={{ marginTop: '10px' }}>
                                {category.issues.map((issue, i) => (
                                    <div key={i} style={{ 
                                        marginTop: '10px', 
                                        borderLeft: '5px solid #689f38', 
                                        paddingLeft: '10px', 
                                        backgroundColor: '#f9fff5', 
                                        borderRadius: '5px', 
                                        padding: '15px',
                                        boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                                    }}>
                                        <h5 style={{ margin: '0 0 10px 0' }}>{issue.issue}</h5>
                                        <p style={{ fontSize: '13px' }}><strong>Reason:</strong> {issue.reason}</p>
                                        <div style={{ margin: '10px 0', fontSize: '13px' }}>
                                            <strong>🌱 Natural Remedies:</strong>
                                            <ul style={{ paddingLeft: '20px', marginTop: '5px' }}>
                                                {issue.naturalRemedies.map((r, idx) => <li key={idx} style={{ marginBottom: '3px' }}>{r}</li>)}
                                            </ul>
                                        </div>
                                        <p style={{ fontSize: '13px' }}><strong>💊 Medication:</strong> {issue.medication}</p>
                                        <p style={{ fontSize: '13px', color: '#558b2f', fontWeight: 'bold', marginTop: '10px' }}>🩺 Recommended: {issue.doctor}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Smart Wellness Reminder Action Box */}
            <div style={{
                marginTop: '30px',
                width: '100%',
                maxWidth: '800px',
                textAlign: 'center',
                backgroundColor: '#f9fff5',
                border: '2px dashed #c5e1a5',
                padding: '20px',
                borderRadius: '12px'
            }}>
                <p style={{ fontWeight: 'bold', color: '#33691e', marginBottom: '15px' }}>🕒 Senior Wellness Monitoring Agent</p>
                <button
                    onClick={handleSetReminder}
                    style={{
                        background: 'linear-gradient(90deg, #689f38, #33691e)',
                        color: 'white',
                        padding: '12px 25px',
                        border: 'none',
                        borderRadius: '50px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        transition: 'transform 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    + Set Reminder & Fetch Medical Data
                </button>
            </div>

            {/* Back Navigation */}
            <button
                onClick={() => navigate('/dashboard')}
                style={{
                    marginTop: '30px',
                    width: '160px',
                    background: 'white',
                    color: '#33691e',
                    padding: '10px 20px',
                    border: '2px solid #c5e1a5',
                    borderRadius: '50px',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                }}
            >
                ← Dashboard
            </button>

            {/* The Chatbot instance integrated here */}
            <Chatbot />
        </div>
    );
};

export default OldAgeSector;