import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import CategoryBreadcrumbs from '../CategoryBreadcrumbs/CategoryBreadcrumbs';
import Loader from '../utils/Loader';
import NoResultsPage from '../utils/NoResultsPage';
import { formatter } from '../utils/Formatter';
import shippingIcon from '../../assets/truck.png';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function QueryResList() {

    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const query = useQuery().get('search');

    useEffect(() => {

        setLoading(true);
        setItems([]);
        setCategories([]);

        axios.get(`/api/items?q=${query}`)

            .then(response => {

                setCategories(response.data.categories);

                setItems(response.data.items);

                setLoading(false);

            });

    }, [query]);

    return (

        <div className="products-content-container">

            {loading && (

                <Loader

                    message={"Buscando productos"}

                />

            )}

            {categories.length > 0 && (

                <CategoryBreadcrumbs

                    categories={categories}

                />

            )}

            <div className="products-content-card">

                {(items.length > 0) ? (

                    <ol className="products-list-container">

                        {items.map((item, index) => (

                            <li key={index} className="products-list-item">

                                <Link
                                    to={`/items/${item.id}`}
                                    className="product-list-nav"
                                >

                                    <div className="product-image-container">

                                        <img
                                            className="product-list-image"
                                            src={item.picture}
                                            alt={item.title}
                                        />

                                    </div>

                                    <div className="product-list-info">

                                        <div className="product-list-subcontainer">

                                            <div className="product-list-shipping">

                                                <p
                                                    className="product-list-price"
                                                >
                                                    {formatter.format(item.price.amount)}

                                                </p>

                                                {item.free_shipping && (

                                                    <div className="shipping-icon-container">

                                                        <img src={shippingIcon} className="shipping-icon" alt="Shipping truck logo" />

                                                    </div>

                                                )}

                                            </div>

                                            <p
                                                className="product-list-address"
                                            >
                                                {item.seller_address}
                                            </p>

                                        </div>

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

                ) : !loading && (

                    <NoResultsPage

                        type={"not_found"}

                    />

                )}


            </div>

        </div>

    );

}

export default QueryResList;