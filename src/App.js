import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import Create from './pages/create/Create';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Router>
  );
}

export default App;