"use client";

import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import '../_styles/BirdAnimation.css';

/*
 * Bird sheets are 64x64: 4 rows x 4 columns of 16px tiles, birds face west.
 *   row 0: flying (4 frames)
 *   row 1: standing, wings up, hit (col 3)
 *   row 2: hopping / pecking (4 frames)
 *   row 3: resting (4 frames)
 */
const TILE = 16;
const SCALE = 2;
const SIZE = TILE * SCALE;
const MAX_FPS = 30;

const BIRD_SHEETS = [
    'blue jay', 'cardinal', 'cedar waxwing', 'chickadee', 'crow', 'house finch',
    'hummingbird', 'magpie', 'red robin', "steller's jay", 'white_dove', 'wood_thrush',
].map(name => `url("${encodeURI(`/assets/birds/spritesheet_${name}.png`)}")`);

const BIRD_SOUNDS = [1, 2, 3, 4].map(n => `/assets/birds/bird${n}.mp3`);

const ANIMS = {
    flying: {row: 0, cols: [0, 1, 2, 3], fps: 10, speed: 70},
    pecking: {row: 2, cols: [0, 1, 2, 3], fps: 4, speed: 0},
    resting: {row: 3, cols: [0, 1, 2, 3], fps: 3, speed: 0},
    hit: {row: 1, cols: [3], fps: 1, speed: 0},
};

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function playChirp() {
    const audio = new Audio(pick(BIRD_SOUNDS));
    audio.volume = 0.5;
    audio.play().catch(() => { /* autoplay blocked: stay silent */ });
}

const BirdAnimation = ({numberOfBirds}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return undefined;

        const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        let width = container.clientWidth;
        let height = container.clientHeight;
        let visible = false;
        let rafId = 0;
        let lastTime = 0;

        const randomPos = () => [
            Math.random() * Math.max(0, width - SIZE),
            Math.random() * Math.max(0, height - SIZE),
        ];

        const setState = (bird, state, timer = 0) => {
            bird.state = state;
            bird.animTime = 0;
            bird.timer = timer;
            bird.tile = -1; // force a background-position update
        };

        const takeOff = (bird, speedFactor = 1) => {
            [bird.tx, bird.ty] = randomPos();
            bird.speedFactor = speedFactor;
            setState(bird, 'flying');
        };

        const land = (bird) => {
            setState(bird, Math.random() < 0.5 ? 'pecking' : 'resting', 3000 + Math.random() * 6000);
        };

        // DOM elements are created once and moved with transforms: no React re-render per frame
        const fragment = document.createDocumentFragment();
        const birds = Array.from({length: numberOfBirds}, () => {
            const el = document.createElement('div');
            el.className = 'bird-animation-frame';
            el.style.backgroundImage = pick(BIRD_SHEETS);
            fragment.appendChild(el);
            const [x, y] = randomPos();
            const bird = {el, x, y, tx: x, ty: y, mirrored: Math.random() < 0.5, speedFactor: 1};
            if (Math.random() < 0.6) land(bird);
            else takeOff(bird);
            bird.animTime = Math.random() * 4;
            return bird;
        });
        container.appendChild(fragment);

        const render = (bird) => {
            const anim = ANIMS[bird.state];
            const col = anim.cols[Math.floor(bird.animTime * anim.fps) % anim.cols.length];
            const tile = anim.row * 4 + col;
            if (tile !== bird.tile) {
                bird.tile = tile;
                bird.el.style.backgroundPosition = `-${col * SIZE}px -${anim.row * SIZE}px`;
            }
            bird.el.style.transform =
                `translate3d(${Math.round(bird.x)}px, ${Math.round(bird.y)}px, 0)${bird.mirrored ? ' scaleX(-1)' : ''}`;
        };

        const step = (bird, dt) => {
            bird.animTime += dt;
            const anim = ANIMS[bird.state];
            if (anim.speed === 0) {
                bird.timer -= dt * 1000;
                if (bird.timer <= 0) {
                    if (bird.state === 'hit') takeOff(bird, 2.5);
                    else if (Math.random() < 0.25) setState(bird, bird.state === 'pecking' ? 'resting' : 'pecking', 2000 + Math.random() * 4000);
                    else takeOff(bird);
                }
                return;
            }
            const dx = bird.tx - bird.x;
            const dy = bird.ty - bird.y;
            const dist = Math.hypot(dx, dy);
            const move = anim.speed * bird.speedFactor * dt;
            if (Math.abs(dx) > 1) bird.mirrored = dx > 0; // sheet faces west; mirror to face east
            if (dist <= move) {
                bird.x = bird.tx;
                bird.y = bird.ty;
                land(bird);
            } else {
                bird.x += (dx / dist) * move;
                bird.y += (dy / dist) * move;
            }
        };

        const frame = (now) => {
            rafId = 0;
            if (!visible) return;
            if (lastTime && now - lastTime < 1000 / MAX_FPS - 1) {
                rafId = requestAnimationFrame(frame);
                return;
            }
            const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.1) : 0;
            lastTime = now;
            for (const bird of birds) {
                step(bird, dt);
                render(bird);
            }
            rafId = requestAnimationFrame(frame);
        };

        const start = () => {
            if (rafId || !visible) return;
            if (reducedMotion) {
                birds.forEach(render);
                return;
            }
            lastTime = 0;
            rafId = requestAnimationFrame(frame);
        };
        const stop = () => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = 0;
        };

        birds.forEach(render);

        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) start();
            else stop();
        }, {rootMargin: '200px'});
        io.observe(container);

        const ro = new ResizeObserver(() => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            if (!w || !h || (w === width && h === height)) return;
            const sx = width ? w / width : 1;
            const sy = height ? h / height : 1;
            width = w;
            height = h;
            for (const bird of birds) {
                bird.x = Math.min(bird.x * sx, w - SIZE);
                bird.y = Math.min(bird.y * sy, h - SIZE);
                bird.tx = Math.min(bird.tx * sx, w - SIZE);
                bird.ty = Math.min(bird.ty * sy, h - SIZE);
                render(bird);
            }
        });
        ro.observe(container);

        const onClick = (event) => {
            const bird = birds.find(b => b.el === event.target);
            if (!bird || bird.state === 'hit') return;
            playChirp();
            setState(bird, 'hit', 250);
            render(bird);
        };
        container.addEventListener('click', onClick);

        return () => {
            stop();
            io.disconnect();
            ro.disconnect();
            container.removeEventListener('click', onClick);
            birds.forEach(b => b.el.remove());
        };
    }, [numberOfBirds]);

    return <div ref={containerRef} className="bird-animation-container" aria-hidden="true"/>;
};

BirdAnimation.propTypes = {
    numberOfBirds: PropTypes.number.isRequired
};

export default BirdAnimation;
