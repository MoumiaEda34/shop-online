import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideNav from './components/Sidenav';
import CategoryDetails from './components/CategoryDetails';
import ProductDetails from './components/ProductDetails'; 
import SearchPanel from './components/SearchPanel';
import './App.css'
function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <SideNav />
        
        <div style={{ marginLeft: '260px', marginRight: '260px', padding: '20px', width: '100%' }}>
          <Routes>
            <Route path="/category/:name" element={<CategoryDetails />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            {/* Add other routes as needed */}
          </Routes>
        </div>

        <SearchPanel />
      </div>
    </Router>
  );
}

export default App;
