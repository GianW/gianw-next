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

export async function getProjectsForMain() {
  const entries = await fetchGraphQL(
    `query {
      projectsCollection(limit: 5) {
        items {
          slug
          nome,
          tags,
          descricao
        }
      }
    }`
  )
  return extractProjectsEntries(entries)
}

export async function getAllProjectWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      projectsCollection(where: { slug_exists: true }) {
        items {
          slug,
          nome,
          tags,
          capa{
            url
          },
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
          year,
          tags,
          seo,
          capa{
            url
          },
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
          year
          capa{
            url
          },
          conteudo{
            json
            links{
              assets{
                block{
                  url
                  title
                  url
                  fileName
                  width
                  sys{
                    id
                    spaceId
                    environmentId
                    publishedAt
                  }
                }
                hyperlink{
                  title
                  fileName
                  url
                }
              }
            }
          }
        }
      }
    }`
  )

  return extractProject(entry)
}
