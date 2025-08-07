# Gully Cricket App

A fun, interactive gully cricket game built with React and Vite. Play quick matches, tournaments, IPL, or World Cup style series with custom or preset teams. Track points, player stats, and enjoy a smooth, mobile-friendly experience.

## Features

- **Game Modes:** Play single matches, IPL, World Cup, or custom tournaments.
- **Team Management:** Create your own teams or autofill with real/preset teams.
- **Player Stats:** Tracks runs, wickets, balls, and matches for each player.
- **Points Table:** View team standings, top batsmen, and top bowlers.
- **Progressive Web App:** Installable on mobile/desktop for offline play.
- **Responsive UI:** Optimized for both desktop and mobile devices.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/shriamanj/Gully-Cricket-React.git
   cd cricket-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```

4. **Open in your browser:**
   ```
   http://localhost:5173
   ```

## Project Structure

- `src/`
  - `components/` – UI components (TeamCard, PlayMatch, Points, etc.)
  - `pages/` – Main pages (Mode, TeamDetail, Playground, PointsTable, Navbar)
  - `mock/` – Sample data for teams and players
  - `assets/` – Icons and images
  - `utils/` – Utility functions
- `public/` – Static files, service worker, manifest
- `vite.config.js` – Vite configuration with PWA support
- `tailwind.config.js` – Tailwind CSS configuration

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build

## Customization

- **Add/Edit Teams:** Modify [`src/mock/data.js`](src/mock/data.js) for preset teams.
- **Change Logos/Icons:** Place images in [`src/assets/images/`](src/assets/images/) or [`src/assets/icons/`](src/assets/icons/).
- **Game Logic:** Core match logic is in [`src/components/PlayMatch.jsx`](src/components/PlayMatch.jsx).

## Progressive Web App

- Install the app on your device for offline play.
- Service worker and manifest are configured for PWA support.

## License

Aman Jain @ 2025

---

Built with ❤️ using React, Vite, and Tailwind CSS.
