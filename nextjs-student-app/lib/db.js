import { promises as fs } from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'data');

export async function readData(name) {
  try {
    return JSON.parse(await fs.readFile(path.join(dir, `${name}.json`), 'utf8'));
  } catch {
    return [];
  }
}

export async function writeData(name, data) {
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, `${name}.json`), JSON.stringify(data, null, 2));
}
