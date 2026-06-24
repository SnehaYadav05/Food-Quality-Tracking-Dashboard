Hi! I'm Sneha, and I built this lightweight dashboard as a rapid prototype for my FSSAI internship submission. My goal was to create a clean, working interface that functions completely offline by saving data directly to the browser.
 
 Key Features
 Interactive Dashboard: Real-time tracking of registered vendors, completed inspections, and active consumer complaints.

Vendor Management: Register food business operators with details including business name, FSSAI license number, contact info, and food category.

Inspection Logging: Log quality status (Pass/Warning/Fail) and inspector remarks. The system intelligently links inspections only to pre-registered vendors.

Complaint Tracking: File, view, and resolve consumer complaints dynamically.

Instant Data Persistence: Utilizes browser localStorage to save all data instantly. The application can be refreshed or closed without losing any records, making it perfect for offline or low-connectivity environments.

Technology Stack
Frontend: HTML5, CSS3

Logic & Data Storage: Vanilla JavaScript (ES6+), Web Storage API (localStorage)

Framework/Styling: Bootstrap 5 (for responsive, mobile-first design)

File Structure
The project is structured into three clean, enterprise-standard files for maximum readability and maintainability:

index.html - Contains the core structure, navigation, and form layouts.

style.css - Custom styling, animations, and aesthetic enhancements.

script.js - Handles all application logic, DOM manipulation, form submissions, and local storage data management.
