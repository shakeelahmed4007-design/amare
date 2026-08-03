import fs from 'fs';
import https from 'https';

const url = 'https://www.elfcosmetics.com/';
https.get(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Look for product names and their corresponding image URLs
    const products = [
      "Invisi-Stick",
      "Power Grip Primer",
      "Gloss Mode",
      "Set It Bright",
      "Humidity Hero",
      "Thirst Burst",
      "Blurreal Lip"
    ];
    
    // Simple regex to find all dw/image URLs
    const matches = data.match(/https:\/\/[^"'\s]*dw\/image\/v2\/[^"'\s]*\.(?:jpg|png|webp|gif)[^"'\s]*/gi);
    if (matches) {
      const unique = [...new Set(matches)];
      console.log("Found " + unique.length + " unique images.");
      unique.slice(0, 30).forEach(u => console.log(u));
    } else {
      console.log("No dw/image matches found.");
    }
    
    // Also try to find any image URLs
    const allImages = data.match(/https:\/\/[^"'\s]*\.(?:jpg|png|webp|gif)[^"'\s]*/gi);
    if (allImages) {
        const u = [...new Set(allImages)].filter(img => img.includes('elf'));
        console.log("\nFound " + u.length + " elf images.");
        u.slice(0, 20).forEach(url => console.log(url));
    }
  });
}).on('error', err => console.error(err));
