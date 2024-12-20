import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JewelryList from './components/JewelryList';
import ProductDetail from './components/ProductDetail';
import ProductList from './components/ProductList';
import AllCategories from './components/AllCategories';
import Navigation from './components/Navigation';
import CategoryDetails from './components/CategoryDetails';
import Footer from './components/Footer';
import './App.css';
function App() {
    return (
        <Router>
            <div className="App">
                <Navigation />
                <Routes>
                    <Route path="/" element={<AllCategories />} />
                    <Route path="/jewelry" element={<JewelryList />} />
                    <Route path="/product-list" element={<ProductList />} />
                    <Route path="/product/:productId" element={<ProductDetail />} />
                    <Route path="/category/:categoryName" element={<CategoryDetails />} />
                    {/* <Route path="/category" element={<AllCategories />} /> */}
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
