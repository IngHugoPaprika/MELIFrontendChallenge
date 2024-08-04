import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa6";
import meliLogo from "../assets/meli-cut-logo.png"

function CategoryBreadcrumbs(props) {

    return (

        <div className="breadcrumbs-main-container">

            {props.categories.map((cat, index) => (

                <React.Fragment key={index}>

                    <p className={`breadcrumbs-category-name ${index === props.categories.length - 1 ? 'last' : ''}`}>
                        {cat.name}
                    </p>

                    {index < props.categories.length - 1 && (

                        <FaChevronRight
                            className="breadcrumbs-category-chevron"
                        />

                    )}

                </React.Fragment>

            ))}

        </div>

    );

}

export default CategoryBreadcrumbs;