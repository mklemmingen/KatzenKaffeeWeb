/*
 * Synthesised cat meows (Web Audio API, no audio files).
 *
 * A pulse-wave "voice" with a rising/falling pitch contour is shaped by three moving
 * vowel resonances, a nasal murmur (~300 Hz), a moving anti-resonance (~1-1.35 kHz)
 * and a nasal twang (~2.9 kHz). A lowpass that opens quickly gives the "m" onset.
 *
 * Self-contained so it can move into a package unchanged.
 */

export const MEOW_PRESETS = {
    meow: {nasal: 70, bright: 70, pitch: 100, length: 75, whine: 40},
    kittenMew: {nasal: 60, bright: 80, pitch: 160, length: 40, whine: 30},
    whinyMeow: {nasal: 90, bright: 75, pitch: 115, length: 120, whine: 90},
    shortMew: {nasal: 75, bright: 65, pitch: 105, length: 32, whine: 10},
};

const PRESET_LIST = Object.values(MEOW_PRESETS);

let ctx = null;
let output = null;
let noise = null;
const waves = new Map();
const MAX_VOICES = 4;
let activeVoices = 0;

function getContext() {
    if (typeof window === 'undefined') return null;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    if (!ctx) {
        ctx = new Ctx();
        const comp = ctx.createDynamicsCompressor();
        comp.threshold.value = -18;
        comp.ratio.value = 4;
        const master = ctx.createGain();
        master.gain.value = 0.8;
        comp.connect(master).connect(ctx.destination);
        output = comp; // voices feed the compressor
        // one shared 2 s noise buffer; voices play random offsets of it
        const len = ctx.sampleRate * 2;
        noise = ctx.createBuffer(1, len, ctx.sampleRate);
        const d = noise.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    return ctx;
}

// pulse wave, duty quantised so at most a handful of PeriodicWaves ever exist
function pulseWave(c, duty) {
    const key = Math.round(duty * 20);
    let wave = waves.get(key);
    if (!wave) {
        const n = 48;
        const re = new Float32Array(n);
        const im = new Float32Array(n);
        const dq = key / 20;
        for (let k = 1; k < n; k++) im[k] = (2 / (k * Math.PI)) * Math.sin(k * Math.PI * dq);
        wave = c.createPeriodicWave(re, im);
        waves.set(key, wave);
    }
    return wave;
}

function filter(c, type, freq, q, gain = 0) {
    const f = c.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    f.gain.value = gain;
    return f;
}

const rand = (a, b) => a + Math.random() * (b - a);

/**
 * Play one meow. `settings` uses the same 0-100 / percent scales as the tuner:
 * nasal, bright, whine 0-100; pitch in % (100 = ~480 Hz start); length in centiseconds.
 * Without settings a random preset is used. Must be called from a user gesture the
 * first time (browser autoplay rules). Returns false if audio is unavailable.
 */
export function playMeow(settings) {
    const c = getContext();
    if (!c || activeVoices >= MAX_VOICES) return false;
    const P = settings || PRESET_LIST[Math.floor(Math.random() * PRESET_LIST.length)];

    const t = c.currentTime + 0.02;
    const dur = (P.length / 100) * rand(0.92, 1.08);
    const p = (P.pitch / 100) * rand(0.95, 1.05);
    const nas = P.nasal / 100;
    const br = P.bright / 100;
    const wh = P.whine / 100;

    // voice
    const osc = c.createOscillator();
    osc.setPeriodicWave(pulseWave(c, 0.5 - 0.38 * br));
    const f = osc.frequency;
    const top = 1.55 + wh * 0.5;
    f.setValueAtTime(480 * p, t);
    f.exponentialRampToValueAtTime(480 * p * top, t + dur * (0.3 + wh * 0.15));
    f.setValueAtTime(480 * p * top, t + dur * (0.38 + wh * 0.2));
    f.exponentialRampToValueAtTime(380 * p, t + dur);

    const vib = c.createOscillator();
    const vibDepth = c.createGain();
    vib.frequency.value = rand(5, 8);
    vibDepth.gain.value = 10 * p * (0.5 + wh);
    vib.connect(vibDepth).connect(f);

    // breath
    const nz = c.createBufferSource();
    nz.buffer = noise;
    const nzGain = c.createGain();
    nzGain.gain.value = 0.04 + 0.04 * br;

    const src = c.createGain();
    osc.connect(src);
    nz.connect(filter(c, 'highpass', 2500, 0.7)).connect(nzGain).connect(src);

    // vowel resonances ("mi-a-ow")
    const F1 = filter(c, 'peaking', 900, 2.2, 10);
    const F2 = filter(c, 'peaking', 2000, 3, 9);
    const F3 = filter(c, 'peaking', 3600, 4, 6 + 6 * br);
    F1.frequency.setValueAtTime(700, t);
    F1.frequency.linearRampToValueAtTime(1300, t + dur * 0.35);
    F1.frequency.linearRampToValueAtTime(800, t + dur);
    F2.frequency.setValueAtTime(1900, t);
    F2.frequency.linearRampToValueAtTime(2500, t + dur * 0.3);
    F2.frequency.linearRampToValueAtTime(1300, t + dur);

    // nasality
    const murmur = filter(c, 'peaking', 300, 2.5, 4 + 10 * nas);
    const twang = filter(c, 'peaking', 2900, 5, 4 + 12 * nas);
    const anti = filter(c, 'notch', 1150, 3 + 5 * nas);
    anti.frequency.setValueAtTime(1000, t);
    anti.frequency.linearRampToValueAtTime(1350, t + dur * 0.5);
    anti.frequency.linearRampToValueAtTime(1100, t + dur);
    const shelf = filter(c, 'highshelf', 3000, 0.7, -6 + 18 * br);

    const mix = c.createGain();
    const antiMix = c.createGain();
    antiMix.gain.value = nas;
    const bypass = c.createGain();
    bypass.gain.value = 1 - nas;
    src.connect(filter(c, 'highpass', 220, 0.7))
        .connect(F1).connect(F2).connect(F3).connect(murmur).connect(twang).connect(shelf);
    shelf.connect(anti).connect(antiMix).connect(mix);
    shelf.connect(bypass).connect(mix);

    // mouth opening ("m" onset) and closing
    const mouth = filter(c, 'lowpass', 500, 0.7);
    mouth.frequency.setValueAtTime(500, t);
    mouth.frequency.exponentialRampToValueAtTime(12000, t + 0.08 + 0.04 * nas);
    mouth.frequency.setValueAtTime(12000, t + dur * 0.75);
    mouth.frequency.exponentialRampToValueAtTime(2500, t + dur);

    const env = c.createGain();
    env.gain.setValueAtTime(0.0001, t);
    env.gain.exponentialRampToValueAtTime(0.09, t + 0.05);
    env.gain.setValueAtTime(0.09, t + dur * 0.65);
    env.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    mix.connect(mouth).connect(env).connect(output);

    const end = t + dur + 0.05;
    osc.start(t);
    vib.start(t);
    nz.start(t, Math.random() * Math.max(0, noise.duration - dur - 0.1));
    osc.stop(end);
    vib.stop(end);
    nz.stop(end);

    activeVoices++;
    osc.onended = () => {
        activeVoices--;
        env.disconnect(); // lets the whole voice graph be garbage-collected
    };
    return true;
}
