"use client";

import React from "react";

const NotFoundPage = () => {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center'
        }}>
            <h1>Not Found</h1>
            <p>The page you are looking for does not exist. Take a Cat!</p>
            <img src="/assets/img/404.jpg" alt="Image of a Cat saying 404 Error" style={{width: '60%', height: '60%'}}/>
        </div>
    );
};

export default NotFoundPage;