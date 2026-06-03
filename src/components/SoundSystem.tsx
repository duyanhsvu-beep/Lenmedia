import { Volume2, VolumeX } from "lucide-react";

let audioCtx: AudioContext | null = null;
let ambientSynthInterval: any = null;
let noiseGenerator: AudioWorkletNode | ScriptProcessorNode | null = null;
let lpFilter: BiquadFilterNode | null = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

// Play a cinematic low frequency boom (Subkick drop)
export function playSubDrop() {
  try {
    initAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // Hardstyle raw shape
    osc.type = "sawtooth";
    filter.type = "lowpass";
    
    // Frequency sweep down
    osc.frequency.setValueAtTime(140, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(32, audioCtx.currentTime + 1.2);

    // Filter sweep down to make it sound muddy, warm, and massive
    filter.frequency.setValueAtTime(300, audioCtx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(70, audioCtx.currentTime + 1.0);

    // Gain envelope
    gainNode.gain.setValueAtTime(0.4, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);

    osc.start();
    osc.stop(audioCtx.currentTime + 1.6);
  } catch (e) {
    console.warn("Web Audio API not fully initialized yet: ", e);
  }
}

// Play a high laser riser sound
export function playLaserSweep() {
  try {
    initAudio();
    if (!audioCtx) return;

    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc1.type = "sine";
    osc2.type = "triangle";

    osc1.frequency.setValueAtTime(400, audioCtx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(1500, audioCtx.currentTime + 0.6);

    osc2.frequency.setValueAtTime(410, audioCtx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(1550, audioCtx.currentTime + 0.6);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);

    osc1.start();
    osc2.start();
    osc1.stop(audioCtx.currentTime + 0.7);
    osc2.stop(audioCtx.currentTime + 0.7);
  } catch (e) {
    console.warn(e);
  }
}

// Play a high energy modern EDM supersaw chord melody sequence
export function playEdmMelody() {
  try {
    initAudio();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;
    const notes = [
      261.63, // C4
      311.13, // Eb4
      349.23, // F4
      392.00, // G4
      466.16, // Bb4
      523.25, // C5
    ];

    // Simple raw-ish melody
    const sequence = [1, 3, 4, 3, 5, 4, 3, 0];
    const duration = 0.25;

    sequence.forEach((noteIdx, order) => {
      const osc = audioCtx!.createOscillator();
      const osc2 = audioCtx!.createOscillator();
      const filter = audioCtx!.createBiquadFilter();
      const gainNode = audioCtx!.createGain();

      osc.type = "sawtooth";
      osc2.type = "triangle";

      const frequency = notes[noteIdx];
      osc.frequency.setValueAtTime(frequency, now + order * duration);
      // Detune slightly for high end EDM Supersaw depth
      osc.detune.setValueAtTime(-15, now + order * duration);
      osc2.frequency.setValueAtTime(frequency * 2, now + order * duration); // octave higher
      osc2.detune.setValueAtTime(15, now + order * duration);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(400, now + order * duration);
      filter.frequency.exponentialRampToValueAtTime(2000, now + order * duration + 0.05);

      osc.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtx!.destination);

      gainNode.gain.setValueAtTime(0, now + order * duration);
      gainNode.gain.linearRampToValueAtTime(0.1, now + order * duration + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + order * duration + duration - 0.02);

      osc.start(now + order * duration);
      osc2.start(now + order * duration);

      osc.stop(now + order * duration + duration);
      osc2.stop(now + order * duration + duration);
    });
  } catch (e) {
    console.warn(e);
  }
}

// Start generating deep drone/crowd base sweep
export function playAmbientSubText(active: boolean) {
  try {
    if (!active) {
      if (ambientSynthInterval) {
        clearInterval(ambientSynthInterval);
        ambientSynthInterval = null;
      }
      return;
    }

    initAudio();
    if (!audioCtx) return;

    // Loop trigger drone note every 3.5 seconds
    ambientSynthInterval = setInterval(() => {
      try {
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(45, audioCtx.currentTime); // 45hz deep rumble
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 1.0);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 3.2);

        osc.start();
        osc.stop(audioCtx.currentTime + 3.4);
      } catch (e) {}
    }, 3500);

  } catch (e) {
    console.warn(e);
  }
}
