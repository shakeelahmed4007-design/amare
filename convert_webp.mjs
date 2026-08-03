import { Jimp } from 'jimp';
import path from 'path';
import fs from 'fs';

const assetsDir = './src/assets';

async function compressJpg(filename, maxSize) {
  const filePath = path.join(assetsDir, filename);
  if (!fs.existsSync(filePath)) return;
  
  try {
    const image = await Jimp.read(filePath);
    const width = image.width;
    const height = image.height;
    
    if (width > maxSize || height > maxSize) {
      if (width > height) {
        image.resize({ w: maxSize });
      } else {
        image.resize({ h: maxSize });
      }
    }
    
    // Set JPEG quality to 60 for web optimization
    image.quality(60);
    
    await image.write(filePath);
    const newStats = fs.statSync(filePath);
    console.log(`Optimized JPG ${filename}: ${(newStats.size/1024).toFixed(0)}KB`);
  } catch (err) {
    console.error(`Error with ${filename}:`, err);
  }
}

async function run() {
  console.log("Re-optimizing JPEGs with compression quality...\n");
  const jpgs = ['10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg'];
  for (const jpg of jpgs) {
    await compressJpg(jpg, 500);
  }
  console.log("\nCompression complete!");
}

run();
