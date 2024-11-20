'use client';

import React, {useState, useEffect} from 'react';
import { useSearchParams } from 'next/navigation';

// _styles ---------------------------------------------------
import '@/app/_styles/Home.css';

// components -----------------------------------------------
import InfoBlock from '@/app/_components/InfoBlock';
import Introduction from '@/app/_components/Introduction';
import BirdAnimation from '@/app/_components/BirdAnimation';
import CatAnimation from '@/app/_components/CatAnimation';
import { FaArrowAltCircleUp } from "react-icons/fa";

// _data -----------------------------------------------------
import catAndNature from "@/app/_data/catAndNature.json";
import catOwning from "@/app/_data/catOwning.json";
import statisticSection from "@/app/_data/statisticSections.json";

// _sections -------------------------------------------------
import StatCatGermany from "@/app/_sections/stat/StatCatGermany";
import StatCatGreek from "@/app/_sections/stat/StatCatGreek";
import StatCatGlobal from "@/app/_sections/stat/StatCatGlobal";

import SuppShelter from "@/app/_sections/nature/SuppShelter";
import CatEffectNature from "@/app/_sections/nature/CatEffectNature";

import EcoLitter from "@/app/_sections/catOwn/EcoLitter";
import EneffCare from "@/app/_sections/catOwn/EneffCare";
import MentHealthToys from "@/app/_sections/catOwn/MentHealthToys";
import SustCatOwn from "@/app/_sections/catOwn/SustCatOwn";

const Page = () => {
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
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    targetElement.focus();
                }
            }
        }
    }, [searchParams, isClient]);

    // Button that can be added to the page anywhere, that alignes center and throws the view back onto
    // "start"
    const BackToStartButton = () => {
        return (
            <button
                className="back-to-start-button"
                onClick={() => {
                    console.log('Scrolling back to top');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
            >
                <FaArrowAltCircleUp />
            </button>
        );
    };

    /*
    <div className="categories-container">
                <div className="sub-categories-container" id="statisticCategories">
                    <h1> Statistiken für den Einstieg </h1>
                    <div className="info-blocks-container">
                        {statisticSection.categories.map((category, index) => (
                            <InfoBlock
                                key={index}
                                iconSrc={category.iconSrc}
                                headerText={category.headerText}
                                textBlock={category.textBlock}
                                targetId={category.targetId}
                            />
                        ))}
                    </div>
                </div>
                <div className="sub-categories-container" id="catNatureCategories">
                    <h1> Katzen und die Natur </h1>
                    <div className="info-blocks-container">
                        {catAndNature.categories.map((category, index) => (
                            <InfoBlock
                                key={index}
                                iconSrc={category.iconSrc}
                                headerText={category.headerText}
                                textBlock={category.textBlock}
                                targetId={category.targetId}
                            />
                        ))}
                    </div>
                </div>
                <div className="sub-categories-container" id="catOwningCategories">
                    <h1> Katzenhaltung leicht gemacht </h1>
                    <div className="info-blocks-container">
                        {catOwning.categories.map((category, index) => (
                            <InfoBlock
                                key={index}
                                iconSrc={category.iconSrc}
                                headerText={category.headerText}
                                textBlock={category.textBlock}
                                targetId={category.targetId}
                            />
                        ))}
                    </div>
                </div>
            </div>
     */

    return (
        <div>
            <Introduction id="start"/>
            <BackToStartButton/>
            <div id={"catStatGermany"} className="section">
                <div className="section-content">
                    <StatCatGermany/>
                </div>
            </div>
            <div id={'sustainable-diet'} className="section">
                <div className="section-content">
                    <SustCatOwn/>
                </div>
            </div>
            <div id={'cat-litter'} className="section">
                <div className="section-content">
                    <EcoLitter/>
                </div>
            </div>
            <div id={'bird-protection'} className="section">
                <div className="section-content">
                    <CatEffectNature/>
                </div>
            </div>
            <div id="mental-health" className="section">
                <div className="section-content">
                    <MentHealthToys/>
                </div>
            </div>
            <div id="energy-efficient-cat-care" className="section">
                <div className="section-content">
                    <EneffCare/>
                </div>
            </div>
            <div id="shelter-support" className="section">
                <div className="section-content">
                    <SuppShelter/>
                </div>
            </div>
            <div id={"catStatGlobal"} className="section">
                <div className="section-content">
                    <StatCatGlobal/>
                </div>
            </div>
            <div id={"catStatGreek"} className="section">
                <div className="section-content">
                    <StatCatGreek/>
                </div>
            </div>
        </div>
    );
};

export default Page;