import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import HomePage from './HomePage.jsx';
import ForYou from './components/ForYou.jsx';
import BookDetail from './components/BookDetail.jsx';
import Player from './components/Player.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/for-you" element={<ForYou />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/player/:id" element={<Player />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
