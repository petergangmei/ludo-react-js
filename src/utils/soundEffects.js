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
// Flag to track if we've shown the warning about missing sound files
let hasShownMissingSoundWarning = false;

/**
 * Load a sound from URL
 * 
 * @param {string} soundName - The name of the sound to load
 * @returns {Promise<HTMLAudioElement|null>} A promise that resolves to the loaded audio element or null if loading fails
 */
export const loadSound = async (soundName) => {
  if (!SOUND_URLS[soundName]) {
    console.warn(`Sound "${soundName}" not found in SOUND_URLS`);
    return null;
  }
  
  if (soundCache[soundName]) {
    return soundCache[soundName];
  }
  
  try {
    const audio = new Audio(SOUND_URLS[soundName]);
    
    // Set up a timeout to avoid hanging if the file doesn't exist
    const loadPromise = new Promise((resolve, reject) => {
      audio.addEventListener('canplaythrough', () => resolve(audio));
      audio.addEventListener('error', (e) => {
        // Only show the warning once to avoid console spam
        if (!hasShownMissingSoundWarning) {
          console.warn('Sound files are missing. This is expected in development if you haven\'t added the actual sound files yet.');
          hasShownMissingSoundWarning = true;
        }
        resolve(null); // Resolve with null instead of rejecting
      });
      
      // Set a timeout in case the file doesn't exist
      setTimeout(() => resolve(null), 1000);
      
      audio.load();
    });
    
    const loadedAudio = await loadPromise;
    if (loadedAudio) {
      soundCache[soundName] = loadedAudio;
    }
    return loadedAudio;
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
 * @returns {Promise<void>} A promise that resolves when the sound starts playing or immediately if sound can't be played
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
      await audio.play().catch(err => {
        // Autoplay might be blocked by browser policy
        console.warn(`Couldn't play sound "${soundName}":`, err);
      });
    }
  } catch (error) {
    // Silently fail - we don't want sound errors to break the game
    console.debug(`Failed to play sound "${soundName}":`, error);
  }
};

/**
 * Preload all game sounds
 * 
 * @returns {Promise<void>} A promise that resolves when all sounds are loaded or loading attempts are complete
 */
export const preloadSounds = async () => {
  try {
    const promises = Object.keys(SOUND_URLS).map(soundName => loadSound(soundName));
    await Promise.all(promises);
  } catch (error) {
    console.warn('Failed to preload some sounds:', error);
  }
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