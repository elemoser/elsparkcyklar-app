/**
 * @module utils.js
 */

/**
 * @function upperFirst
 * @param {*} string String to modify
 * @returns the provided string with the first letter as uppercase.
 */
function upperFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * @function isValidCoordinates
 * @param {*} coordinates 
 * @description regex för att kontrollera formatet på cykelns koordinater. Endast: '59.3293, 18.0686'-format bör passera
 * @returns True / False
 */
function isValidCoordinates(coordinates) {
    const coordinatesPattern = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
    return coordinatesPattern.test(coordinates);
}

/**
 * @function getRandomInt
 * @param {Integer} min 
 * @param {Integer} max 
 * @returns Int
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = { upperFirst, isValidCoordinates, getRandomInt }