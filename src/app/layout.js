import Header from '@/app/_components/Header';
import Footer from '@/app/_components/Footer';
import ScrollProgress from '@/app/_components/ScrollProgress';
import { SpeedInsights } from "@vercel/speed-insights/next"


import '@/app/_styles/generalOrder.css';
import '@/app/globals.css';
import CatAnimation from "@/app/_components/CatAnimation";
import React from "react";

function Layout({ children }) {
    return (
        <html lang="en">
        <body>
        <CatAnimation numberOfCats={25}/>
        <div className="website">
            <Header className="header" />
            <ScrollProgress />
            <div className="spacer header-spacer" />
            <div className="pages">
                {children}
                <SpeedInsights />
            </div>
            <div className="spacer footer-spacer" />
            <Footer className="footer" />
        </div>
        </body>
        </html>
    );
}

export default Layout;