import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import QueryResList from './components/QueryResList';
import ProductDetail from './components/ProductDetail';
import './App.scss';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Layout />}>
            <Route index element={<div>Search Page Content</div>} />
            <Route path="/items" element={<QueryResList />} />
            <Route path="/items/:id" element={<ProductDetail />} />
          </Route>
        </Routes>
    </Router>
  );
}

export default App;