/**
 * Sound Effects Utility
 * 
 * This module manages sound effects for the game.
 * It provides functions for loading and playing sounds.
 */

// Sound effect URLs - these would be replaced with actual sound files
const SOUND_URLS = {
  diceRoll: '/sounds/dice-roll.mp3',
  tokenMove: '/sounds/token-move.mp3',
  tokenCapture: '/sounds/token-capture.mp3',
  tokenHome: '/sounds/token-home.mp3',
  gameWin: '/sounds/game-win.mp3',
  gameLose: '/sounds/game-lose.mp3',
  buttonClick: '/sounds/button-click.mp3',
};

// Cache for loaded sounds
const soundCache = {};

/**
 * Load a sound from URL
 * 
 * @param {string} soundName - The name of the sound to load
 * @returns {Promise<HTMLAudioElement>} A promise that resolves to the loaded audio element
 */
export const loadSound = async (soundName) => {
  if (!SOUND_URLS[soundName]) {
    console.warn(`Sound "${soundName}" not found`);
    return null;
  }
  
  if (soundCache[soundName]) {
    return soundCache[soundName];
  }
  
  try {
    const audio = new Audio(SOUND_URLS[soundName]);
    await new Promise((resolve, reject) => {
      audio.addEventListener('canplaythrough', resolve);
      audio.addEventListener('error', reject);
      audio.load();
    });
    
    soundCache[soundName] = audio;
    return audio;
  } catch (error) {
    console.error(`Failed to load sound "${soundName}":`, error);
    return null;
  }
};

/**
 * Play a sound effect
 * 
 * @param {string} soundName - The name of the sound to play
 * @param {number} volume - The volume level (0-1)
 * @returns {Promise<void>} A promise that resolves when the sound starts playing
 */
export const playSound = async (soundName, volume = 1.0) => {
  // Check if sound is enabled in settings
  const soundEnabled = localStorage.getItem('ludoSoundEnabled') !== 'false';
  if (!soundEnabled) {
    return;
  }
  
  try {
    const audio = await loadSound(soundName);
    if (audio) {
      audio.volume = volume;
      audio.currentTime = 0;
      await audio.play();
    }
  } catch (error) {
    console.error(`Failed to play sound "${soundName}":`, error);
  }
};

/**
 * Preload all game sounds
 * 
 * @returns {Promise<void>} A promise that resolves when all sounds are loaded
 */
export const preloadSounds = async () => {
  const promises = Object.keys(SOUND_URLS).map(soundName => loadSound(soundName));
  await Promise.all(promises);
};

/**
 * Toggle sound on/off
 * 
 * @param {boolean} enabled - Whether sound should be enabled
 */
export const toggleSound = (enabled) => {
  localStorage.setItem('ludoSoundEnabled', enabled.toString());
};

/**
 * Check if sound is enabled
 * 
 * @returns {boolean} Whether sound is enabled
 */
export const isSoundEnabled = () => {
  return localStorage.getItem('ludoSoundEnabled') !== 'false';
}; 