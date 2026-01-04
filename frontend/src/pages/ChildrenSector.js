import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chatbot from '../components/Chatbot';
import { openHealthData } from '../data/prescriptionData'; // Ensure this matches your file name

const ChildrenSector = () => {
    const navigate = useNavigate();
    const [showVaccinations, setShowVaccinations] = useState(false);
    const [openCategory, setOpenCategory] = useState(null);

    const vaccinations = [
        { name: "BCG", age: "At Birth", duration: "Single Day Dose" },
        { name: "Polio (OPV)", age: "6, 10, 14 weeks", duration: "3 Drops Doses" },
        { name: "Hepatitis B", age: "Birth, 1mo, 6mo", duration: "3 Injection Days" },
        { name: "MMR", age: "9 months", duration: "1st Dose" }
    ];

    const healthCategories = [
        {
            category: "Infectious Diseases",
            issues: [
                { disease: "Common Flu/Fever", reason: "Viral infection or sudden seasonal change.", cure: "Stay hydrated, rest, and use prescribed paracetamol.", doctor: "Dr. Sarah Smith (Senior Pediatrician)" },
                { disease: "Pneumonia", reason: "Bacterial or viral lung infection.", cure: "Antibiotics if bacterial; rest and hydration.", doctor: "Dr. Rahul Verma (Child Specialist)" }
            ]
        },
        {
            category: "Nutritional & Metabolic Disorders",
            issues: [
                { disease: "Iron Deficiency Anemia", reason: "Insufficient iron intake or absorption.", cure: "Iron supplements and iron-rich foods.", doctor: "Dr. Priya Kapoor (Pediatric Nutritionist)" }
            ]
        }
    ];

    // UPDATED: Fetches professional data from Open Source mock and triggers Chatbot
    const handleSetReminder = () => {
        const item = window.prompt("Enter child medication or supplement (e.g., Paracetamol, Vitamin D):");
        if (!item) return;

        // Standardize input for lookup (e.g., "paracetamol" -> "Paracetamol")
        const formattedItem = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();

        // Fetch details from openHealthData
        const fetchedData = openHealthData[formattedItem] || {
            dosage: "Dosage not found. Please refer to the pediatrician's specific instructions.",
            sideEffects: "Consult a medical professional for safety information.",
            source: "General Pediatric Database",
            instructions: "Monitor child closely after administration."
        };

        // 1. Save to localStorage for Dashboard and Reminders page
        const newReminder = {
            id: Date.now(),
            text: `Pediatric Care: ${formattedItem}`,
            prescription: fetchedData.dosage,
            date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        const existingReminders = JSON.parse(localStorage.getItem("userReminders") || "[]");
        localStorage.setItem("userReminders", JSON.stringify([...existingReminders, newReminder]));

        // 2. TRIGGER THE CHATBOT AGENT
        // Pass the fetched professional details to the chatbot
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

        alert(`✅ Professional info for ${formattedItem} fetched! Opening Pediatric Monitoring in Chatbot...`);
    };

    return (
        <div 
            className="children-sector-page" 
            style={{
                minHeight: '100vh',
                padding: '20px',
                backgroundColor: '#e8f5e9',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflowY: 'auto'
            }}
        >
            <h2 style={{ color: '#2e7d32', textAlign: 'center', marginBottom: '20px' }}>
                👶 Children's Health Portal
            </h2>

            {/* Vaccination Schedule */}
            <div
                className="section-box"
                style={{ 
                    backgroundColor: '#7fab4dff', 
                    padding: '10px',
                    width: '100%',
                    maxWidth: '800px',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    textAlign: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                onClick={() => setShowVaccinations(!showVaccinations)}
            >
                <h4 style={{ color: '#1b5e20', margin: 0 }}>📅 Vaccination Schedule {showVaccinations ? "▲" : "▼"}</h4>
            </div>

            {showVaccinations && (
                <div style={{ marginTop: '10px', width: '100%', maxWidth: '800px' }}>
                    {vaccinations.map((v, i) => (
                        <div 
                            key={i} 
                            style={{ 
                                padding: '12px',
                                background: 'white',
                                borderRadius: '8px',
                                marginTop: '10px',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                            }}
                        >
                            <strong>{v.name}</strong> - {v.age} ({v.duration})
                        </div>
                    ))}
                </div>
            )}

            {/* Health Categories Accordion */}
            <div style={{ marginTop: '20px', width: '100%', maxWidth: '800px' }}>
                {healthCategories.map((category, idx) => (
                    <div key={idx} style={{ marginBottom: '15px' }}>
                        <div
                            onClick={() => setOpenCategory(openCategory === idx ? null : idx)}
                            style={{
                                backgroundColor: '#7fab4dff',
                                padding: '10px',
                                cursor: 'pointer',
                                borderRadius: '8px'
                            }}
                        >
                            <h4 style={{ color: '#1b5e20', margin: 0 }}>
                                {category.category} {openCategory === idx ? "▲" : "▼"}
                            </h4>
                        </div>

                        {openCategory === idx && (
                            <div style={{ marginTop: '10px', background: 'white', padding: '15px', borderRadius: '8px', borderLeft: '5px solid #4caf50' }}>
                                {category.issues.map((issue, i) => (
                                    <div key={i} style={{ marginBottom: '15px', borderBottom: i !== category.issues.length - 1 ? '1px solid #eee' : 'none', paddingBottom: '10px' }}>
                                        <h5 style={{ margin: '0 0 5px 0', color: '#2e7d32' }}>{issue.disease}</h5>
                                        <p style={{ fontSize: '13px', margin: '2px 0' }}><strong>Reason:</strong> {issue.reason}</p>
                                        <p style={{ fontSize: '13px', margin: '2px 0' }}><strong>Cure:</strong> {issue.cure}</p>
                                        <p style={{ fontSize: '13px', color: '#1b5e20', fontWeight: 'bold' }}>🩺 Recommended: {issue.doctor}</p>
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
                backgroundColor: '#f1f8e9',
                border: '2px dashed #4caf50',
                padding: '20px',
                borderRadius: '12px'
            }}>
                <p style={{ fontWeight: 'bold', color: '#2e7d32', marginBottom: '10px' }}>🕒 Smart Pediatric Health Agent</p>
                <button
                    onClick={handleSetReminder}
                    style={{
                        background: 'linear-gradient(90deg, #4caf50, #2e7d32)',
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
                    + Set Reminder & Fetch Dosage
                </button>
            </div>

            {/* Back Navigation */}
            <button
                onClick={() => navigate('/dashboard')}
                style={{
                    marginTop: '30px',
                    width: '160px',
                    background: 'white',
                    color: '#2e7d32',
                    padding: '10px 20px',
                    border: '2px solid #2e7d32',
                    borderRadius: '50px',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                }}
            >
                ← Dashboard
            </button>

            {/* Chatbot integrated here */}
            <Chatbot />
        </div>
    );
};

export default ChildrenSector;