async function fetchGraphQL(query, preview = false) {
  const token = preview
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.CONTENTFUL_ACCESS_TOKEN

  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    }
  ).then(response => response.json())
}

function extractProject(fetchResponse) {
  return fetchResponse?.data?.projectsCollection?.items?.[0]
}

function extractProjectsEntries(fetchResponse) {
  return fetchResponse?.data?.projectsCollection?.items
}

// export async function getPreviewPostBySlug(slug) {
//   const entry = await fetchGraphQL(
//     `query {
//       postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
//         items {
//           ${POST_GRAPHQL_FIELDS}
//         }
//       }
//     }`,
//     true
//   )
//   return extractPost(entry)
// }

export async function getAllProjectWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      projectsCollection(where: { slug_exists: true }) {
        items {
          slug,
          nome
        }
      }
    }`
  )
  return extractProjectsEntries(entries)
}

export async function getAllProjectsForHome() {
  const entries = await fetchGraphQL(
    `query {
      projectsCollection{
        items{
          nome,
          slug,
          descricao,
          capa{
            url
          },
          tags,
          seo
        }
      }
    }`
  )
  return extractProjectsEntries(entries)
}

export async function getProjectData(slug) {
  const entry = await fetchGraphQL(
    `query {
      projectsCollection(where: { slug: "${slug}" }, limit: 1) {
        items {
          slug
          nome
          descricao
          tags
          seo
          conteudo{
            json
          }
        }
      }
    }`
  )

  return extractProject(entry)
}
