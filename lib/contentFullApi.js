const POST_GRAPHQL_FIELDS = `
slug
titulos
data
descricao
tags
author {
  name
  picture {
    url
  }
}
excerpt
content {
  json
}
`

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then(response => response.json())
}

function extractPost(fetchResponse) {
  return fetchResponse?.data?.blogPostCollection?.items?.[0]
}

function extractPostEntries(fetchResponse) {
  return fetchResponse?.data?.blogPostCollection?.items
}

export async function getPreviewPostBySlug(slug) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  )
  return extractPost(entry)
}

export async function getAllPostsWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      blogPostCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          slug,
          titulo
        }
      }
    }`
  )
  return extractPostEntries(entries)
}

export async function getAllPostsForHomeContentFull(preview) {
  const entries = await fetchGraphQL(
    `query {
      blogPostCollection(order: data_DESC, preview: ${
        preview ? 'true' : 'false'
      }) {
        items {
         slug,
         titulo
       }
     }
    }`,
    preview
  )
  return extractPostEntries(entries)
}

export async function getPost(slug, preview) {
  const entry = await fetchGraphQL(
    `query {
      blogPostCollection(where: { slug: "${slug}" }, preview: ${
      preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          slug
          titulo
          data
          descricao
          tags
          seo
          post
        }
      }
    }`,
    preview
  )
  return {
    post: extractPost(entry),
  }
}
