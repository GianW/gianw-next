// pages/s/[shortId].js
import { getUrl } from '../../lib/blobStore';

// eslint-disable-next-line react/prop-types
export default function ShortUrlRedirect({ error }) {
  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1 style={{ color: '#e53e3e' }}>Link Not Found</h1>
        <p>The shortened URL you are looking for does not exist or has expired.</p>
        <a
          href="/s"
          style={{
            marginTop: '20px',
            color: '#3182ce',
            textDecoration: 'underline'
          }}
        >
          Create a new short URL
        </a>
      </div>
    );
  }

  return <p>Redirecting...</p>;
}

export async function getServerSideProps(context) {
  const { shortId } = context.params;

  try {
    // Look up the URL mapping using Blob Store
    const urlData = await getUrl(shortId);

    if (!urlData || !urlData.originalUrl) {
      // URL not found
      return { props: { error: true } };
    }

    // Update click count (fire and forget - don't wait for completion)
    // updateUrlClicks(shortId, urlData).catch(err =>
    //   console.error('Failed to update click count:', err)
    // );

    // Redirect to the original URL
    return {
      redirect: {
        destination: urlData.originalUrl,
        permanent: false,
      },
    };
  } catch (error) {
    console.error('Error redirecting:', error);
    return { props: { error: true } };
  }
}