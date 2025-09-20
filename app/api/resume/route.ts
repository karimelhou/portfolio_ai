import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      message:
        'Dynamic PDF generation is not yet connected. Plug in a PDF rendering service (e.g., Puppeteer, React-PDF) and return a binary stream here.'
    },
    { status: 501 }
  );
}
