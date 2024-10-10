const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = './'; // Current directory
const oldDir = './old'; // Directory to store old files
const tempDir = './temp'; // Temporary directory for intermediate files

// Ensure the old and temp directories exist
if (!fs.existsSync(oldDir)) {
    fs.mkdirSync(oldDir);
}
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

// Function to copy the original image to the old directory
const copyOriginalImage = (filePath) => {
    const fileName = path.basename(filePath);
    const oldFilePath = path.join(oldDir, fileName);

    fs.copyFileSync(filePath, oldFilePath);
};

// Function to process a single image
const processImage = (filePath) => {
    const fileName = path.basename(filePath);
    const tempFilePath = path.join(tempDir, fileName);

    // Copy the original image to the old directory
    copyOriginalImage(filePath);

    // Remove the top 32 pixels and save to a temporary file
    sharp(filePath)
        .extract({ width: 768, height: 512, left: 0, top: 32 })
        .toFile(tempFilePath)
        .then(() => {
            // Move the processed file from temp to the original location
            fs.renameSync(tempFilePath, filePath);
            console.log(`Processed ${fileName}`);
        })
        .catch(err => {
            console.error(`Error processing ${fileName}:`, err);
        });
};

// Read all files in the directory
fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    // Filter PNG files and process each one
    files.filter(file => path.extname(file).toLowerCase() === '.png')
        .forEach(file => processImage(path.join(inputDir, file)));
});
