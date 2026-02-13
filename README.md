# The Ladder to the Heaven - Game Tính Lãi Suất

Educational game about compound interest and financial literacy.

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS + Tailwind CSS (using `@tailwindcss/postcss`)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Math Rendering**: [KaTeX](https://katex.org/)
- **Code Highlighting**: [Highlight.js](https://highlightjs.org/)

## Features

- **3-Panel Interface**:
  - **Left**: Interactive ladder tracking team positions.
  - **Center**: Question area with rich text, images, and math equations.
  - **Right**: Command center with scoreboard and countdown timer.
- **Game Mechanics**: Dice rolling, team-based progression, and compound interest calculations.
- **Dynamic Content**: Questions and stage info loaded from JSON data.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

To create a production build:
```bash
npm run build
```
The output will be in the `dist/` directory.

## Project Structure

- `src/components`: React components (Ladder, QuestionArea, CommandCenter).
- `src/hooks`: Custom hooks for game state management (`useGameState`).
- `src/data`: Game configuration, questions, and ladder positions.
- `public/`: Static assets (images, dice SVGs, etc.).
