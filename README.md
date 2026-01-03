MEDICATION SMART AI

Project Overview
Medication Smart AI is an intelligent healthcare assistant application designed to provide end-to-end medical support - starting from secure user authentication to personalized medication reminders, natural remedy suggestions, and automatic doctor appointment booking based on the severity of the user's condition.

The system uses AI, NLP, and smart decision logic to deliver personalized healthcare guidance for different age and gender groups.

Problem Statement

Many people face difficulties such as:

Forgetting to take medicines on time
Not knowing which doctor to consult
Delayed medical attention during severe pain or cramps
Lack of personalized healthcare assistance

Medication Smart AI provides a smart, automated, and user-friendly healthcare solution.

🔐 Step 1: Login & Registration Module

   Features
    User registration:
	    Name
	    Age
	    Gender
	    Email
	    Password

    Secure login authentication
    Password hashing
    Input validation
    Token-based authentication (JWT)

 Objective
    To ensure user privacy, security, and personalized access.

👨‍👩‍👧‍👦 Step 2: User Category & Medical Selection

  After successful login, users are categorized into:
  👶 Children
	👩 Women
	👨 Men
	👴 Old Age

  For Each Category
	Common diseases
	Recommended medications
	Available doctors based on user location
	Nearby hospitals or clinics

	Example
	  Category: Women
	  Disease: PCOS
	  Medication: Metformin
	  Doctor: Gynecologist (Nearby)

🚨 Step 3: Smart Alerts & Automatic Doctor Appointment

   Alert System
     If the user reports severe pain or cramps:
	   Suggests natural remedies
	   Recommends immediate medication

   Follow-Up Interaction
     After a fixed time interval, the app asks:

	Are you feeling better?
	✔ Yes   ❌ No   🆘 Need Help

  Automatic Booking
  If the user selects No or Need Help:
	Finds nearest hospital
	Checks doctor availability
	Automatically books appointment
	Displays:

	    Hospital name
	    Appointment time
	    Journey time

⏰ Step 4: Medication Reminder System
  Features
	Medicine reminders for a specific period
	Dosage and frequency tracking
	In-app notifications
	Structured reminder generation

      Sample Reminder JSON
	{
	  "medicine": "Ibuprofen",
	  "dosage": "400 mg",
	  "frequency": "Twice a day",
	  "timings": ["08:00 AM", "08:00 PM"],
	  "duration_days": 5
	}

🧠 AI
Label-aware medication guidance
Severity-based decision logic
Retrieval-Augmented Generation (RAG)

🛠️ Technology Stack

    Frontend: React 
    Backend: Node.js, FastAPI
    AI: LangChain, LLMs
    Database: MongoDB
    Authentication: JWT

🗂️ Project Structure

frontend/
backend/
data/
models/
README.md
requirements.txt

📈 Expected Outcomes

   Improved medication adherence
   Faster emergency response
   Personalized healthcare experience
   Reduced manual hospital visits

⚠️ Disclaimer

This project is developed for educational purposes only and does not replace professional medical advice.
