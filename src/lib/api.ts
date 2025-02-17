const API_URL = "https://cms.sikkhon.com/api"

export async function getPosts(page = 1, limit = 9, filters = {}) {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...filters,
  })
  const res = await fetch(`${API_URL}/posts?${queryParams}`)
  if (!res.ok) throw new Error("Failed to fetch posts")
  return res.json()
}

export async function getPost(slug: string) {
  // First get all posts to find the one with matching slug
  const res = await fetch(`${API_URL}/posts?limit=100`) // Increase limit to ensure we find the post
  if (!res.ok) throw new Error("Failed to fetch posts")

  const data = await res.json()
  const post = data.docs.find((post: any) => post.slug === slug)

  if (!post) {
    throw new Error("Post not found")
  }

  // Now fetch the full post data with the ID
  const postRes = await fetch(`${API_URL}/posts/${post.id}`)
  if (!postRes.ok) throw new Error("Failed to fetch post details")

  return postRes.json()
}

export async function getCategories() {
  const res = await fetch(`${API_URL}/categories`)
  if (!res.ok) throw new Error("Failed to fetch categories")
  return res.json()
}

export async function getCategory(slug: string) {
  const res = await fetch(`${API_URL}/categories?where[slug][equals]=${slug}`)
  if (!res.ok) throw new Error("Failed to fetch category")
  const data = await res.json()
  return data.docs[0] || null
}

export async function getAuthor(id: number) {
  const res = await fetch(`${API_URL}/users/${id}`)
  if (!res.ok) throw new Error("Failed to fetch author")
  return res.json()
}

