import http from 'http';
import fs from 'fs';
import readline from 'readline';

export async function readJsonFileLines(path: string, limit: boolean = true, maxLines: number = 100) {
  const lines = await readFileLines(path, limit, maxLines);

  return lines.map(line => JSON.parse(line));
}

export async function readFileLines(path: string, limit: boolean = true, maxLines: number = 100): Promise<string[]> {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let count = 0;
  const lines: string[] = [];
  for await (const line of rl) {
    if (limit && count >= maxLines) { break; }
    count++;
    lines.push(line);
  }

  fileStream.close();

  return lines;
}

export async function downloadFile(path: string, output: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(output);
  
    http.get(path, (response) => {
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close(() => resolve());
      });
    }).on('error', (err) => {
      unlinkFile(output, () => reject(err));
    })
  })
}

export function unlinkFile(path: string, cb: () => void) {
  fs.unlink(path, cb);
}