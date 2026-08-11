// lib/documents.js
import fs from 'fs';
import path from 'path';

const documentsDataPath = path.join(process.cwd(), 'content', 'documents.json');
const documentsPublicPath = path.join(process.cwd(), 'public', 'documents');

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function getAllDocuments() {
  const raw = fs.readFileSync(documentsDataPath, 'utf8');
  const documents = JSON.parse(raw);

  return documents.map((doc) => {
    const filePath = path.join(documentsPublicPath, doc.filename);
    let fileSize = null;

    try {
      const stats = fs.statSync(filePath);
      fileSize = formatFileSize(stats.size);
    } catch {
      // File not found on disk - fileSize stays null, we'll flag this in the UI
      fileSize = null;
    }

    return {
      ...doc,
      href: `/documents/${doc.filename}`,
      fileSize,
      fileMissing: fileSize === null,
    };
  });
}

export function getDocumentsByCategory() {
  const documents = getAllDocuments();
  const grouped = {};

  documents.forEach((doc) => {
    const category = doc.category || 'Other';
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(doc);
  });

  return grouped;
}
