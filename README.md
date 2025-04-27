# AI Safety Incident Dashboard

A m React application for tracking, reporting, and managing AI safety incidents. This dashboard provides a user-friendly interface to log safety concerns, filter incidents by severity, and track trends over time.

## 🚀 Features

- View, filter, and sort AI safety incidents
- Report new incidents with detailed information
- Filter incidents by severity (Low, Medium, High)
- Sort incidents by date (newest/oldest)
- Responsive design for all device sizes
- Interactive UI with animations and transitions

## 🛠️ Technologies

- **React** (v19.0.0)
- **Vite** (v6.3.1) - for fast development and building
- **TailwindCSS** (v4.1.4) - for styling
- **ESLint** (v9.22.0) - for code quality

## 📋 Prerequisites

- Node.js (v16.x or newer)
- npm or yarn

## 🔧 Installation

1. Clone the repository:
   
   git clone https://github.com/sumitkumar2005/AiSafety.git

2. Install dependencies:
   ```
   npm install
  
   ```

3. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
Safety/
├── public/            # Static assets
├── src/               # Source code
│   ├── components/    # React components
│   │   ├── Dashboard.jsx     # Main dashboard component
│   │   ├── Filters.jsx       # Filter controls
│   │   ├── IncidentForm.jsx  # Form for adding new incidents
│   │   └── IncidentItem.jsx  # Individual incident display
│   ├── data/          # Mock data
│   │   └── mockIncidents.js  # Sample incident data
│   ├── App.jsx        # Root component
│   ├── main.jsx       # Entry point
│   └── index.css      # Global styles
├── index.html         # HTML template
├── vite.config.js     # Vite configuration
├── package.json       # Dependencies and scripts
└── README.md          # This file
```

## 📝 Usage

### Viewing Incidents
- All incidents are displayed in a card format on the dashboard
- View detailed information for each incident including title, description, severity, and date

### Filtering and Sorting
- Use the filter controls to filter incidents by severity (All, Low, Medium, High)
- Sort incidents by date (newest first or oldest first)

### Reporting New Incidents
1. Click the "Report New Incident" button
2. Fill out the incident form with:
   - Title
   - Description
   - Severity level
   - Date of incident
3. Submit the form to add the incident to the dashboard

## 🔄 Development Workflow

### Development
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 👤 Author

- Made by Sumit Kumar Jha

