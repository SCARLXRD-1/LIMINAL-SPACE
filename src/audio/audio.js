const VOLUME_STEP = 0.1;

export function createAudio() {
  let context = null;
  let masterGain = null;
  let started = false;
  let volume = 0.5;
  let muted = false;

  const applyGain = () => {
    if (!context || !masterGain) {
      return;
    }
    const target = muted ? 0 : volume;
    void masterGain.gain.setTargetAtTime(target, context.currentTime, 0.1);
  };

  const start = () => {
    if (started) {
      if (context && context.state === 'suspended') {
        void context.resume();
      }
      return;
    }

    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
    context = new AudioContextConstructor();
    masterGain = context.createGain();
    masterGain.gain.value = muted ? 0 : volume;

    const filter = context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 220;

    const noiseBuffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let index = 0; index < noiseData.length; index += 1) {
      noiseData[index] = Math.random() * 2 - 1;
    }

    const source = context.createBufferSource();
    source.buffer = noiseBuffer;
    source.loop = true;

    const sourceGain = context.createGain();
    sourceGain.gain.value = 0.4;

    source.connect(sourceGain);
    sourceGain.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(context.destination);
    source.start();

    started = true;
  };

  const stop = () => {
    if (context && context.state === 'running') {
      void context.suspend();
    }
    started = false;
  };

  const update = () => {
    if (started && context && context.state === 'suspended') {
      void context.resume();
    }
  };

  const setVolume = (value) => {
    volume = Math.min(1, Math.max(0, value));
    if (volume > 0) {
      muted = false;
    }
    applyGain();
    return volume;
  };

  const changeVolume = (delta) => setVolume(volume + delta);

  const toggleMute = () => {
    muted = !muted;
    applyGain();
    return muted;
  };

  return {
    start,
    stop,
    update,
    setVolume,
    changeVolume,
    toggleMute,
    get volume() {
      return volume;
    },
    get muted() {
      return muted;
    },
    get started() {
      return started;
    },
  };
}