# 🏁 MX Bikes Live Dashboard

A real-time dashboard for MX Bikes live timing data built with Vite + React + TailwindCSS 4.1.

## Features

- **Real-time data** - Updates every 2 seconds from your MX Bikes API
- **Comprehensive display** - Shows ALL available data:
  - Server information & connection status
  - Session details & weather conditions  
  - Live rider standings & timing data
  - Safety data (contacts, penalties, holeshots)
  - Driver status (DNS, RET, DSQ)
- **Beautiful UI** - Modern dark theme with MX Bikes branding
- **Responsive design** - Works on desktop, tablet, and mobile

## Setup

1. Make sure your MX Bikes API server is running at `http://localhost:8000`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser to `http://localhost:3000`

## API Requirements

This dashboard connects to your MX Bikes Live Timing API at:
- **API Endpoint**: `http://localhost:8000/servers/5121`
- **Auto-refresh**: Every 2 seconds
- **CORS**: Enabled for cross-origin requests

## Tech Stack

- **Vite** - Lightning fast build tool
- **React 18** - Modern React with hooks
- **TailwindCSS 4.1** - Latest utility-first CSS framework
- **Auto-refresh** - Real-time data updates

## Development

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Data Displayed

### Server Information
- Server name, version, location
- Player count and connection status
- Live data streaming status

### Session Details
- Track name and length
- Session type and state
- Weather conditions and temperature
- Event information

### Rider Data
- Live standings with positions
- Rider names and bike information
- Best and last lap times
- Current status (TRK, PIT, DNS, RET, DSQ)
- Lap counts and gaps

### Safety Metrics
- Contact/crash data with impact velocity
- Penalties (jumpstart, cutting, time penalties)
- Holeshot performance
- Driver status changes

Perfect for ELO rating systems and safety analysis! 🏆