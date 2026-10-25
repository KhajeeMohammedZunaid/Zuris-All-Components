const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public');
const backupDir = path.join(publicDir, '.acc-backup');

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

async function optimizeAll() {
  console.log('Starting optimization of acc-1 to acc-5...');

  for (let i = 1; i <= 5; i++) {
    const filename = `acc-${i}.png`;
    const inputPath = path.join(publicDir, filename);
    const backupPath = path.join(backupDir, filename);

    if (!fs.existsSync(inputPath)) {
      console.warn(`File not found: ${inputPath}`);
      continue;
    }

    // Backup original if not already backed up
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(inputPath, backupPath);
      console.log(`Backed up original ${filename} to .acc-backup/`);
    }

    const sourcePath = backupPath; // Read from backup so we always have full fidelity source

    // 1. Generate high-fidelity WebP (1920x1080, quality 92)
    const webpPath = path.join(publicDir, `acc-${i}.webp`);
    await sharp(sourcePath)
      .resize(1920, 1080, { fit: 'cover', position: 'center' })
      .webp({ quality: 92, effort: 6 })
      .toFile(webpPath);

    const webpStats = fs.statSync(webpPath);
    console.log(`Created ${path.basename(webpPath)}: ${(webpStats.size / 1024).toFixed(1)} KB`);

    // 2. Replace PNG with optimized 1920x1080 PNG (sharp, clean, lightweight)
    const tempPngPath = path.join(publicDir, `acc-${i}.tmp.png`);
    await sharp(sourcePath)
      .resize(1920, 1080, { fit: 'cover', position: 'center' })
      .png({ compressionLevel: 9, quality: 90 })
      .toFile(tempPngPath);

    fs.renameSync(tempPngPath, inputPath);
    const pngStats = fs.statSync(inputPath);
    console.log(`Optimized ${filename}: ${(pngStats.size / 1024).toFixed(1)} KB (down from 7.5 MB)`);
  }

  console.log('All images optimized successfully!');
}

optimizeAll().catch(err => {
  console.error('Optimization error:', err);
  process.exit(1);
});
