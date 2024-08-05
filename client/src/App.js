import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import EmptySearchPage from './components/EmptySearchPage/EmptySearchPage'
import QueryResList from './components/QueryResList/QueryResList';
import ProductDetail from './components/ProductDetail/ProductDetail';
import './App.scss';

// Componente principal de la aplicación
function App() {

  return (

    <Router>

      <Routes>

        {/* Definición de estructura de rutas */}
        <Route path="/" element={<Layout />}>

          {/* Ruta principal para la caja de búsqueda y el home */}
          <Route index element={<EmptySearchPage />} />

          {/* Ruta para ver la lista de resultados */}
          <Route path="/items" element={<QueryResList />} />

          {/* Ruta para ver el detalle del producto seleccionado */}
          <Route path="/items/:id" element={<ProductDetail />} />

        </Route>

      </Routes>

    </Router>

  );

}

export default App;