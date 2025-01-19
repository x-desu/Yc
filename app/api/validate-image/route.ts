import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:NextRequest) {
  const url = req.nextUrl.searchParams.get('url'); // Get URL from query parameters
    
  if (!url) {
    return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
  }

  try {
    // Set CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*', // Allow all origins
      'Access-Control-Allow-Methods': 'GET', // Allow only GET methods
      'Access-Control-Allow-Headers': 'Content-Type', // Allow headers
    };

    // Perform the HEAD request to check the image
    const response = await fetch(url, { method: 'HEAD' });
    if (!response.ok) {
        return NextResponse.json({ isValid: false, message: 'URL is not accessible.' });
      }
      console.log(response)
      const contentType = response.headers.get('Content-Type');
  
      if (contentType?.startsWith('image/')) {
        return NextResponse.json({ isValid: true });
      } else {
        return NextResponse.json({ isValid: false, message: 'URL is not an image.' });
      }
  } catch (error:any) {
    return NextResponse.json({ isValid: false, message: error.message||'Failed to fetch URL' }, { status: 500 });
  }
}
