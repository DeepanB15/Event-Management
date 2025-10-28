import React, { useState, useEffect, createContext, useContext } from 'react';
import { Calendar, MapPin, Users, LogIn, PlusCircle, Edit, Trash2, X, ArrowLeft, Search, Bell, LogOut } from 'lucide-react';
import './App.css';

const API_BASE = "http://localhost:8080/api";
const AppContext = createContext(null);

export default function App() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState(null);
  const [page, setPage] = useState('login');
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  const showNotification = (msg, type = "info") => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(null), 3000);
  };

  // Fetch events
  const fetchEvents = () => {
    fetch(`${API_BASE}/events`)
      .then(res => res.json())
      .then(setEvents)
      .catch(() => showNotification("⚠️ Failed to load events", "error"));
  };

  useEffect(() => {
    if (user) fetchEvents();
  }, [user]);

  const handleLogin = (email) => {
    setLoading(true);
    fetch(`${API_BASE}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then(res => {
        setLoading(false);
        if (!res.ok) throw new Error("Invalid Staff ID or Email");
        return res.json();
      })
      .then(data => {
        setUser(data);
        setPage("dashboard");
        showNotification("✅ Login successful!", "success");
      })
      .catch(() => showNotification("❌ Invalid Staff ID or Email", "error"));
  };

  const handleLogout = () => {
    setUser(null);
    setPage("login");
  };

  const handleRegister = (eventId) => {
    fetch(`${API_BASE}/users/register/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventId),
    })
      .then(res => res.json())
      .then(updatedUser => {
        setUser(updatedUser);
        showNotification("🎉 Registered successfully!", "success");
      })
      .catch(() => showNotification("⚠️ Registration failed", "error"));
  };

  const handleSaveEvent = (eventData) => {
    const method = editingEvent ? "PUT" : "POST";
    const url = editingEvent
      ? `${API_BASE}/events/${editingEvent.id}`
      : `${API_BASE}/events`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    })
      .then(res => res.json())
      .then(() => {
        showNotification(editingEvent ? "✏️ Event updated!" : "🎊 Event created!", "success");
        setEditingEvent(null);
        fetchEvents();
        setPage("dashboard");
      })
      .catch(() => showNotification("⚠️ Failed to save event", "error"));
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm("Delete this event?")) {
      fetch(`${API_BASE}/events/${id}`, { method: "DELETE" })
        .then(() => {
          setEvents(events.filter(e => e.id !== id));
          showNotification("🗑️ Event deleted!", "info");
        })
        .catch(() => showNotification("⚠️ Failed to delete event", "error"));
    }
  };

  if (page === "login") return (
    <LoginPage onLogin={handleLogin} message={message} loading={loading} />
  );

  return (
    <AppContext.Provider value={{ user, events, handleRegister, handleDeleteEvent, setEditingEvent, fetchEvents }}>
      <div className="app">
        <Header onLogout={handleLogout} />
        <main>
          {page === 'dashboard' && <Dashboard onNavigate={setPage} />}
          {page === 'create' && <CreateEditEvent onSave={handleSaveEvent} />}
        </main>
        {editingEvent && (
          <Modal onClose={() => setEditingEvent(null)}>
            <CreateEditEvent onSave={handleSaveEvent} eventToEdit={editingEvent} isModal />
          </Modal>
        )}
        {message && <Notification msg={message.text} type={message.type} />}
      </div>
    </AppContext.Provider>
  );
}

function Header({ onLogout }) {
  const { user } = useContext(AppContext);
  return (
    <header className="header">
      <div className="header-left">
        <Calendar className="icon" />
        <h1>Campus Events</h1>
      </div>
      <div className="header-right">
        <Bell className="icon" />
        <span>Welcome, {user.name} ({user.role})</span>
        <button onClick={onLogout}><LogOut className="icon" /> Logout</button>
      </div>
    </header>
  );
}

function LoginPage({ onLogin, message, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    onLogin(email);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <Calendar className="login-icon" />
        <h2>Event Platform Login</h2>
        <input name="email" placeholder="Enter Staff or Student Email" required />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Sign In"}
        </button>
        {message && <p className="error">{message.text}</p>}
      </form>
    </div>
  );
}

function Dashboard({ onNavigate }) {
  const { user, events, handleDeleteEvent, setEditingEvent } = useContext(AppContext);
  const isStaff = user.role === "staff";

  return (
    <div>
      <div className="top-bar">
        <h2>Upcoming Events</h2>
        {isStaff && <button onClick={() => onNavigate("create")}><PlusCircle /> Create Event</button>}
      </div>
      <div className="event-grid">
        {events.map(event => (
          <EventCard key={event.id} event={event} isStaff={isStaff} handleDeleteEvent={handleDeleteEvent} setEditingEvent={setEditingEvent} />
        ))}
      </div>
    </div>
  );
}

function EventCard({ event, isStaff, handleDeleteEvent, setEditingEvent }) {
  const { user, handleRegister } = useContext(AppContext);
  const isRegistered = user.registeredEvents?.includes(event.id);

  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p><Calendar /> {event.date}</p>
      <p><MapPin /> {event.location}</p>
      <p><Users /> {event.registered}/{event.spots} registered</p>

      {isStaff ? (
        <div className="card-buttons">
          <button onClick={() => setEditingEvent(event)}><Edit /> Edit</button>
          <button onClick={() => handleDeleteEvent(event.id)}><Trash2 /> Delete</button>
        </div>
      ) : (
        <button
          onClick={() => handleRegister(event.id)}
          className={isRegistered ? "registered" : "register"}
        >
          {isRegistered ? "Registered" : "Register"}
        </button>
      )}
    </div>
  );
}

function CreateEditEvent({ onSave, eventToEdit, isModal }) {
  const [formData, setFormData] = useState(eventToEdit || { title: "", date: "", location: "", spots: 50, category: "Workshop" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={`event-form ${isModal ? '' : 'page-form'}`}>
      <h2>{eventToEdit ? "Edit Event" : "Create Event"}</h2>
      <input name="title" placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
      <input name="date" placeholder="Date & Time" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} required />
      <input name="location" placeholder="Location" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} required />
      <input type="number" name="spots" placeholder="Spots" value={formData.spots} onChange={e => setFormData({ ...formData, spots: e.target.value })} required />
      <select name="category" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
        <option>Workshop</option>
        <option>Expo</option>
        <option>Competition</option>
        <option>Networking</option>
      </select>
      <button type="submit">{eventToEdit ? "Save Changes" : "Publish Event"}</button>
    </form>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="modal-bg">
      <div className="modal">
        <button className="close-btn" onClick={onClose}><X /></button>
        {children}
      </div>
    </div>
  );
}

function Notification({ msg, type }) {
  return <div className={`notif ${type}`}>{msg}</div>;
}
