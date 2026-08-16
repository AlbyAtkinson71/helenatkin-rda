#!/usr/bin/env node
// scripts/generate-thumbnails.js
// For every article with a featured `image:`, generates a properly-sized
// thumbnail variant for card grids (NewsCard), and automatically adds an
// `imageThumb:` field to that article's frontmatter.
//
// Run with: npm run generate-thumbnails

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const contentDir = path.join(process.cwd(), 'content', 'news');
const imagesDir = path.join(process.cwd(), 'public', 'images');
const thumbWidth = 700; // Plenty for a card thumbnail, even on retina screens
const quality = 75;

async function run() {
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'));
  let updated = 0;
  let skipped = 0;

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('imageThumb:')) {
      console.log(`⏭  Skipping ${file}: already has imageThumb`);
      skipped++;
      continue;
    }

    const imageMatch = content.match(/^image:\s*"([^"]+)"/m);
    if (!imageMatch || !imageMatch[1]) {
      console.log(`⏭  Skipping ${file}: no image field`);
      skipped++;
      continue;
    }

    const imagePath = imageMatch[1]; // e.g. "/images/defibrillator1.webp"
    const filename = path.basename(imagePath);
    const ext = path.extname(filename);
    const baseName = path.basename(filename, ext);
    const inputPath = path.join(imagesDir, filename);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skipping ${file}: source image not found (${filename})`);
      skipped++;
      continue;
    }

    const thumbFilename = `${baseName}-card.webp`;
    const thumbOutputPath = path.join(imagesDir, thumbFilename);

    if (!fs.existsSync(thumbOutputPath)) {
      await sharp(inputPath)
        .resize({ width: thumbWidth })
        .webp({ quality })
        .toFile(thumbOutputPath);
    }

    const thumbWebPath = `/images/${thumbFilename}`;

    const newContent = content.replace(
      /^(image:\s*"[^"]+")/m,
      `$1\nimageThumb: "${thumbWebPath}"`
    );

    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`✅ ${file}: added imageThumb -> ${thumbWebPath}`);
    updated++;
  }

  console.log(`\nDone. Updated ${updated} article(s), skipped ${skipped}.`);
}

run();
