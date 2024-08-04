import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CategoryBreadcrumbs from './CategoryBreadcrumbs';

function ProductDetail() {
  
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {

    axios.get(`/api/items/${id}`)
      .then(response => {
      
        setProduct(response.data.item);
        setCategories(response.data.categories);
      
      });
  
    }, [id]);

  if (!product) return <div>Cargando...</div>;

  return (

    <div className="products-content-container">

      <CategoryBreadcrumbs

        categories={categories}

      />

      <div className="products-content-card">

        <h1>{product.title}</h1>
        <img src={product.picture} alt={product.title} />
        <p>{product.price.amount} {product.price.currency}</p>
        <p>{product.condition}</p>
        <p>{product.sold_quantity} vendidos</p>
        <p>{product.description}</p>

      </div>

    </div>

  );

}

export default ProductDetail;