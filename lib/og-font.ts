import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Space Grotesk Bold (OFL), pentru imaginile generate (share, iconițe).
 * „use cache” face citirea fișierului parte din build, deci imaginile se generează o singură dată, static.
 */
export async function loadDisplayFont(): Promise<ArrayBuffer> {
  "use cache";
  const file = await readFile(join(process.cwd(), "assets/fonts/SpaceGrotesk-Bold.ttf"));
  return file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength) as ArrayBuffer;
}
