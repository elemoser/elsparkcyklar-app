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

// Funktion för att kontrollera om cykeln är parkerad inom något parkeringsområde
async function isParked(bikePosition, parkingAreas) {
    const [bikeLat, bikeLong] = bikePosition.split(", ").map(Number);

    // Loopa igenom alla parkeringsområden
    for (const parkingArea of parkingAreas) {
        const [centerLat, centerLong] = parkingArea.center
            .split(", ")
            .map(Number);
        const radius = parkingArea.radius;

        // Beräkna avståndet mellan cykelns position och parkeringsområdets mittpunkt
        const distance = haversine(bikeLat, bikeLong, centerLat, centerLong);
        console.log(distance);

        // Om avståndet är mindre än eller lika med radien, är cykeln parkerad inom området
        if (distance <= radius) {
            return parkingArea;
        }
    }

    // Cykeln är inte parkerad inom något parkeringsområde
    return null;
}

//Haversine-formula
function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Jordens radie i kilometer
    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degToRad(lat1)) *
            Math.cos(degToRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Avståndet i kilometer

    return distance * 1000; // Konvertera till meter
}

//degrees to radius
function degToRad(deg) {
    return deg * (Math.PI / 180);
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

module.exports = { upperFirst, getRandomInt, isParked };
