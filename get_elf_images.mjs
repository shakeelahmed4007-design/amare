import fs from 'fs';

async function fetchImages() {
  try {
    const html = await fetch('https://www.elfcosmetics.com/').then(res => res.text());
    const matches = html.match(/https:\/\/www\.elfcosmetics\.com\/dw\/image\/v2\/[^"'\s]+/g);
    if (matches) {
      const unique = [...new Set(matches)];
      console.log(unique.slice(0, 20).join('\n'));
    } else {
      console.log("No images found.");
    }
  } catch (err) {
    console.error(err);
  }
}

fetchImages();
