async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    throw new Error(`Failed to fetch API ${json.errors}`)
  }

  return json.data
}

export async function getPreviewPostBySlug(slug) {
  const data = await fetchAPI(
    `
  query PostBySlug($where: JSON) {
    posts(where: $where) {
      slug
    }
  }
  `,
    {
      variables: {
        where: {
          slug,
        },
      },
    }
  )
  return data?.posts[0]
}

export async function getAllPostsWithSlug() {
  const data = fetchAPI(`
    {
      blogPosts {
        slug
      }
    }
  `)
  return data?.blogPosts
}

export async function getAllPostsForHome() {
  const data = await fetchAPI(
    `
    query Posts($where: JSON){
      blogPosts(sort: "created_at:desc", where: $where) {
        Titulo
        slug
        created_at
        data
        descricao
        tags
      }
    }
  `
  )

  return data?.blogPosts
}

export async function getPost(slug) {
  const data = await fetchAPI(
    `
    query PostBySlug($where: JSON){
      blogPosts(where: $where){
        Titulo
        slug
        post
        tags
        seo
        descricao
        data
      }
    }
  `,
    {
      variables: {
        where: {
          slug,
        },
      },
    }
  )
  return data
}

export async function getLastPostsForHome() {
  const data = await fetchAPI(
    `
    query Posts($where: JSON){
      blogPosts(sort: "created_at:desc", limit: 4, where: $where) {
        Titulo
        slug
      }
    }
  `
  )

  return data?.blogPosts
}
