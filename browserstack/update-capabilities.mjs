import { writeFile } from 'node:fs/promises';

import { fetchCapabilities } from './capabilities.mjs';

const capabilities = await fetchCapabilities();

await writeFile(new URL('./capabilities.json', import.meta.url), `${JSON.stringify(capabilities, null, 2)}\n`);

console.log(`browserstack/capabilities.json updated: ${capabilities.length} entries`);
