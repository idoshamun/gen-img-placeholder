'use strict';

const glob = require('glob');
const sharp = require('sharp');

/**
 * Generates a placeholder of a given image
 * @param {String} fileName Image file name
 * @param {Number} size Size in percentage of the placeholder
 * @returns {Promise.<String>} Promise of the base64 image placeholder
 */
function generatePlaceholder(fileName, size) {
    const image = sharp(fileName);
    return image
        .metadata()
        .then(metadata => image
            .resize(Math.round(metadata.width * size / 100))
            .toFormat(metadata.format)
            .toBuffer()
            .then(data => `data:image/${metadata.format};base64,${data.toString('base64')}`)
        );
}

/**
 *
 * @param {String[]} fileNames Array of file names to generate placeholders
 * @param {Number} size Size in percentage of the placeholder
 */
function generatePlaceholders(fileNames, size) {
    const promises = [];
    fileNames.forEach(fileName => promises.push(
        generatePlaceholder(fileName, size)
            .then(placholder => {
                return { [fileName]: placholder };
            })
    ));

    return Promise.all(promises)
        .then(values => values.reduce((res, value) => Object.assign({}, res, value), {}))
}

module.exports = {
    generatePlaceholder,
    generatePlaceholders
};