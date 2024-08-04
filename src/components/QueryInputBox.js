import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PiMagnifyingGlassBold } from "react-icons/pi";
import meliLogo from "../assets/meli-cut-logo.png"

function QueryInputBox() {
    
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/items?search=${query}`);
    };

    return (
        <header className="query-input-container">
            <form onSubmit={handleSubmit} className="query-input-form">
                <a href="/" style={{ display: "flex" }}>
                    <img src={meliLogo} className="meli-logo-asset" alt="Mecado Libre logo" href="/" />
                </a>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Nunca dejes de buscar"
                    className="query-input-search"
                />
                <button
                    type="submit"
                    className="query-input-button"
                >
                    <PiMagnifyingGlassBold className="query-input-icon" />
                </button>
            </form>
        </header>
    );
}

export default QueryInputBox;