'use client';

import dynamic from 'next/dynamic';

import React, {Suspense, useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';

// _styles ---------------------------------------------------
import '@/app/_styles/Home.css';
import '@/app/globals.css';

// components -----------------------------------------------
import Introduction from '@/app/_components/Introduction';
import BirdAnimation from '@/app/_components/BirdAnimation';
import CatAnimation from '@/app/_components/CatAnimation';
import {FaArrowAltCircleUp} from "react-icons/fa";
import CategoryDropdown from "@/app/_components/CategoryDropdown";

// _sections -------------------------------------------------
import StatCatGermany from "@/app/_sections/stat/StatCatGermany";
import SuppShelter from "@/app/_sections/nature/SuppShelter";
import CatEffectNature from "@/app/_sections/nature/CatEffectNature";

import EcoLitter from "@/app/_sections/catOwn/EcoLitter";
import EneffCare from "@/app/_sections/catOwn/EneffCare";
import MentHealthToys from "@/app/_sections/catOwn/MentHealthToys";
import SustCatOwn from "@/app/_sections/catOwn/SustCatOwn";

const StatCatGlobal = dynamic(() => import('@/app/_sections/stat/StatCatGlobal'), { ssr: false });

const PageContent = () => {
    const [isClient, setIsClient] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            const targetId = searchParams.get('targetId');
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({behavior: 'smooth'});
                    targetElement.focus();
                }
            }
        }
    }, [searchParams, isClient]);

    const BackToStartButton = () => {
        return (
            <button
                className="back-to-start-button"
                onClick={() => {
                    if (typeof window !== "undefined") {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }}
            >
                <FaArrowAltCircleUp />
            </button>
        );
    };

    return (
        <div>
            <CategoryDropdown/>
            <BackToStartButton/>
            <div className="intro-section">
                <Introduction id="start"/>
            </div>
            <div id={"catStatGlobal"} className="section">
                <CatAnimation numberOfCats={10}/>
                {/* <PolaroidBackground/> */}
                <div className="section-content">
                    <StatCatGlobal/>
                </div>
            </div>
            <div id={'bird-protection'} className="section">
                <CatAnimation numberOfCats={20}/>
                <BirdAnimation numberOfBirds={40}/>
                {/* <PolaroidBackground/> */}
                <div className="section-content">
                    <CatEffectNature/>
                </div>
            </div>
            <div id="energy-efficient-cat-care" className="section">
                <CatAnimation numberOfCats={10}/>
                {/* <PolaroidBackground/> */}
                <div className="section-content">
                    <EneffCare/>
                </div>
            </div>
            <div id={"catStatGermany"} className="section">
                <CatAnimation numberOfCats={10}/>
                {/* <PolaroidBackground/> */}
                <div className="section-content">
                    <StatCatGermany/>
                </div>
            </div>
            <div id="mental-health" className="section">
                <CatAnimation numberOfCats={10}/>
                {/* <PolaroidBackground/> */}
                <div className="section-content">
                    <MentHealthToys/>
                </div>
            </div>
            <div id={'sustainable-diet'} className="section">
                <CatAnimation numberOfCats={10}/>
                {/* <PolaroidBackground/> */}
                <div className="section-content">
                    <SustCatOwn/>
                </div>
            </div>
            <div id={'cat-litter'} className="section">
                <CatAnimation numberOfCats={10}/>
                {/* <PolaroidBackground/> */}
                <div className="section-content">
                    <EcoLitter/>
                </div>
            </div>
            <div id="shelter-support" className="section">
                <CatAnimation numberOfCats={10}/>
                {/* <PolaroidBackground/> */}
                <div className="section-content">
                    <SuppShelter/>
                </div>
            </div>
        </div>
    );
};

const Page = () => {
    return (
        <Suspense fallback={
            <div className="loadingScreen">
                Loading...
            </div>
        }>
            <PageContent/>
        </Suspense>
    );
};

export default Page;