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
function isValidCoordinates(coordinates, coordinatesPattern) {
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

module.exports = { upperFirst, isValidCoordinates, getRandomInt };
