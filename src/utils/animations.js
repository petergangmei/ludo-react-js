/**
 * Animations Utility
 * 
 * This module provides utility functions for animations in the game.
 */

/**
 * Generate CSS keyframes for token movement animation
 * 
 * @param {Object} startPos - Starting position {row, col}
 * @param {Object} endPos - Ending position {row, col}
 * @returns {string} CSS keyframes string
 */
export const generateMoveKeyframes = (startPos, endPos) => {
  return `
    @keyframes token-move {
      0% {
        transform: translate(${startPos.col * 100}%, ${startPos.row * 100}%);
      }
      100% {
        transform: translate(${endPos.col * 100}%, ${endPos.row * 100}%);
      }
    }
  `;
};

/**
 * Generate CSS for a bounce animation
 * 
 * @returns {string} CSS keyframes string
 */
export const generateBounceKeyframes = () => {
  return `
    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20px);
      }
    }
  `;
};

/**
 * Generate CSS for a pulse animation
 * 
 * @returns {string} CSS keyframes string
 */
export const generatePulseKeyframes = () => {
  return `
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
    }
  `;
};

/**
 * Generate CSS for a shake animation
 * 
 * @returns {string} CSS keyframes string
 */
export const generateShakeKeyframes = () => {
  return `
    @keyframes shake {
      0%, 100% {
        transform: translateX(0);
      }
      10%, 30%, 50%, 70%, 90% {
        transform: translateX(-5px);
      }
      20%, 40%, 60%, 80% {
        transform: translateX(5px);
      }
    }
  `;
};

/**
 * Generate CSS for a spin animation
 * 
 * @returns {string} CSS keyframes string
 */
export const generateSpinKeyframes = () => {
  return `
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;
};

/**
 * Check if animations are enabled in settings
 * 
 * @returns {boolean} Whether animations are enabled
 */
export const areAnimationsEnabled = () => {
  return localStorage.getItem('ludoAnimationsEnabled') !== 'false';
};

/**
 * Toggle animations on/off
 * 
 * @param {boolean} enabled - Whether animations should be enabled
 */
export const toggleAnimations = (enabled) => {
  localStorage.setItem('ludoAnimationsEnabled', enabled.toString());
}; 