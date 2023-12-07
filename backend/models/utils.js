
function upperFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function isValidCoordinates(coordinates) {
    const coordinatesPattern = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
    return coordinatesPattern.test(coordinates);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = { upperFirst, isValidCoordinates, getRandomInt }