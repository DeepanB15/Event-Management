🎓 Event Management System

A college event management web application built using React (frontend) and Spring Boot + MongoDB (backend).
This system allows students to browse and register for departmental events, while staff can create, manage, and monitor events with real-time updates.

🚀 Features
👨‍🎓 Student Portal

View all available events by department.

Register for upcoming events.

Receive instant success notifications after registration.

Track registered events and event status.

👩‍🏫 Staff Portal

Secure staff login.

Create, edit, and delete events.

View attendee details and registration counts.

Manage event capacities and departments.

🧩 Core Functionalities

Dynamic dashboard after login (Student / Staff view).

Real-time registration updates synced with MongoDB.

Modern UI inspired by campus dashboard systems.

Notification system for login and registration success.

🏗️ Tech Stack
Layer	Technology Used
Frontend	React.js, Axios, CSS3
Backend	Spring Boot
Database	MongoDB (connected through Spring Data)
Build Tool	Maven
Version Control	Git + GitHub
🗂️ Project Structure
Event-Management/
│
├── backend/
│   └── events/
│       ├── src/main/java/com/example/events/
│       │   ├── controller/
│       │   ├── model/
│       │   ├── repository/
│       │   └── BackendApplication.java
│       └── src/main/resources/application.properties
│
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js
        ├── App.css
        ├── index.js
        ├── index.css
        ├── reportWebVitals.js
        └── setupTests.js

⚙️ Setup Instructions
🧩 Backend Setup (Spring Boot)

Open the backend folder in your IDE (e.g., IntelliJ / VS Code / Eclipse).

Make sure MongoDB is running locally on port 27017.

Update application.properties:

spring.data.mongodb.database=event_db
spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
server.port=8080


Run the backend:

mvn spring-boot:run


Backend will start at: http://localhost:8080

💻 Frontend Setup (React)

Open the frontend folder:

cd frontend


Install dependencies:

npm install


Start the development server:

npm start


The app will run on http://localhost:3000.

🔗 API Endpoints
👨‍🏫 User Controller
Method	Endpoint	Description
POST	/user/login	Login as student or staff
PUT	/user/register/{id}	Register a student for an event
📅 Event Controller
Method	Endpoint	Description
POST	/events	Create new event
PUT	/events/{id}	Update existing event
GET	/events	Fetch all events
DELETE	/events/{id}	Delete an event
🧠 Key Design Highlights

Modern dashboard UI built entirely with React + CSS.

State managed via React hooks and Axios API calls.

Staff and student interfaces unified under one responsive layout.

MongoDB integration for event persistence and user registrations.

📸 Sample Output

🏁 Conclusion

This Event Management System provides a seamless digital experience for managing campus events, from event creation to student participation tracking, ensuring smooth communication and organization across departments.
