'use client';

import React from 'react';

// styles ---------------------------------------------------
import '@/app/styles/Home.css';

// components -----------------------------------------------
import InfoBlock from '@/app/components/InfoBlock';
import Introduction from '@/app/components/Introduction';
import BirdAnimation from '@/app/components/BirdAnimation';
import CatAnimation from '@/app/components/CatAnimation';
import { FaArrowAltCircleUp } from "react-icons/fa";

// data -----------------------------------------------------
import catAndNature from "@/app/data/catAndNature.json";
import catOwning from "@/app/data/catOwning.json";
import statisticSection from "@/app/data/statisticSections.json";

// sections -------------------------------------------------
import StatCatGermany from "@/app/sections/stat/StatCatGermany";
import StatCatGreek from "@/app/sections/stat/StatCatGreek";
import StatCatGlobal from "@/app/sections/stat/StatCatGlobal";

import SuppShelter from "@/app/sections/nature/SuppShelter";
import CatEffectNature from "@/app/sections/nature/CatEffectNature";

import EcoLitter from "@/app/sections/catOwn/EcoLitter";
import EneffCare from "@/app/sections/catOwn/EneffCare";
import MentHealthToys from "@/app/sections/catOwn/MentHealthToys";
import SustCatOwn from "@/app/sections/catOwn/SustCatOwn";

const Index = () => {

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

    return (
        <div>
            <CatAnimation numberOfCats={5}/>
            <Introduction id="start"/>
            <BackToStartButton/>
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
            <div id={"catStatGermany"} className="section">
                <div className="section-content">
                    <StatCatGermany/>
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
        </div>
    );
};

export default Index;