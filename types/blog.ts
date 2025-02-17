export interface Image {
    id: number
    alt: string | null
    caption: string | null
    prefix: string
    url: string
    thumbnailURL: string
    filename: string
    mimeType: string
    filesize: number
    width: number
    height: number
    focalX: number
    focalY: number
    sizes: {
      thumbnail: ImageSize
      square: ImageSize
      small: ImageSize
      medium: ImageSize
      large: ImageSize | null
      xlarge: ImageSize | null
      og: ImageSize | null
    }
  }
  
  interface ImageSize {
    url: string | null
    width: number | null
    height: number | null
    mimeType: string | null
    filesize: number | null
    filename: string | null
  }
  
  export interface Category {
    id: number
    title: string
    slug: string
    slugLock: boolean
    parent: number | null
    breadcrumbs: {
      id: string
      doc: number
      url: string
      label: string
    }[]
    updatedAt: string
    createdAt: string
  }
  
  export interface Author {
    id: number
    name: string
    avatar?: Image
    bio?: string
    social?: {
      twitter?: string
      facebook?: string
      linkedin?: string
    }
  }
  
  export interface Post {
    id: number
    title: string
    heroImage: Image
    content: {
      root: {
        type: string
        children: any[] // We'll handle the content structure in a separate component
      }
    }
    categories: Category[]
    relatedPosts: Post[]
    tags: number[]
    meta: {
      title: string
      image: Image
      description: string
    }
    publishedAt: string
    author: number
    populatedAuthors: Author[]
    slug: string
    updatedAt: string
    createdAt: string
    _status: "published" | "draft"
  }
  
  export interface PostsResponse {
    docs: Post[]
    totalDocs: number
    limit: number
    totalPages: number
    page: number
    pagingCounter: number
    hasPrevPage: boolean
    hasNextPage: boolean
    prevPage: number | null
    nextPage: number | null
  }
  