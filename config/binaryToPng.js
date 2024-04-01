const fs = require('fs');
const sharp = require('sharp');

async function binaryToPng(binaryData, outputPath) {
    try {
        await sharp(binaryData)
            .png()
            .toFile(outputPath);
        console.log('Image PNG créée avec succès');
    } catch (error) {
        console.error('Erreur lors de la conversion en image PNG :', error);
    }
}

module.exports = binaryToPng;
