import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import path from 'path';

const SUPPORTED = new Set(['.jpg', '.jpeg', '.png']);
export const runtime = 'nodejs';

export async function GET() {
  try {
    const dir = path.join(process.cwd(), 'public', 'hair');
    const files = await readdir(dir);
    const images = files
      .filter((file) => SUPPORTED.has(path.extname(file).toLowerCase()))
      .map((file) => `/hair/${file}`);

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Failed to read hair images', error);
    return NextResponse.json({ images: [] }, { status: 200 });
  }
}
