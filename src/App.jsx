import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import HomePage from './HomePage.jsx';
import ForYou from './components/ForYou.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/for-you" element={<ForYou />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
