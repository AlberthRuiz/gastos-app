import { createRoot } from 'react-dom/client'
import './index.css'
import App  from './App';
import Demo from './pages/demo';
import { BrowserRouter, Route, Routes } from "react-router";

createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
     <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Demo" element={<Demo />} />
    </Routes>
    
  </BrowserRouter>

)
