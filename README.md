# Galore Avakin Community (GAC) App

The **GAC App** is an interactive roleplay ecosystem designed to simulate a full virtual society.  
It includes advanced economy systems, business and real estate management, education, and a community hub —  
all in a sleek, futuristic dashboard interface.  

This project is **front-end only** and runs entirely in the browser with `localStorage`.  
No backend setup is required.

---

## 🌟 Features

### Economy
- Bank accounts (deposit, withdraw, balance)
- Stock market simulation
- Persistent wallet per user

### Businesses
- Start and manage businesses
- Employee and revenue simulation
- Business list stored per user

### Real Estate
- Buy and manage residential or commercial properties
- Track property values
- Property cards with details

### Education
- Create and enroll in courses
- Course catalog for users
- Progress stored in localStorage

### Community
- Post updates to a shared feed
- Timeline-style layout with avatars
- Posts stored per user

### Admin Panel
- Seed demo data (events, businesses, posts, etc.)
- Clear all saved data
- JSON report of ecosystem (users, businesses, properties, courses, posts)

---

## 📂 Project Structure
gac-app/
│
├── index.html          # Main entry point (Dashboard + Sections)
├── style.css           # Custom theme (dark mode, responsive UI)
├── script.js           # Interactive logic (localStorage persistence)
│
├── assets/             # Static assets
│   ├── logo.svg
│   ├── icons/          # Section icons (economy, business, real estate, etc.)
│   └── images/         # Optional images (properties, UI backgrounds)
│
├── .gitignore          # Ignore system & dev environment files
└── README.md           # Project documentation (this file)
