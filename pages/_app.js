import '@/app/styles/App.css';
import '@/app/styles/App.css';
import { useState, useRef, createContext, useEffect } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import CatAnimation from '@/app/components/CatAnimation';
import ScrollProgress from '@/app/components/ScrollProgress';

function MyApp({ Component, pageProps }) {
    console.log('MyApp is being used');


    return (
        <div>
            <Header />
            <ScrollProgress />
            <CatAnimation />
            <Component {...pageProps} />
            <Footer />
        </div>
    );
}

export default MyApp;