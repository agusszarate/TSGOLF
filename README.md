# 3D Golf Game

A 3D mini golf game built with React, Three.js, and React Three Fiber.

## 📋 Overview

This project is a browser-based 3D golf game where players can navigate through different levels, aim their shots, and try to get the ball in the hole with as few strokes as possible. The game features:

-   3D physics-based gameplay using @react-three/cannon
-   Multiple golf levels with varying difficulty
-   Interactive controls for aiming and power adjustment
-   Par scoring system
-   Obstacles and terrain challenges

## 🚀 Technologies Used

-   React 18
-   TypeScript
-   Three.js
-   React Three Fiber
-   React Three Cannon (physics)
-   React Three Drei (3D helpers)
-   Tailwind CSS
-   Vite

## 🎮 How to Play

1. **Aim**: Use your mouse to aim the direction of the shot
2. **Power**: Hold down the "Hold to Charge Shot" button to build power
3. **Release**: Let go of the button to shoot the ball
4. **Goal**: Get the ball into the hole with as few strokes as possible

## 💻 Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn

### Installation

1. Clone this repository

```bash
git clone <repository-url>
cd Golf
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/         # React components
│   ├── Arrow.tsx       # Shot direction indicator
│   ├── Ball.tsx        # Golf ball with physics
│   ├── Controls.tsx    # Game controls UI
│   └── Course.tsx      # Course layout with obstacles
├── types/              # TypeScript type definitions
│   └── game.ts         # Game state and level types
└── App.tsx             # Main game component
```

## 🎯 Game Features

-   **Physics-Based Gameplay**: Realistic ball movement and collisions
-   **Level System**: Progress through multiple course designs
-   **Interactive Controls**: Intuitive mouse-based aiming and power system
-   **Visual Feedback**: Arrow indicator shows shot direction and power

## 🛠️ Development

### Build for production

```bash
npm run build
# or
yarn build
```

### Preview production build

```bash
npm run preview
# or
yarn preview
```

## 🔮 Future Enhancements

-   More levels with varying terrain
-   Multiplayer support
-   Sound effects and background music
-   Mobile support with touch controls
-   High score system

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
