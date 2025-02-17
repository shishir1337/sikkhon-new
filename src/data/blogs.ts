export interface Blog {
    id: string
    thumbnail: string
    category: string
    title: string
    authorAvatar: string
    authorName: string
    postDate: string
  } 
  
  export const blogs: Blog[] = [
    {
      id: "effective-learning-strategies",
      thumbnail: "/blogthumnail.webp",
      category: "Learning Tips",
      title: "10 Effective Learning Strategies for Online Students",
      authorAvatar: "https://secure.gravatar.com/avatar/10629d75a51c496ae02ea949cacbab95",
      authorName: "Pujan Kumar Saha",
      postDate: "May 15, 2023",
    },
    {
      id: "future-of-elearning",
      thumbnail: "/blogthumnail.webp",
      category: "EdTech",
      title: "The Future of E-Learning: Trends to Watch",
      authorAvatar: "https://secure.gravatar.com/avatar/10629d75a51c496ae02ea949cacbab95",
      authorName: "Pujan Kumar Saha",
      postDate: "June 2, 2023",
    },
    {
      id: "balancing-work-and-study",
      thumbnail: "/blogthumnail.webp",
      category: "Student Life",
      title: "How to Balance Work and Online Study",
      authorAvatar: "https://secure.gravatar.com/avatar/10629d75a51c496ae02ea949cacbab95",
      authorName: "Pujan Kumar Saha",
      postDate: "June 20, 2023",
    },
    {
      id: "importance-of-soft-skills",
      thumbnail: "/blogthumnail.webp",
      category: "Career Development",
      title: "The Importance of Soft Skills in Today's Job Market",
      authorAvatar: "https://secure.gravatar.com/avatar/10629d75a51c496ae02ea949cacbab95",
      authorName: "Pujan Kumar Saha",
      postDate: "July 5, 2023",
    },
    {
      id: "overcoming-procrastination",
      thumbnail: "/blogthumnail.webp",
      category: "Productivity",
      title: "5 Techniques to Overcome Procrastination in Online Learning",
      authorAvatar: "https://secure.gravatar.com/avatar/10629d75a51c496ae02ea949cacbab95",
      authorName: "Pujan Kumar Saha",
      postDate: "July 18, 2023",
    },
    {
      id: "ai-in-education",
      thumbnail: "/blogthumnail.webp",
      category: "Technology",
      title: "The Role of AI in Shaping the Future of Education",
      authorAvatar: "https://secure.gravatar.com/avatar/10629d75a51c496ae02ea949cacbab95",
      authorName: "Pujan Kumar Saha",
      postDate: "August 3, 2023",
    },
  ]
  