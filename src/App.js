import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import EmptySearchPage from './components/EmptySearchPage/EmptySearchPage'
import QueryResList from './components/QueryResList/QueryResList';
import ProductDetail from './components/ProductDetail/ProductDetail';
import './App.scss';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Layout />}>
            <Route index element={<EmptySearchPage />} />
            <Route path="/items" element={<QueryResList />} />
            <Route path="/items/:id" element={<ProductDetail />} />
          </Route>
        </Routes>
    </Router>
  );
}

export default App;