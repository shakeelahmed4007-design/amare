const apiKey = '583199334358619';
const apiSecret = 'GD35pV1gshXOb8xfEV3rJVSW4oY';
const cloudName = 'nlvongm9';

const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

async function createPreset() {
  console.log('Creating unsigned upload preset...');
  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload_presets`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'cosmatic_unsigned',
        unsigned: true
      })
    });
    const data = await res.json();
    console.log('Response:', data);
  } catch (err) {
    console.error(err);
  }
}

createPreset();
