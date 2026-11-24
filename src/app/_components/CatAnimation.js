'use client';

/*
 * Background cats from the react-pixel-cats-and-birds package, plus a few coffee props.
 * Cat sprites: Pop Shop Packs (see credits page).
 */

import React, {useEffect, useState} from 'react';
import {Cats} from 'react-pixel-cats-and-birds';
import '../_styles/CatAnimation.css';

const COFFEE = [
    'CoffeeDropMachine.png', 'coffeeFilterMachine.png', 'coffeeGrinder.png',
    'coffeeMachine.png', 'coffeeMilk.png', 'frenchpress.png',
].map(name => `/assets/coffee/${name}`);

// left or right quarter, in percent, so props stay away from the text column
const sidePercent = () => (Math.random() < 0.5 ? Math.random() * 20 : 78 + Math.random() * 20);

function CoffeeProps() {
    // positions are random, so they are chosen after mount (no SSR hydration mismatch)
    const [items, setItems] = useState([]);
    useEffect(() => {
        setItems(COFFEE.map(src => ({src, left: sidePercent(), top: 5 + Math.random() * 85})));
    }, []);
    return items.map(({src, left, top}) => (
        // 16px decorative pixel art: next/image optimisation would only add overhead
        // eslint-disable-next-line @next/next/no-img-element
        <img key={src} src={src} alt="" aria-hidden="true" className="coffee-prop"
             style={{left: `${left}%`, top: `${top}%`}}/>
    ));
}

const CatAnimation = ({numberOfCats}) => (
    <>
        <CoffeeProps/>
        <Cats count={numberOfCats} avoidCenter className="cat-animation-canvas"/>
    </>
);

export default CatAnimation;
