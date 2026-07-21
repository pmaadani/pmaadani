import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home';
import About from './pages/About';
import Photos from './pages/Photos';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/photos" element={<Photos />} />
      </Routes>
    </BrowserRouter>
  );
}