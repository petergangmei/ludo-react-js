import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InstructionsPage from './pages/InstructionsPage';
import GameController from './components/GameController';
// Remove the import for App.css as we're using Tailwind CSS now
// import './App.css'

/**
 * App Component
 * 
 * This is the main component that sets up routing for the Ludo King application.
 * It defines routes for the home page, game board, and instructions page.
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GameController />} />
        <Route path="/instructions" element={<InstructionsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
