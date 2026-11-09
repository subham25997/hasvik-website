// Generates the favicon set from a brand SVG mark:
//   src/app/icon.svg, src/app/favicon.ico (PNG-in-ICO), src/app/apple-icon.png, public/icons/icon-{192,512}.png
// Run: node scripts/generate-icons.mjs
import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

// Navy rounded square, white "H" with a leaf-green swoosh (echoes the wordmark).
const svg = (pad = 0) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#003770"/><stop offset=".55" stop-color="#004C9A"/><stop offset="1" stop-color="#015BB5"/>
    </linearGradient>
    <linearGradient id="leaf" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="#5BB140"/><stop offset="1" stop-color="#9BE47F"/>
    </linearGradient>
  </defs>
  <rect x="${pad}" y="${pad}" width="${512 - pad * 2}" height="${512 - pad * 2}" rx="${pad ? 0 : 112}" fill="url(#bg)"/>
  <path d="M150 128h52v100h108V128h52v256h-52V276H202v108h-52z" fill="#fff"/>
  <path d="M120 404c96-6 196-56 284-176 8 74-40 168-150 196-50 12-96 6-134-20z" fill="url(#leaf)"/>
</svg>`;

await mkdir("public/icons", { recursive: true });
await writeFile("src/app/icon.svg", svg());

const png = (size, s = svg()) => sharp(Buffer.from(s)).resize(size, size).png().toBuffer();

// ICO container holding a single 32x32 PNG (supported by all modern browsers).
const p32 = await png(32);
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // count
header.writeUInt8(32, 6); // width
header.writeUInt8(32, 7); // height
header.writeUInt8(0, 8); // palette
header.writeUInt8(0, 9); // reserved
header.writeUInt16LE(1, 10); // planes
header.writeUInt16LE(32, 12); // bpp
header.writeUInt32LE(p32.length, 14); // size
header.writeUInt32LE(22, 18); // offset
await writeFile("src/app/favicon.ico", Buffer.concat([header, p32]));

// Apple touch icon: full-bleed square (iOS applies its own mask).
await writeFile("src/app/apple-icon.png", await png(180, svg(1)));
await writeFile("public/icons/icon-192.png", await png(192));
await writeFile("public/icons/icon-512.png", await png(512));
await writeFile("public/icons/maskable-512.png", await png(512, svg(1)));
console.log("Icons written");
