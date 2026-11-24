'use client';

/*
 * Background birds from the react-pixel-cats-and-birds package.
 * Bird sprites: Pop Shop Packs (see credits page).
 */

import React from 'react';
import {Birds} from 'react-pixel-cats-and-birds';
import '../_styles/BirdAnimation.css';

const BirdAnimation = ({numberOfBirds}) => (
    <Birds count={numberOfBirds} className="pixel-birds-canvas"/>
);

export default BirdAnimation;
