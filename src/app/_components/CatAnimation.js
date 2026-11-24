'use client';

import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import '../_styles/CatAnimation.css';
import {playMeow} from '../_lib/meowSynth';

/*
 * Sprite sheet layout (every sheet in /assets/cats is 768x512, 32x32 tiles):
 *   - 8 horizontal bands of 64px (2 tile rows), one per facing direction,
 *     top to bottom: S, SW, W, NW, N, NE, E, SE
 *   - 6 blocks of 128px (4 tile columns), each block holds two animations
 *     (top row / bottom row of the band).
 */
const TILE = 32;
const CAT_SCALE = 3;
const CAT_SIZE = TILE * CAT_SCALE;
const COFFEE_SIZE = 32;
const SPRITE_FPS = 8;
const MAX_FPS = 30;
const PALETTE_SIZE = 8; // distinct cat sheets loaded per page, shared by all instances

// looping movement cycles
const MOVES = {
    walking: {block: 4, row: 0, frames: 4, speed: 28},  // px per second
    running: {block: 5, row: 0, frames: 4, speed: 80},
};

// [block, row, column] tiles
const seq = (block, row, cols) => cols.map(col => [block, row, col]);
const SIT_DOWN = [...seq(0, 0, [0, 1, 2, 3]), ...seq(0, 1, [0, 1])];   // standing -> sitting
const LOOK_AROUND = [...seq(1, 0, [0, 1, 2, 3]), ...seq(1, 1, [0])];  // sitting -> looking at you
const LIE_DOWN = [...seq(2, 0, [0, 1, 2, 3]), ...seq(2, 1, [0, 1, 2, 3])]; // sitting -> lying

// Idle poses are transitions, not loops: play forward on entry, freeze on the last
// tile for the wait, then play backwards to stand up again before walking off.
const IDLES = [
    {tiles: SIT_DOWN, weight: 2},
    {tiles: [...SIT_DOWN, ...LOOK_AROUND], weight: 1},
    {tiles: [...SIT_DOWN, ...LIE_DOWN], weight: 2},
];
const IDLE_WEIGHT = IDLES.reduce((s, i) => s + i.weight, 0);

function pickIdle() {
    let r = Math.random() * IDLE_WEIGHT;
    for (const idle of IDLES) {
        r -= idle.weight;
        if (r < 0) return idle.tiles;
    }
    return IDLES[0].tiles;
}

// screen-space octant (0 = east, clockwise because y points down) -> sheet band
const OCTANT_TO_BAND = [6, 7, 0, 1, 2, 3, 4, 5];

const CAT_SHEETS = [
    'black_0', 'black_1', 'black_2', 'black_3', 'black_4',
    'blue_0', 'blue_1', 'blue_2', 'blue_3',
    'brown_0', 'brown_1', 'brown_2', 'brown_3', 'brown_4', 'brown_5',
    'brown_6', 'brown_7', 'brown_8',
    'calico_0', 'cotton_candy_blue_0', 'cotton_candy_pink_0',
    'creme_0', 'creme_1', 'dark_0',
    'game_boy_0', 'game_boy_1', 'game_boy_2',
    'ghost_0', 'gold_0',
    'grey_0', 'grey_1', 'grey_2',
    'hairless_0', 'hairless_1',
    'indigo_0', 'orange_0', 'orange_1', 'orange_2', 'orange_3',
    'peach_0', 'pink_0', 'radioactive_0',
    'red_0', 'red_1', 'seal_point_0', 'teal_0',
    'white_0', 'white_grey_0', 'white_grey_1', 'yellow_0',
].map(name => `/assets/cats/${name}.png`);

const COFFEE_SPRITES = [
    'CoffeeDropMachine.png', 'coffeeFilterMachine.png', 'coffeeGrinder.png',
    'coffeeMachine.png', 'coffeeMilk.png', 'frenchpress.png',
].map(name => `/assets/coffee/${name}`);


/* ---------- shared, page-wide caches ---------- */

// url -> {img, ready}. A failed image never becomes ready and is simply not drawn,
// so one broken or slow file can never block the animation from starting.
const imageCache = new Map();

function getImage(url) {
    let entry = imageCache.get(url);
    if (!entry) {
        const img = new Image();
        entry = {img, ready: false};
        img.decoding = 'async';
        img.onload = () => {
            entry.ready = true;
        };
        img.src = url;
        imageCache.set(url, entry);
    }
    return entry;
}

let palette = null;

function getPalette() {
    if (!palette) {
        const shuffled = [...CAT_SHEETS];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        palette = shuffled.slice(0, PALETTE_SIZE);
    }
    return palette;
}

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];


/* ---------- simulation ---------- */

// keep cats to the outer quarters so they don't sit under the text column
function randomX(width) {
    const quarter = Math.max(0, width * 0.25 - CAT_SIZE);
    return Math.random() < 0.5
        ? Math.random() * quarter
        : Math.max(0, width - CAT_SIZE - Math.random() * quarter);
}

const randomY = (height) => Math.random() * Math.max(0, height - CAT_SIZE);

// cat.state: 'walking' | 'running' | 'idle'; idle has cat.phase: 'enter' | 'hold' | 'exit'
function setIdle(cat, phase = 'enter') {
    cat.state = 'idle';
    cat.idle = pickIdle();
    cat.phase = phase;
    cat.animTime = 0;
    cat.timer = 2500 + Math.random() * 5000;
}

function setMoving(cat, w, h, state) {
    cat.state = state;
    cat.animTime = 0;
    cat.tx = randomX(w);
    cat.ty = randomY(h);
}

function makeCat(sheets, w, h) {
    const cat = {
        sheet: getImage(pick(sheets)),
        x: randomX(w), y: randomY(h),
        tx: 0, ty: 0,
        band: Math.floor(Math.random() * 8),
        state: 'walking', idle: null, phase: null,
        animTime: Math.random(), timer: 0,
    };
    // half the cats begin already settled (frozen pose), so the page doesn't open with
    // everyone sitting down in sync
    if (Math.random() < 0.5) setIdle(cat, 'hold');
    else setMoving(cat, w, h, 'walking');
    return cat;
}

// [block, row, column] of the tile to draw right now
function currentTile(cat) {
    const n = Math.floor(cat.animTime * SPRITE_FPS);
    if (cat.state !== 'idle') {
        const move = MOVES[cat.state];
        return [move.block, move.row, n % move.frames];
    }
    const tiles = cat.idle;
    const last = tiles.length - 1;
    if (cat.phase === 'enter') return tiles[Math.min(n, last)];
    if (cat.phase === 'exit') return tiles[Math.max(last - n, 0)];
    return tiles[last];
}

function stepCat(cat, dt, w, h) {
    cat.animTime += cat.startled ? dt * 2 : dt;
    if (cat.state === 'idle') {
        const played = Math.floor(cat.animTime * SPRITE_FPS);
        if (cat.phase === 'enter' && played >= cat.idle.length) {
            cat.phase = 'hold';
            cat.animTime = 0;
        } else if (cat.phase === 'hold') {
            cat.timer -= dt * 1000;
            if (cat.timer <= 0) {
                cat.phase = 'exit';
                cat.animTime = 0;
            }
        } else if (cat.phase === 'exit' && played >= cat.idle.length) {
            setMoving(cat, w, h, cat.startled || Math.random() < 0.3 ? 'running' : 'walking');
            cat.startled = false;
        }
        return;
    }
    const dx = cat.tx - cat.x;
    const dy = cat.ty - cat.y;
    const dist = Math.hypot(dx, dy);
    const step = MOVES[cat.state].speed * dt;
    if (dist <= step) {
        cat.x = cat.tx;
        cat.y = cat.ty;
        setIdle(cat);
        return;
    }
    const octant = ((Math.round(Math.atan2(dy, dx) / (Math.PI / 4)) % 8) + 8) % 8;
    cat.band = OCTANT_TO_BAND[octant];
    cat.x += (dx / dist) * step;
    cat.y += (dy / dist) * step;
}

const hits = (o, size, px, py) => px >= o.x && px < o.x + size && py >= o.y && py < o.y + size;

/* ---------- component ---------- */

const CatAnimation = ({numberOfCats}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return undefined;
        const ctx = canvas.getContext('2d');
        if (!ctx) return undefined;

        const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

        let width = 0;
        let height = 0;
        let cats = null;
        let coffee = null;
        let visible = false;
        let loopId = 0;
        let lastTime = 0;

        const spawn = () => {
            const sheets = getPalette();
            cats = Array.from({length: numberOfCats}, () => makeCat(sheets, width, height));
            coffee = COFFEE_SPRITES.map(url => ({
                sprite: getImage(url),
                x: randomX(width), y: randomY(height),
                tipped: 0,
            }));
        };

        // The backing store is CSS-pixel sized (no devicePixelRatio): this is pixel art upscaled
        // with `image-rendering: pixelated`, so a hi-dpi store would only cost 4x the memory.
        // While the canvas is off-screen its backing store is released entirely.
        const applySize = () => {
            const w = visible ? Math.round(canvas.clientWidth) : 0;
            const h = visible ? Math.round(canvas.clientHeight) : 0;
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
            }
            if (!visible || w === 0 || h === 0) return;
            if (!cats) {
                width = w;
                height = h;
                spawn();
            } else if (w !== width || h !== height) {
                const sx = w / width;
                const sy = h / height;
                const maxX = Math.max(0, w - CAT_SIZE);
                const maxY = Math.max(0, h - CAT_SIZE);
                width = w;
                height = h;
                for (const o of cats) {
                    o.x = Math.min(o.x * sx, maxX);
                    o.y = Math.min(o.y * sy, maxY);
                    o.tx = Math.min(o.tx * sx, maxX);
                    o.ty = Math.min(o.ty * sy, maxY);
                }
                for (const o of coffee) {
                    o.x = Math.min(o.x * sx, maxX);
                    o.y = Math.min(o.y * sy, maxY);
                }
            }
            ctx.imageSmoothingEnabled = false; // resetting canvas size resets this flag
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const c of coffee) {
                if (!c.sprite.ready) continue;
                const x = Math.round(c.x);
                const y = Math.round(c.y);
                if (c.tipped > 0) {
                    ctx.save();
                    ctx.translate(x + COFFEE_SIZE / 2, y + COFFEE_SIZE / 2);
                    ctx.rotate(Math.PI / 2);
                    ctx.drawImage(c.sprite.img, -COFFEE_SIZE / 2, -COFFEE_SIZE / 2, COFFEE_SIZE, COFFEE_SIZE);
                    ctx.restore();
                } else {
                    ctx.drawImage(c.sprite.img, x, y, COFFEE_SIZE, COFFEE_SIZE);
                }
            }

            // back-to-front so lower cats overlap the ones behind them
            cats.sort((a, b) => a.y - b.y);
            for (const cat of cats) {
                if (!cat.sheet.ready) continue;
                const [block, row, col] = currentTile(cat);
                ctx.drawImage(
                    cat.sheet.img,
                    block * 128 + col * TILE,
                    cat.band * 64 + row * TILE,
                    TILE, TILE,
                    Math.round(cat.x), Math.round(cat.y),
                    CAT_SIZE, CAT_SIZE,
                );
            }
        };

        const frame = (now) => {
            loopId = 0;
            if (!visible || !cats) return;
            if (lastTime && now - lastTime < 1000 / MAX_FPS - 1) {
                loopId = requestAnimationFrame(frame);
                return;
            }
            // clamp dt so cats don't teleport after the tab was in the background
            const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.1) : 0;
            lastTime = now;

            for (const cat of cats) {
                stepCat(cat, dt, width, height);
                if (cat.state === 'idle') continue;
                const footX = cat.x + CAT_SIZE / 2;
                const footY = cat.y + CAT_SIZE * 0.8;
                for (const c of coffee) {
                    if (c.tipped <= 0 && hits(c, COFFEE_SIZE, footX, footY)) c.tipped = 2000;
                }
            }
            for (const c of coffee) if (c.tipped > 0) c.tipped -= dt * 1000;

            draw();
            loopId = requestAnimationFrame(frame);
        };

        const start = () => {
            if (!visible || !cats) return;
            if (reducedMotion) {
                // static picture; redraw a few times while sprite sheets finish loading
                window.clearTimeout(loopId);
                let n = 0;
                const still = () => {
                    loopId = 0;
                    if (!visible || !cats) return;
                    draw();
                    if (++n < 12) loopId = window.setTimeout(still, 250);
                };
                still();
                return;
            }
            if (loopId) return;
            lastTime = 0;
            loopId = requestAnimationFrame(frame);
        };

        const stop = () => {
            if (!loopId) return;
            if (reducedMotion) window.clearTimeout(loopId);
            else cancelAnimationFrame(loopId);
            loopId = 0;
        };

        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            applySize();
            if (visible) start();
            else stop();
        }, {rootMargin: '200px'});
        io.observe(canvas);

        const ro = new ResizeObserver(() => {
            applySize();
            start();
        });
        ro.observe(canvas);

        const toLocal = (event) => {
            const rect = canvas.getBoundingClientRect();
            return [event.clientX - rect.left, event.clientY - rect.top];
        };
        const catAt = (px, py) => {
            if (!cats) return null;
            for (let i = cats.length - 1; i >= 0; i--) {
                if (cats[i].sheet.ready && hits(cats[i], CAT_SIZE, px, py)) return cats[i];
            }
            return null;
        };

        const onMove = (event) => {
            const cursor = catAt(...toLocal(event)) ? 'pointer' : '';
            if (canvas.style.cursor !== cursor) canvas.style.cursor = cursor;
        };
        const onClick = (event) => {
            const cat = catAt(...toLocal(event));
            if (!cat) return;
            playMeow();
            if (cat.state !== 'idle') {
                setMoving(cat, width, height, 'running');
                return;
            }
            // startled: get up from wherever the pose currently is (double speed), then run off
            const last = cat.idle.length - 1;
            const shown = cat.phase === 'enter'
                ? Math.min(Math.floor(cat.animTime * SPRITE_FPS), last)
                : cat.phase === 'hold' ? last : last - Math.floor(cat.animTime * SPRITE_FPS);
            cat.phase = 'exit';
            cat.animTime = (last - Math.max(shown, 0)) / SPRITE_FPS;
            cat.startled = true;
        };
        canvas.addEventListener('mousemove', onMove, {passive: true});
        canvas.addEventListener('click', onClick);

        return () => {
            stop();
            io.disconnect();
            ro.disconnect();
            canvas.removeEventListener('mousemove', onMove);
            canvas.removeEventListener('click', onClick);
            canvas.width = 0;
            canvas.height = 0;
        };
    }, [numberOfCats]);

    return <canvas ref={canvasRef} className="cat-animation-canvas" aria-hidden="true"/>;
};

CatAnimation.propTypes = {
    numberOfCats: PropTypes.number.isRequired,
};

export default CatAnimation;
