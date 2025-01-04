"use client";

import React from "react";
import "@/app/_styles/NotFound.css";

const NotFoundPage = () => {

    return (
        <div className="NotFoundPage">
            <h1 className="NotFound">Not Found</h1>
            <p className="NotFoundText">The page you are looking for does not exist. Take a Cat!</p>
            <div id="marco">
                <div id="cielo"></div>
                <div id="luna"></div>
                <div id="gato"></div>
                <div id="muro"></div>
                <div id="edificios"></div>
            </div>
            <p className="FindersKeepers"> Art by Eva (https://codepen.io/SoyEva/pen/LRjWze)</p>
        </div>
    );
};

export default NotFoundPage;