import https from 'https';

async function searchImage(query) {
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const match = data.match(/<img[^>]+src="([^">]+)"/);
        if (match && match[1]) {
          let imgUrl = match[1];
          if (imgUrl.startsWith('//')) imgUrl = 'https:' + imgUrl;
          else if (imgUrl.startsWith('/')) imgUrl = 'https://duckduckgo.com' + imgUrl;
          resolve(imgUrl);
        } else {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  const products = [
    "Suntouchable Invisi-Stick SPF 50 Glitz elf cosmetics",
    "Power Grip Primer elf cosmetics",
    "Gloss Mode Treatment Oil elf cosmetics",
    "Set It Bright Powder Quad elf cosmetics",
    "Humidity Hero Anti-Frizz Styling Spray elf cosmetics",
    "Thirst Burst Drops elf cosmetics",
    "So Blurreal Lip & Whip elf cosmetics"
  ];
  
  for (const p of products) {
    const img = await searchImage(p);
    console.log(`Product: ${p}\nImage: ${img}\n`);
  }
}

run();
