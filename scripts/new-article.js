#!/usr/bin/env node
// scripts/new-article.js
// Run with: npm run new-article
// Prompts for a title and category, then creates a ready-to-edit
// markdown file in content/news/ with today's date and a proper slug.

import readline from 'readline';
import fs from 'fs';
import path from 'path';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')          // remove quotes/apostrophes
    .replace(/[^a-z0-9]+/g, '-')   // replace non-alphanumeric with dashes
    .replace(/^-+|-+$/g, '');      // trim leading/trailing dashes
}

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

async function main() {
  console.log('\n📝 New Article Creator\n');

  const title = await ask('Article title: ');
  const category = (await ask('Category (News/Events/Volunteers/Riders/Fundraising) [News]: ')) || 'News';
  const excerpt = await ask('Short excerpt (1-2 sentences for the card preview): ');

  const date = todayISO();
  const slug = slugify(title);
  const filename = `${date}-${slug}.md`;
  const filePath = path.join(process.cwd(), 'content', 'news', filename);

  if (fs.existsSync(filePath)) {
    console.log(`\n⚠️  A file already exists at content/news/${filename}`);
    rl.close();
    return;
  }

  const template = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${date}"
author: "Media"
slug: "${slug}"
excerpt: "${excerpt.replace(/"/g, '\\"')}"
category: "${category}"
tags: []
image: ""
imageAlt: ""
imagePosition: "center"
---

Write your opening paragraph here.

Add more paragraphs as needed - remember, a blank line between
each paragraph creates proper spacing.

Helen Atkin Group Buxton RDA is a voluntary group (charity number 1182183) providing riding therapy for local disabled children and adults using selected horses and ponies based at Buxton Riding School, Fern Farm, Buxton. For more details, visit its website at [helenatkinrda.org.uk](https://www.helenatkinrda.org.uk) or its Facebook page at [facebook.com/BuxtonRDA](https://www.facebook.com/BuxtonRDA/).
`;

  fs.writeFileSync(filePath, template, 'utf8');

  console.log(`\n✅ Created: content/news/${filename}`);
  console.log(`\nNext steps:`);
  console.log(`  1. Open the file in VS Code and write your article`);
  console.log(`  2. Add any images to public/images/ and reference them`);
  console.log(`  3. Run "npm run dev" to preview locally`);
  console.log(`  4. git add . / commit / push when ready\n`);

  rl.close();
}

main();