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
const categoryHeight = 32;
const scale = 2;
const categories = [
    { name: 'sitting', startX: 0, startY: categoryHeight - tileHeight },
    { name: 'looking', startX: 128, startY: categoryHeight - tileHeight },
    { name: 'laying', startX: 256, startY: categoryHeight - tileHeight },
    { name: 'walking', startX: 384, startY: categoryHeight - tileHeight },
    { name: 'running', startX: 512, startY: categoryHeight - tileHeight }
];
const directions = [
    { name: 'south', index: 0 },
    { name: 'south-west', index: 1 },
    { name: 'west', index: 2 },
    { name: 'north-west', index: 3 },
    { name: 'north', index: 4 },
    { name: 'north-east', index: 5 },
    { name: 'east', index: 6 },
    { name: 'south-east', index: 7 }
];
const meowSounds = [
    '/assets/snd/meow.mp3',
    '/assets/snd/meow2.mp3',
    '/assets/snd/meow3.mp3',
    '/assets/snd/meow4.mp3',
    '/assets/snd/meow5.mp3',
    '/assets/snd/meow6.mp3'
];

const speeds = {
    laying: 0,
    sitting: 0,
    walking: 1,
    running: 2
};

const extractTiles = (spriteSheet, categories) => {
    const tiles = {};
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = tileWidth;
    canvas.height = tileHeight;

    categories.forEach((category, catIndex) => { // for each category
        tiles[category.name] = {};
        directions.forEach((direction, dirIndex) => { // for each direction
            tiles[category.name][direction] = [];
            for (let row = 0; row < 2; row++) { // each animation is 2 rows
                for (let col = 0; col < 4; col++) { // each animation is 8 frames in 2 rows max
                    const sx = category.startX + col * tileWidth // startX is the x position of the category and col in frame
                    // startY is in the lower left corner of a frame. To get there, subtract pngHeight by categoryHeight
                    // for categoryTitle, and by all the directions we have already processed, and by the row we are on
                    const sy = spriteSheet.height - categoryHeight + tileHeight * 2 * direction.index + row * tileHeight;
                    if (sx < 768) {
                        ctx.clearRect(0, 0, tileWidth, tileHeight);
                        ctx.drawImage(spriteSheet, sx, sy, tileWidth, tileHeight, 0, 0, tileWidth, tileHeight);
                        const imageData = ctx.getImageData(0, 0, tileWidth, tileHeight);
                        const isEmpty = !imageData.data.some(channel => channel !== 0);
                        if (!isEmpty) {
                            tiles[category.name][direction].push({ sx, sy, width: tileWidth, height: tileHeight });
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
    const frameRate = 8; // frames per second
    const frameDuration = 1000 / frameRate; // duration of each frame in milliseconds
    let lastFrameTime = 0;

    const getRandomMeowSound = () => {
        const randomIndex = Math.floor(Math.random() * meowSounds.length);
        return meowSounds[randomIndex];
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return; // Ensure canvas is not null
        const ctx = canvas.getContext('2d');

        // Set canvas dimensions to match the actual size
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        // Disable image smoothing
        ctx.imageSmoothingEnabled = false;

        const cats = Array.from({ length: numberOfCats }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            direction: directions[Math.floor(Math.random() * directions.length)],
            frame: 0,
            sprite: new Image(),
            category: categories[Math.floor(Math.random() * categories.length)], // Randomly assign category
            tiles: {},
            speed: speeds['walking'],
            delay: 0,
            targetX: null,
            targetY: null
        }));

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

        const animate = (timestamp) => {
            if (timestamp - lastFrameTime < frameDuration) {
                requestAnimationFrame(animate);
                return;
            }
            lastFrameTime = timestamp;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cats.forEach(cat => {
                const tile = cat.tiles[cat.category.name][cat.direction][cat.frame];
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

                // Update frame
                cat.frame = (cat.frame + 1) % cat.tiles[cat.category.name][cat.direction].length;

                // Update position
                const directionIndex = directions.indexOf(cat.direction);
                const angle = (directionIndex * Math.PI) / 4;
                cat.x += Math.cos(angle) * cat.speed;
                cat.y += Math.sin(angle) * cat.speed;

                // Fix boundary conditions
                if (cat.x < 0 || cat.x > canvas.width - tileWidth * scale) {
                    cat.direction = directions[(directions.indexOf(cat.direction) + 4) % directions.length];
                }
                if (cat.y < 0 || cat.y > canvas.height - tileHeight * scale) {
                    cat.direction = directions[(directions.indexOf(cat.direction) + 4) % directions.length];
                }
            });
            requestAnimationFrame(animate);
        };

        const changeDirection = (cat) => {
            cat.direction = directions[(directions.indexOf(cat.direction) + 1) % directions.length];
            cat.frame = 0;
        };

        const changeBehavior = (cat) => {
            const behaviors = ['laying', 'sitting', 'walking', 'running'];
            const currentBehavior = behaviors.indexOf(cat.category.name);
            const nextBehavior = behaviors[(currentBehavior + 1) % behaviors.length];
            cat.category = categories.find(category => category.name === nextBehavior);
            cat.speed = speeds[nextBehavior];
        };

        const handleClick = (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            cats.forEach(cat => {
                if (
                    x >= cat.x && x <= cat.x + tileWidth * scale &&
                    y >= cat.y && y <= cat.y + tileHeight * scale
                ) {
                    const meowAudio = new Audio(getRandomMeowSound());
                    meowAudio.play();
                    changeDirection(cat);
                    if (cat.category.name === 'laying' || cat.category.name === 'sitting') {
                        changeBehavior(cat);
                    }
                }
            });
        };

        canvas.addEventListener('click', handleClick);

        const interval = setInterval(() => {
            cats.forEach(changeDirection);
        }, 2000);

        return () => {
            clearInterval(interval);
            canvas.removeEventListener('click', handleClick);
        };
    }, [numberOfCats]);

    return <canvas ref={canvasRef} className="cat-animation-canvas"></canvas>;
};

export default CatAnimation;