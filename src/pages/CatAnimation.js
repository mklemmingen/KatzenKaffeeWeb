import React, { useEffect, useRef } from 'react';
import './CatAnimation.css';

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

const tileWidth = 32;
const tileHeight = 32;
const scale = 2;
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
    walking: 1,
    running: 2
};

const getDirectionFromAngle = (angle) => {
    const normalizedAngle = (angle + 2 * Math.PI) % (2 * Math.PI);
    if (normalizedAngle >= 0 && normalizedAngle < Math.PI / 8) return 'west';
    if (normalizedAngle >= Math.PI / 8 && normalizedAngle < Math.PI / 4) return 'south-west';
    if (normalizedAngle >= Math.PI / 4 && normalizedAngle < 3 * Math.PI / 4) return 'south';
    if (normalizedAngle >= 3 * Math.PI / 4 && normalizedAngle < 5 * Math.PI / 6) return 'south-east';
    if (normalizedAngle >= 5 * Math.PI / 6 && normalizedAngle < 7 * Math.PI / 6) return 'east';
    if (normalizedAngle >= 7 * Math.PI / 6 && normalizedAngle < 5 * Math.PI / 4) return 'north-east';
    if (normalizedAngle >= 5 * Math.PI / 4 && normalizedAngle < 7 * Math.PI / 4) return 'north';
    if (normalizedAngle >= 7 * Math.PI / 4 && normalizedAngle < 15 * Math.PI / 8) return 'north-west';
    return 'west';
};

// method is optimized by the use of a canvas element and by the file in assets/cats that prepares the spritesheets
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

const CatAnimation = ({ numberOfCats }) => {
    const canvasRef = useRef(null);
    const frameRate = 8;
    const frameDuration = 1000 / frameRate;
    const lastFrameTime = useRef(0);

    const getRandomMeowSound = () => {
        const randomIndex = Math.floor(Math.random() * meowSounds.length);
        return meowSounds[randomIndex];
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        ctx.imageSmoothingEnabled = false;

        const cats = Array.from({ length: numberOfCats }, () => {
            const category = categories[Math.floor(Math.random() * categories.length)];
            const direction = directions[Math.floor(Math.random() * directions.length)];
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                direction: direction || directions[0], // Added Fallback to a default direction
                frame: 0,
                sprite: new Image(),
                category: category || categories[0], // Added Fallback to a default category
                tiles: {},
                speed: speeds['walking'],
                delay: 0,
                targetX: Math.random() * canvas.width,
                targetY: Math.random() * canvas.height,
                stateTimer: 0,
                lastMeowTime: 0
            };
        });

        const loadSprites = () => {
            let loadedCount = 0;
            spriteFiles.forEach((spriteFile, index) => {
                const spriteSheet = new Image();
                spriteSheet.src = `/assets/cats/${spriteFile}`;
                spriteSheet.onload = () => {
                    cats.forEach(cat => {
                        if (index === spriteFiles.indexOf(cat.sprite.src.split('/').pop())) {
                            cat.tiles = extractTiles(spriteSheet, categories);
                        }
                    });
                    loadedCount++;
                    if (loadedCount === spriteFiles.length) {
                        requestAnimationFrame(animate);
                    }
                };
            });
        };

        cats.forEach(cat => {
            const randomSprite = spriteFiles[Math.floor(Math.random() * spriteFiles.length)];
            cat.sprite.src = `/assets/cats/${randomSprite}`;
        });

        loadSprites();

        const chooseTarget = (cat) => {
            cat.targetX = Math.random() * canvas.width;
            cat.targetY = Math.random() * canvas.height;
            const newCategory = categories.find(category => category.name === (Math.random() < 0.5 ? 'walking' : 'running'));
            if (newCategory) {
                cat.category = newCategory;
                cat.speed = speeds[cat.category.name];
                cat.stateTimer = Math.random() * 3000 + 2000; // Set a random state timer between 2 and 5 seconds
            } else {
                console.error('Failed to assign a new category to the cat:', cat);
            }
        };

        // 09.10.24: Added null checks before accessing category property
        const animate = (timestamp) => {
            if (timestamp - lastFrameTime.current < frameDuration) {
                requestAnimationFrame(animate);
                return;
            }
            lastFrameTime.current = timestamp;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
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
                                tile.width * scale,
                                tile.height * scale
                            );
                        }

                        if (cat.category.name !== 'laying' && cat.category.name !== 'sitting' && cat.category.name !== 'looking') {
                            cat.frame = (cat.frame + 1) % tilesForDirection.length;

                            const angle = Math.atan2(cat.targetY - cat.y, cat.targetX - cat.x);
                            cat.direction = directions.find(dir => dir.name === getDirectionFromAngle(angle));
                            cat.x += Math.cos(angle) * cat.speed;
                            cat.y += Math.sin(angle) * cat.speed;

                            if (Math.abs(cat.x - cat.targetX) < 1 && Math.abs(cat.y - cat.targetY) < 1) {
                                changeBehavior(cat);
                                cat.targetX = Math.random() * canvas.width;
                                cat.targetY = Math.random() * canvas.height;
                            }
                        } else {
                            cat.stateTimer -= frameDuration;
                            if (cat.stateTimer <= 0) {
                                changeBehavior(cat);
                            }
                        }
                    }
                }
            });
            requestAnimationFrame(animate);
        };

        // this was a complete mess of a method to write, but it works
        const handleClick = (event) => {
            console.log('Canvas clicked'); // Log to verify click detection

            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;

            console.log(`Canvas dimensions: (${rect.width}, ${rect.height})`); // Log canvas dimensions
            console.log(`Click coordinates: (${x}, ${y})`); // Log click coordinates

            cats.forEach(cat => {
                console.log(`Cat position: (${cat.x}, ${cat.y})`); // Log cat position
                console.log(`Cat bounds: (${cat.x}, ${cat.y}, ${cat.x + tileWidth * scale}, ${cat.y + tileHeight * scale})`); // Log cat bounds

                const catRight = cat.x + tileWidth * scale;
                const catBottom = cat.y + tileHeight * scale;

                console.log(`Checking if (${x}, ${y}) is within (${cat.x}, ${cat.y}, ${catRight}, ${catBottom})`);

                if (x >= cat.x && x <= catRight && y >= cat.y && y <= catBottom) {
                    console.log('Cat clicked:', cat); // Log to verify cat detection

                    const currentTime = Date.now();
                    if (currentTime - cat.lastMeowTime >= 10000) { // Check if 10 seconds have passed
                        const meowSound = new Audio(getRandomMeowSound());
                        meowSound.play();
                        cat.lastMeowTime = currentTime;
                    }
                    chooseTarget(cat);
                }
            });
        };

        const changeBehavior = (cat) => {
            const behaviors = ['laying', 'sitting', 'looking', 'walking', 'running'];
            const currentBehavior = behaviors.indexOf(cat.category.name);
            const nextBehavior = behaviors[(currentBehavior + 1) % behaviors.length];
            cat.category = categories.find(category => category.name === nextBehavior);
            cat.speed = speeds[nextBehavior];
            cat.frame = 0; // Reset frame to ensure animation starts from the beginning
            cat.stateTimer = Math.random() * 5000 + 2000; // Set a random state timer between 2 and 7 seconds
        };

        const updateAnimationBasedOnDirection = () => {
            cats.forEach(cat => {
                const angle = Math.atan2(cat.targetY - cat.y, cat.targetX - cat.x);
                const newDirection = directions.find(dir => dir.name === getDirectionFromAngle(angle));
                if (cat.direction !== newDirection) {
                    cat.direction = newDirection;
                    cat.frame = 0; // Reset frame to ensure animation starts from the beginning
                }
            });
        };

        // Interval to check direction and change animation if needed
        const directionInterval = setInterval(updateAnimationBasedOnDirection, 500);

        canvas.addEventListener('click', handleClick);

        return () => {
            clearInterval(directionInterval);
            canvas.removeEventListener('click', handleClick);
        };
    }, [numberOfCats, frameDuration]);

    return <canvas ref={canvasRef} className="cat-animation-canvas"></canvas>;
};

export default CatAnimation;