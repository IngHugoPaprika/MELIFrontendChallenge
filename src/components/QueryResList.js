import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import CategoryBreadcrumbs from './CategoryBreadcrumbs';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function QueryResList() {

    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const query = useQuery().get('search');

    const formatter = new Intl.NumberFormat('es-AR', {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0
    })

    useEffect(() => {

        axios.get(`/api/items?q=${query}`)

            .then(response => {

                setCategories(response.data.categories);

                setItems(response.data.items);

            });

    }, [query]);

    return (

        <div className="products-content-container">

            <CategoryBreadcrumbs 
            
                categories={categories}

            />

            <div className="products-content-card">

                <ol className="products-list-container">

                    {items.map((item, index) => (

                        <li key={index} className="products-list-item">

                            <Link
                                to={`/items/${item.id}`}
                                className="product-list-nav"
                            >

                                <img
                                    className="product-list-image"
                                    src={item.picture}
                                    alt={item.title}
                                />

                                <div className="product-list-info">

                                    <p
                                        className="product-list-price"
                                    >
                                        {formatter.format(item.price.amount)}
                                    </p>

                                    <h2
                                        className="product-list-title"
                                    >
                                        {item.title}
                                    </h2>

                                </div>

                            </Link>

                        </li>

                    ))}

                </ol>

            </div>

        </div>

    );

}

export default QueryResList;