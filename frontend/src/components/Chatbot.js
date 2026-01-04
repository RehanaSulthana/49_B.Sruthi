

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function Chatbot() {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [checkInActive, setCheckInActive] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleAgentTrigger = (event) => {
//       // Pulling details from the custom event (fetched from open-source data)
//       const { item, prescription, instructions, sideEffects, source } = event.detail;

//       setOpen(true);

//       const initialMsgs = [
//         { type: "bot", text: `🔍 MediSmart AI: Fetched data for **${item}**` },
//         { type: "bot", text: `🌐 **Source:** ${source}` },
//         // { type: "bot", text: `💊 **Dosage:** ${prescription}` },
//         { type: "bot", text: `💡 **Instructions:** ${instructions || "Follow standard medical guide."}` },
//         { type: "bot", text: `⚠️ **Side Effects:** ${sideEffects || "Consult doctor if unusual symptoms occur."}` },
//         { type: "bot", text: `✅ Reminder is active. I will check on you in 5 minutes.` }
//       ];
      
//       setMessages((prev) => [...prev, ...initialMsgs]);

//       // Timer for 5-minute Agent Check-in
//       setTimeout(() => {
//         setCheckInActive(true); 
//         setMessages((prev) => [
//           ...prev,
//           {
//             type: "bot",
//             text: `🤖 **AGENT CHECK-IN:** It has been 5 minutes since your ${item} reminder. Are you feeling well now? (Yes/No)`,
//           },
//         ]);
//       }, 300000); 
//     };

//     window.addEventListener("activateChatbotAgent", handleAgentTrigger);
//     return () => window.removeEventListener("activateChatbotAgent", handleAgentTrigger);
//   }, []);

//   const handleSend = () => {
//     if (!input.trim()) return;

//     const userText = input.toLowerCase();
//     setMessages((prev) => [...prev, { type: "user", text: input }]);

//     // 1. SERIOUS CONDITION DETECTOR (Priority Logic)
//     const seriousKeywords = ["serious", "bad", "hurts", "emergency", "not ok", "suffering", "pain", "bleeding", "dizzy"];
//     const isSerious = seriousKeywords.some(word => userText.includes(word));

//     if (isSerious) {
//         setMessages((prev) => [
//             ...prev, 
//             { type: "bot", text: "🚨 **URGENT ALERT:** Based on your description, your health is a priority." },
//             { type: "bot", text: "Please do not wait. I strongly suggest you meet a doctor or visit the nearest hospital immediately." },
//             { type: "bot", text: "📅 [Click here to Book an Urgent Appointment]" }
//         ]);
//         setCheckInActive(false); // Disable normal check-in flow as this is an emergency
//     } 
    
//     // 2. LOGIC FOR THE 5-MINUTE CHECK-IN RESPONSE
//     else if (checkInActive) {
//         if (userText.includes("no") || userText.includes("not ok") || userText.includes("still")) {
//             setMessages((prev) => [...prev, { 
//                 type: "bot", 
//                 text: "⚠️ It seems symptoms are persisting. I suggest booking an appointment with a specialist." 
//             }]);
            
//             setTimeout(() => {
//                 setMessages((prev) => [...prev, { 
//                     type: "bot", 
//                     text: "📅 Would you like to go to the Booking page? [Click here to Book Appointment]" 
//                 }]);
//             }, 1000);
            
//             setCheckInActive(false); 
//         } else if (userText.includes("yes") || userText.includes("fine") || userText.includes("ok")) {
//             setMessages((prev) => [...prev, { 
//                 type: "bot", 
//                 text: "✅ Glad to hear! Continue resting. I am still monitoring your profile." 
//             }]);
//             setCheckInActive(false);
//         }
//     } 
    
//     // 3. GENERIC CHATBOT RESPONSE
//     else {
//         setTimeout(() => {
//             setMessages((prev) => [...prev, { 
//                 type: "bot", 
//                 text: "MediSmart AI: I have recorded your message. Please let me know if your condition changes or if you feel any serious discomfort." 
//             }]);
//         }, 1000);
//     }

//     setInput("");
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") handleSend();
//   };

//   // Function to handle the click on the Booking links inside the chat
//   const handleMessageClick = (text) => {
//       if (text.includes("[Click here")) {
//           setOpen(false);
//           navigate("/booking");
//       }
//   };

//   return (
//     <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}>
//       {open && (
//         <div style={{ width: "300px", height: "450px", background: "#fff", border: "1px solid #ccc", borderRadius: "12px", display: "flex", flexDirection: "column", boxShadow: "0 8px 24px rgba(0,0,0,0.2)", padding: "10px" }}>
          
//           {/* Chat Header */}
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee", paddingBottom: "5px" }}>
//               <h4 style={{ margin: 0, color: "#2e7d32" }}>MediSmart AI Agent</h4>
//               <button onClick={() => setOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: "16px" }}>✕</button>
//           </div>

//           {/* Messages Area */}
//           <div style={{ flex: 1, overflowY: "auto", margin: "10px 0" }}>
//             {messages.map((msg, idx) => (
//               <div key={idx} style={{ textAlign: msg.type === "user" ? "right" : "left", margin: "10px 0" }}>
//                 <span 
//                     onClick={() => handleMessageClick(msg.text)}
//                     style={{ 
//                         display: "inline-block", padding: "8px 12px", borderRadius: "15px", 
//                         background: msg.type === "user" ? "#007bff" : msg.text.includes("🚨") ? "#ffebee" : "#f1f8e9", 
//                         color: msg.type === "user" ? "#fff" : msg.text.includes("🚨") ? "#c62828" : "#1b5e20", 
//                         fontSize: "13px", maxWidth: "85%",
//                         cursor: msg.text.includes("[Click here") ? "pointer" : "default",
//                         textDecoration: msg.text.includes("[Click here") ? "underline" : "none",
//                         fontWeight: msg.text.includes("🚨") ? "bold" : "normal"
//                     }}
//                 >
//                   {msg.text}
//                 </span>
//               </div>
//             ))}
//           </div>

//           {/* Input Box */}
//           <div style={{ display: "flex", gap: "5px", borderTop: "1px solid #eee", paddingTop: "10px" }}>
//             <input 
//                 type="text" 
//                 placeholder="Type 'Pain' if suffering..." 
//                 value={input} 
//                 onChange={(e) => setInput(e.target.value)} 
//                 onKeyPress={handleKeyPress} 
//                 style={{ flex: 1, padding: "8px", borderRadius: "20px", border: "1px solid #ddd", fontSize: "12px", outline: "none" }} 
//             />
//             <button onClick={handleSend} style={{ color: "#007bff", background: "none", border: "none", cursor: "pointer", fontSize: "20px" }}>➤</button>
//           </div>
//         </div>
//       )}
      
//       {/* Toggle Button */}
//       <button 
//         onClick={() => setOpen(!open)} 
//         style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#2e7d32", color: "#fff", border: "none", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.3)", fontSize: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}
//       >
//         💬
//       </button>
//     </div>
//   );
// }

// export default Chatbot;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [checkInActive, setCheckInActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAgentTrigger = (event) => {
      const { item, prescription, instructions, sideEffects, source } = event.detail;
      setOpen(true);

      const initialMsgs = [
        { type: "bot", text: `🔍 MediSmart AI: Fetched data for **${item}**` },
        { type: "bot", text: `🌐 **Source:** ${source}` },
        { type: "bot", text: `💡 **Instructions:** ${instructions || "Follow standard medical guide."}` },
        { type: "bot", text: `⚠️ **Side Effects:** ${sideEffects || "Consult doctor if unusual symptoms occur."}` },
        { type: "bot", text: `✅ Reminder is active. I will check on you in 5 minutes.` }
      ];
      
      setMessages((prev) => [...prev, ...initialMsgs]);

      setTimeout(() => {
        setCheckInActive(true); 
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: `🤖 **AGENT CHECK-IN:** It has been 5 minutes since your ${item} reminder. Are you feeling well now? (Yes/No)`,
          },
        ]);
      }, 300000); 
    };

    window.addEventListener("activateChatbotAgent", handleAgentTrigger);
    return () => window.removeEventListener("activateChatbotAgent", handleAgentTrigger);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input.toLowerCase();
    setMessages((prev) => [...prev, { type: "user", text: input }]);

    // 1. SERIOUS CONDITION DETECTOR
    const seriousKeywords = ["serious", "bad", "hurts", "emergency", "not ok", "suffering", "pain", "bleeding", "dizzy"];
    const isSerious = seriousKeywords.some(word => userText.includes(word));

    if (isSerious) {
        const emergencyMsgs = [
            { type: "bot", text: "🚨 **URGENT ALERT:** Your symptoms sound serious. Your health is our priority." },
            { type: "bot", text: "🏥 **Immediate Advice:** Please visit the nearest Emergency Room or General Hospital immediately." },
            { type: "bot", text: "📍 [Find Nearest Hospitals on Google Maps](https://www.google.com/maps/search/hospitals+near+me/)" },
            { type: "bot", text: "👨‍⚕️ [Find Medical Specialists near me](https://www.google.com/maps/search/medical+specialists+near+me/)" },
            { type: "bot", text: "📅 [Click here to Book an Urgent Appointment with our doctors]" }
        ];
        
        setMessages((prev) => [...prev, ...emergencyMsgs]);
        setCheckInActive(false); 
    } 
    
    // 2. CHECK-IN LOGIC
    else if (checkInActive) {
        if (userText.includes("no") || userText.includes("not ok") || userText.includes("still")) {
            setMessages((prev) => [
                ...prev, 
                { type: "bot", text: "⚠️ Symptoms are persisting. I recommend professional consultation." },
                { type: "bot", text: "📍 [View Nearby Hospitals](https://www.google.com/maps/search/hospitals+near+me/)" },
                { type: "bot", text: "📅 [Click here to Book Appointment]" }
            ]);
            setCheckInActive(false); 
        } else {
            setMessages((prev) => [...prev, { type: "bot", text: "✅ Glad to hear! Continue resting." }]);
            setCheckInActive(false);
        }
    } 
    else {
        setTimeout(() => {
            setMessages((prev) => [...prev, { type: "bot", text: "MediSmart AI: Message recorded. Let me know if you feel any serious discomfort." }]);
        }, 1000);
    }

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const handleMessageClick = (text) => {
      // Check if it's a link to your internal booking page
      if (text.includes("[Click here to Book")) {
          setOpen(false);
          navigate("/booking");
      } 
      // Handle external Google Maps links
      else if (text.includes("https://")) {
          const urlMatch = text.match(/\((https?:\/\/[^\s)]+)\)/);
          if (urlMatch) {
              window.open(urlMatch[1], "_blank");
          }
      }
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}>
      {open && (
        <div style={{ width: "320px", height: "480px", background: "#fff", border: "1px solid #ccc", borderRadius: "12px", display: "flex", flexDirection: "column", boxShadow: "0 8px 24px rgba(0,0,0,0.2)", padding: "10px" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee", paddingBottom: "5px" }}>
              <h4 style={{ margin: 0, color: "#2e7d32" }}>MediSmart AI Agent</h4>
              <button onClick={() => setOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: "16px" }}>✕</button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", margin: "10px 0" }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ textAlign: msg.type === "user" ? "right" : "left", margin: "10px 0" }}>
                <span 
                    onClick={() => handleMessageClick(msg.text)}
                    style={{ 
                        display: "inline-block", padding: "8px 12px", borderRadius: "15px", 
                        background: msg.type === "user" ? "#007bff" : msg.text.includes("🚨") ? "#ffebee" : "#f1f8e9", 
                        color: msg.type === "user" ? "#fff" : msg.text.includes("🚨") ? "#c62828" : "#1b5e20", 
                        fontSize: "12px", maxWidth: "85%",
                        cursor: msg.text.includes("[") ? "pointer" : "default",
                        textDecoration: msg.text.includes("[") ? "underline" : "none",
                        fontWeight: msg.text.includes("🚨") ? "bold" : "normal",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                    }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "5px", borderTop: "1px solid #eee", paddingTop: "10px" }}>
            <input 
                type="text" 
                placeholder="Type 'Serious pain' to find help..." 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyPress={handleKeyPress} 
                style={{ flex: 1, padding: "8px", borderRadius: "20px", border: "1px solid #ddd", fontSize: "12px", outline: "none" }} 
            />
            <button onClick={handleSend} style={{ color: "#007bff", background: "none", border: "none", cursor: "pointer", fontSize: "20px" }}>➤</button>
          </div>
        </div>
      )}
      
      <button 
        onClick={() => setOpen(!open)} 
        style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#2e7d32", color: "#fff", border: "none", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.3)", fontSize: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        💬
      </button>
    </div>
  );
}

export default Chatbot;