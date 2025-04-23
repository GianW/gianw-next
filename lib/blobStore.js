import { put, list } from '@vercel/blob';

// Create a prefix to easily identify our URL shortener data
const URL_PREFIX = 'url-shortener/';

export async function saveUrl(shortId, urlData) {
  // Convert data to JSON string
  const content = JSON.stringify(urlData);

  const file = `${URL_PREFIX}${shortId}.json`

  const { url } = await put(file, content, {
    contentType: 'application/json',
    metadata: {
        type: 'short-url',
    },
    access: 'public'});

  return url
}

export async function getUrl(shortId) {
  try {
    const filePath = `${URL_PREFIX}${shortId}.json`

    const responseList = await list();

    const fileInList = responseList?.blobs.filter(r => r.pathname == filePath)

    const blobUrl = fileInList[0].url

    // Fetch the blob content
    const response = await fetch(blobUrl);

    if (!response.ok) {
      return null;
    }

    // Parse the JSON content
    const urlData = await response.json();
    return urlData;
  } catch (error) {
    console.error('Error getting URL data:', error);
    return null;
  }
}

export async function updateUrlClicks(shortId, urlData) {
  // Increment clicks
  const updatedData = {
    ...urlData,
    clicks: (urlData.clicks || 0) + 1
  };

  // Save back to blob store
  await saveUrl(shortId, updatedData);

  return updatedData;
}