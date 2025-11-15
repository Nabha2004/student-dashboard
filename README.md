# Student Portal Dashboard (React based) 

This project is a highly responsive, multi-page student dashboard designed for Shri Ramdeobaba College of Engineering and Management (RCOEM), specifically tailored for Nabha in the Information Technology branch.

The goal of this submission was to create a solution that is unique, complex, and highly informative, going far beyond a standard single-page template.

## Key Unique Features

- **Multi-Page Architecture**: Instead of a single crowded page, the dashboard is logically separated into four distinct sections for superior user experience and information hierarchy:
  - **Dashboard (/)**: Primary overview, featuring the Attendance Chart prominently at the top.
  - **Academics (/academics)**: Detailed CGPA history, credit status breakdown, and subject-wise performance in an interactive accordion view.
  - **Schedule (/schedule)**: Centralized view for Exams, Events, and Official Notices, including a minimalist Calendar visualization.
  - **Profile (/profile)**: Personal and institutional details.

- **Unique Layout & Visualization**:
  - The Attendance Chart Chart.js is the primary focal point of the dashboard, placed above the summary cards to prioritize the most critical metric.
  - All Upcoming Events and Notices are implemented as clickable interactive elements that navigate the user to the detailed Schedule page.

- **Modern Technology Stack**: Built using React and Tailwind CSS, ensuring a modular, maintainable, and highly aesthetic dark-mode design.

- **Full Responsiveness**: The layout dynamically adjusts using Flexbox and Grid, providing an optimal viewing experience on mobile devices, including a sticky, bottom navigation bar for touch-friendly access.

---

## Required Libraries (CDN/Import):

- **React**: Used for component-based UI.
- **Tailwind CSS**: Used for all styling and responsiveness.
- **Chart.js v4**: Used to render the dynamic Attendance and CGPA charts.

---

## Navigation:

Navigation is handled using simple client-side routing based on the URL hash #/academics, #/schedule, etc.), which works instantly without needing external routers.

---

## Getting Started

### Prerequisites

- Node.js and npm installed

### Installation

1. Clone the repository:

git clone https://github.com/Nabha2004/student-dashboard


cd student-dashboard

2. Install dependencies:

npm install

### Run the app

npm run dev



