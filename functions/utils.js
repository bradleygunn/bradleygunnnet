/**
 * @description transforms the timestamp into a Date object
 * @param {number} timestamp seconds
 * @returns {Date} Date
 */
exports.toDate = function(timestamp) {
    return new Date(timestamp * 1000);
}