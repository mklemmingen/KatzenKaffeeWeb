'use client';

import React, {useEffect, useRef} from 'react';
import '../_styles/CatAnimation.css';
import "../globals.css";
import BirdAnimation from "@/app/_components/BirdAnimation";

const spriteFiles = [
    'black_0.png', 'black_1.png', 'black_2.png', 'black_3.png', 'black_4.png',
    'blue_0.png', 'blue_1.png', 'blue_2.png', 'blue_3.png',
    'brown_0.png', 'brown_1.png', 'brown_2.png', 'brown_3.png', 'brown_4.png', 'brown_5.png',
    'brown_6.png', 'brown_7.png', 'brown_8.png',
    'calico_0.png', 'cotton_candy_blue_0.png', 'cotton_candy_pink_0.png',
    'creme_0.png', 'creme_1.png', 'dark_0.png',
    'game_boy_0.png', 'game_boy_1.png', 'game_boy_2.png',
    'ghost_0.png', 'gold_0.png',
    'grey_0.png', 'grey_1.png', 'grey_2.png',
    'hairless_0.png', 'hairless_1.png',
    'indigo_0.png', 'orange_0.png', 'orange_1.png', 'orange_2.png', 'orange_3.png',
    'peach_0.png', 'pink_0.png', 'radioactive_0.png',
    'red_0.png', 'red_1.png', 'seal_point_0.png', 'teal_0.png',
    'white_0.png', 'white_grey_0.png', 'white_grey_1.png', 'yellow_0.png'
];

const coffeeFiles = [
    'CoffeeDropMachine.png', 'coffeeFilterMachine.png', 'coffeeGrinder.png',
    'coffeeMachine.png', "coffeeMilk.png", "frenchpress.png"
];

const catScale = 3;
const coffeeScale = 1;
const tileWidth = 32;
const tileHeight = 32;
const categories = [
    { name: 'sitting', startX: 0, startY: tileHeight },
    { name: 'looking', startX: 128, startY: tileHeight },
    { name: 'laying', startX: 256, startY: tileHeight },
    { name: 'walking', startX: 384, startY: tileHeight },
    { name: 'running', startX: 512, startY: tileHeight }
];
const directions = [
    { name: 'south', index: 0, angle: Math.PI / 2 },
    { name: 'south-west', index: 1, angle: (3 * Math.PI) / 4 },
    { name: 'west', index: 2, angle: Math.PI },
    { name: 'north-west', index: 3, angle: (5 * Math.PI) / 4 },
    { name: 'north', index: 4, angle: (3 * Math.PI) / 2 },
    { name: 'north-east', index: 5, angle: (7 * Math.PI) / 4 },
    { name: 'east', index: 6, angle: 0 },
    { name: 'south-east', index: 7, angle: Math.PI / 4 }
];
const meowSounds = [
    '/assets/snd/meow.mp3',
    '/assets/snd/meow2.mp3',
    '/assets/snd/meow3.mp3',
    '/assets/snd/meow5.mp3',
    '/assets/snd/meow6.mp3'
];
const speeds = {
    laying: 0,
    sitting: 0,
    looking: 0,
    walking: 3,
    running: 6
};

const getDirectionFromAngle = (angle) => {
    const normalizedAngle = (angle + 2 * Math.PI) % (2 * Math.PI);
    if (normalizedAngle >= 0 && normalizedAngle < Math.PI / 8) return 'west';
    if (normalizedAngle >= Math.PI / 8 && normalizedAngle < 3 * Math.PI / 8) return 'south-west';
    if (normalizedAngle >= 3 * Math.PI / 8 && normalizedAngle < 5 * Math.PI / 8) return 'south';
    if (normalizedAngle >= 5 * Math.PI / 8 && normalizedAngle < 7 * Math.PI / 8) return 'south-east';
    if (normalizedAngle >= 7 * Math.PI / 8 && normalizedAngle < 9 * Math.PI / 8) return 'east';
    if (normalizedAngle >= 9 * Math.PI / 8 && normalizedAngle < 11 * Math.PI / 8) return 'north-east';
    if (normalizedAngle >= 11 * Math.PI / 8 && normalizedAngle < 13 * Math.PI / 8) return 'north';
    if (normalizedAngle >= 13 * Math.PI / 8 && normalizedAngle < 15 * Math.PI / 8) return 'north-west';
    return 'west';
};


const extractTiles = (spriteSheet, categories) => {
    const tiles = {};
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = tileWidth;
    canvas.height = tileHeight;

    categories.forEach((category) => {
        tiles[category.name] = {};
        directions.forEach((direction) => {
            tiles[category.name][direction.name] = [];
            for (let row = 0; row < 2; row++) {
                for (let col = 0; col < 4; col++) {
                    const sx = category.startX + col * tileWidth;
                    const sy = spriteSheet.height - tileHeight * 2 * direction.index - row * tileHeight;
                    if (sx < 768) {
                        ctx.clearRect(0, 0, tileWidth, tileHeight);
                        ctx.drawImage(spriteSheet, sx, sy, tileWidth, tileHeight, 0, 0, tileWidth, tileHeight);
                        const imageData = ctx.getImageData(0, 0, tileWidth, tileHeight);
                        const isEmpty = !imageData.data.some(channel => channel !== 0);
                        if (!isEmpty) {
                            tiles[category.name][direction.name].push({ sx, sy, width: tileWidth, height: tileHeight });
                        }
                    }
                }
            }
        });
    });
    return tiles;
};

const isColliding = (rect1, rect2) => {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
};

const CatAnimation = ({ numberOfCats }) => {
    const canvasRef = useRef(null);
    const frameRate = 8;
    const frameDuration = 1000 / frameRate;
    const lastFrameTime = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        ctx.imageSmoothingEnabled = false;

        const getRandomX = () => {
            const width = canvas.width;
            const quarterWidth = width * 0.25;
            const randomValue = Math.random();
            return randomValue < 0.5 ? Math.random() * quarterWidth : width - quarterWidth + Math.random() * quarterWidth;
        };

        const cats = Array.from({ length: numberOfCats }, () => {
            const category = categories[Math.floor(Math.random() * categories.length)];
            const direction = directions[Math.floor(Math.random() * directions.length)];
            const spriteFile = spriteFiles[Math.floor(Math.random() * spriteFiles.length)];
            return {
                x: getRandomX(),
                y: Math.random() * canvas.height,
                direction: direction || directions[0],
                frame: 0,
                sprite: new Image(),
                spriteFile: spriteFile,
                category: category || categories[0],
                tiles: {},
                speed: speeds['walking'],
                delay: 0,
                targetX: getRandomX(),
                targetY: Math.random() * canvas.height,
                stateTimer: 0,
                lastMeowTime: 0,
                width: tileWidth * catScale,
                height: tileHeight * catScale
            };
        });

        const coffeeUtensils = coffeeFiles.map((file, index) => ({
            x: getRandomX(),
            y: Math.random() * canvas.height,
            sprite: new Image(),
            tipped: false,
            tippingTimer: 0,
            width: tileWidth * coffeeScale,
            height: tileHeight * coffeeScale
        }));

        const loadSprites = () => {
            let loadedCount = 0;
            spriteFiles.forEach((spriteFile, index) => {
                const spriteSheet = new Image();
                spriteSheet.src = `/assets/cats/${spriteFile}`;
                spriteSheet.onload = () => {
                    cats.forEach(cat => {
                        if (cat.spriteFile === spriteFile) {
                            cat.tiles = extractTiles(spriteSheet, categories);
                        }
                    });
                    loadedCount++;
                    if (loadedCount === spriteFiles.length) {
                        requestAnimationFrame(animate);
                    }
                };
            });

            coffeeFiles.forEach((coffeeFile, index) => {
                const coffeeSprite = new Image();
                coffeeSprite.src = `/assets/coffee/${coffeeFile}`;
                coffeeSprite.onload = () => {
                    coffeeUtensils[index].sprite = coffeeSprite;
                    loadedCount++;
                    if (loadedCount === spriteFiles.length + coffeeFiles.length) {
                        requestAnimationFrame(animate);
                    }
                };
            });
        };

        cats.forEach(cat => {
            cat.sprite.src = `/assets/cats/${cat.spriteFile}`;
        });

        loadSprites();

        const chooseTarget = (cat) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const viewWidth = rect.width;
            const viewHeight = rect.height;

            cat.targetX = getRandomX();
            cat.targetY = Math.random() * viewHeight;

            cat.category = categories.find(category => category.name === (Math.random() < 0.5 ? 'walking' : 'running')) || categories[0];
            cat.speed = speeds[cat.category.name];
            cat.stateTimer = Math.random() * 3000 + 2000;
        };

        const isBlankBackground = (x, y, width, height) => {
            const canvas = canvasRef.current;
            if (!canvas) return false;
            const ctx = canvas.getContext('2d');
            const imageData = ctx.getImageData(x, y, width, height);
            return !imageData.data.some(channel => channel !== 0);
        };

        const placeCoffeeUtensils = () => {
            coffeeUtensils.forEach(utensil => {
                let placed = false;
                while (!placed) {
                    utensil.x = getRandomX();
                    utensil.y = Math.random() * (canvas.height - utensil.height);
                    if (isBlankBackground(utensil.x, utensil.y, utensil.width, utensil.height)) {
                        placed = true;
                    }
                }
            });
        };

        const animate = (timestamp) => {
            if (timestamp - lastFrameTime.current < frameDuration) {
                requestAnimationFrame(animate);
                return;
            }
            lastFrameTime.current = timestamp;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            coffeeUtensils.forEach(utensil => {
                if (utensil.tipped) {
                    utensil.tippingTimer -= frameDuration;
                    if (utensil.tippingTimer <= 0) {
                        utensil.tipped = false;
                    }
                }
                ctx.drawImage(
                    utensil.sprite,
                    utensil.x,
                    utensil.y,
                    utensil.width,
                    utensil.height
                );
            });

            cats.forEach(cat => {
                if (!cat.category) {
                    console.error('Cat category is undefined:', cat);
                    return;
                }
                const tilesForCategory = cat.tiles[cat.category.name];
                if (tilesForCategory) {
                    const tilesForDirection = tilesForCategory[cat.direction.name];
                    if (tilesForDirection) {
                        const tile = tilesForDirection[cat.frame];
                        if (tile) {
                            ctx.drawImage(
                                cat.sprite,
                                tile.sx,
                                tile.sy,
                                tile.width,
                                tile.height,
                                cat.x,
                                cat.y,
                                cat.width,
                                cat.height
                            );
                        }

                        if (cat.category.name !== 'laying' && cat.category.name !== 'sitting' && cat.category.name !== 'looking') {
                            cat.frame = (cat.frame + 1) % tilesForDirection.length;
                            if (cat.frame === 0) {
                                cat.frame = 1;
                            }

                            const distanceX = cat.targetX - cat.x;
                            const distanceY = cat.targetY - cat.y;
                            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                            if (distance > 10) {
                                const angle = Math.atan2(distanceY, distanceX);
                                cat.direction = directions.find(dir => dir.name === getDirectionFromAngle(angle));
                                cat.x += Math.cos(angle) * cat.speed;
                                cat.y += Math.sin(angle) * cat.speed;
                            } else {
                                chooseTarget(cat);
                            }
                        } else {
                            cat.stateTimer -= frameDuration;
                            if (cat.stateTimer <= 0) {
                                changeBehavior(cat);
                            }
                        }
                    }
                }

                coffeeUtensils.forEach(utensil => {
                    if (isColliding(cat, utensil) && !utensil.tipped) {
                        utensil.tipped = true;
                        utensil.tippingTimer = 2000;
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        const changeBehavior = (cat) => {
            const behaviors = ['laying', 'sitting', 'looking', 'walking', 'running'];
            const currentBehavior = behaviors.indexOf(cat.category.name);
            const nextBehavior = behaviors[(currentBehavior + 1) % behaviors.length];
            cat.category = categories.find(category => category.name === nextBehavior);
            cat.speed = speeds[nextBehavior];
            cat.frame = 0;
            cat.stateTimer = Math.random() * 5000 + 2000;
        };

        const updateAnimationBasedOnDirection = () => {
            cats.forEach(cat => {
                const angle = Math.atan2(cat.targetY - cat.y, cat.targetX - cat.x);
                const newDirection = directions.find(dir => dir.name === getDirectionFromAngle(angle));
                if (cat.direction !== newDirection) {
                    cat.direction = newDirection;
                    cat.frame = 0;
                }
            });
        };

        const directionInterval = setInterval(updateAnimationBasedOnDirection, 500);

        placeCoffeeUtensils();

        return () => {
            clearInterval(directionInterval);
        };
    }, [numberOfCats, frameDuration]);

    return <canvas ref={canvasRef} className="cat-animation-canvas">
        <BirdAnimation numberOfBirds={numberOfCats*2} />
    </canvas>;
};

export default CatAnimation;