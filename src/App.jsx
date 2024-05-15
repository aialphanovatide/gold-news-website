import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import NewsDetail from './components/newsDetail/NewsDetail';
import './App.css';

function App() {
  return (
    <Router>
      {/* Elimina el padding y los bordes aquí */}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news-detail" element={<NewsDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
