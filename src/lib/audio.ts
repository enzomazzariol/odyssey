"use client";

/**
 * Synthesized audio engine — no asset downloads, everything generated
 * with WebAudio. Ambient: layered detuned drones + filtered noise.
 * SFX: short enveloped tones and noise sweeps.
 */
class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private started = false;
  private _muted = false;

  get muted() {
    return this._muted;
  }

  /** Must be called from a user gesture (autoplay policy) */
  init() {
    if (this.started || typeof window === "undefined") return;
    try {
      this.ctx = new AudioContext();
      this.master = this.ctx.createGain();
      this.master.gain.value = this._muted ? 0 : 1;
      this.master.connect(this.ctx.destination);
      this.startAmbient();
      this.started = true;
    } catch {
      // Audio unavailable — stay silent
    }
  }

  setMuted(muted: boolean) {
    this._muted = muted;
    if (this.ctx && this.master) {
      this.master.gain.setTargetAtTime(muted ? 0 : 1, this.ctx.currentTime, 0.15);
    }
  }

  private startAmbient() {
    const ctx = this.ctx!;
    this.ambientGain = ctx.createGain();
    this.ambientGain.gain.value = 0;
    this.ambientGain.connect(this.master!);
    // Slow fade-in
    this.ambientGain.gain.setTargetAtTime(0.5, ctx.currentTime, 4);

    // Deep detuned drones — slow beating between close frequencies
    const droneSpecs: Array<[OscillatorType, number, number]> = [
      ["sine", 55, 0.05],
      ["sine", 55.4, 0.04],
      ["triangle", 110.2, 0.018],
      ["sine", 164.8, 0.01],
    ];
    for (const [type, freq, gain] of droneSpecs) {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.value = gain;
      osc.connect(g);
      g.connect(this.ambientGain);
      osc.start();
    }

    // Filtered noise bed (solar wind)
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < data.length; i++) {
      // Brown-ish noise
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.value = 280;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.06;
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.ambientGain);
    noise.start();

    // Slow LFO breathing on the noise filter
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.05;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 120;
    lfo.connect(lfoGain);
    lfoGain.connect(noiseFilter.frequency);
    lfo.start();
  }

  private tone(freq: number, duration: number, gain: number, type: OscillatorType = "sine", slide = 0) {
    if (!this.ctx || !this.master || this._muted) return;
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    if (slide) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), ctx.currentTime + duration);
    }
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(gain, ctx.currentTime + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(g);
    g.connect(this.master);
    osc.start();
    osc.stop(ctx.currentTime + duration + 0.05);
  }

  hover() {
    this.tone(740, 0.09, 0.025, "sine", 120);
  }

  click() {
    this.tone(420, 0.16, 0.05, "sine", -160);
  }

  /** Camera approach — filtered noise sweep */
  whoosh() {
    if (!this.ctx || !this.master || this._muted) return;
    const ctx = this.ctx;
    const duration = 1.6;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = 1.2;
    filter.frequency.setValueAtTime(180, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + duration * 0.55);
    filter.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + duration);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.09, ctx.currentTime + duration * 0.35);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    src.connect(filter);
    filter.connect(g);
    g.connect(this.master);
    src.start();
  }
}

export const audio = new AudioEngine();
