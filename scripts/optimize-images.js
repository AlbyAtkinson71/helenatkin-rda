#!/usr/bin/env node
// scripts/optimize-images.js
// Converts all JPG/PNG images in public/images to resized, compressed WebP.
// Run with: npm run optimize-images
//
// Original files are NOT deleted automatically - this script only creates
// new .webp versions and writes a mapping file so references can be updated
// safely before anything is removed.

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imagesDir = path.join(process.cwd(), 'public', 'images');
const maxWidth = 1600; // Sensible upper bound for hero/featured images
const quality = 80;    // Good visual quality, big size reduction

const validExtensions = ['.jpg', '.jpeg', '.png'];

async function run() {
  const files = fs.readdirSync(imagesDir);
  const mapping = [];
  let totalBefore = 0;
  let totalAfter = 0;
  let processedCount = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!validExtensions.includes(ext)) continue;

    const inputPath = path.join(imagesDir, file);
    const baseName = path.basename(file, ext);
    const outputFile = `${baseName}.webp`;
    const outputPath = path.join(imagesDir, outputFile);

    const beforeSize = fs.statSync(inputPath).size;
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    let pipeline = image;
    if (metadata.width && metadata.width > maxWidth) {
      pipeline = pipeline.resize({ width: maxWidth });
    }

    await pipeline.webp({ quality }).toFile(outputPath);

    const afterSize = fs.statSync(outputPath).size;
    totalBefore += beforeSize;
    totalAfter += afterSize;
    processedCount++;

    mapping.push(`${file} -> ${outputFile}`);
    console.log(
      `${file} (${(beforeSize / 1024).toFixed(0)}KB) -> ${outputFile} (${(afterSize / 1024).toFixed(0)}KB)`
    );
  }

  const mappingPath = path.join(process.cwd(), 'image-optimization-mapping.txt');
  fs.writeFileSync(mappingPath, mapping.join('\n'));

  console.log(`\n✅ Processed ${processedCount} images`);
  console.log(
    `Total size: ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB`
  );
  console.log(`\nMapping saved to: image-optimization-mapping.txt`);
  console.log(`Original files were NOT deleted. Next steps:`);
  console.log(`  1. Review the .webp files look correct`);
  console.log(`  2. Run the reference-update script to update your content`);
  console.log(`  3. Test the site locally`);
  console.log(`  4. Only then delete the original files`);
}

run();
