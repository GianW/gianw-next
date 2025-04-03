// pages/api/shorten.js
import { nanoid } from 'nanoid';
import { saveUrl } from '../../lib/blobStore';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (err) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Generate a short ID (7 characters)
    const shortId = nanoid(7);

    // Create URL data object
    const urlData = {
      originalUrl: url,
      createdAt: new Date().toISOString(),
      clicks: 0
    };

    // Store in Blob Store
    await saveUrl(shortId, urlData);

    // Construct the short URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `http://${req.headers.host}`;
    const shortUrl = `${baseUrl}/s/${shortId}`;

    return res.status(200).json({
      shortUrl,
      shortId
    });
  } catch (error) {
    console.error('Error shortening URL:', error);
    return res.status(500).json({ error: 'Failed to shorten URL' });
  }
}