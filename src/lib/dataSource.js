import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {remark} from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'

const postsDirectory = path.join(process.cwd(), 'content/posts')
const brainDirectory = path.join(process.cwd(), 'content/brain')

export async function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')


  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .use(prism)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    slug,
    contentHtml,
    ...matterResult.data,
  }
}

export async function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    const slug = slugName(fileName)

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the slug
    return {
      slug,
      ...matterResult.data,
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getAllBrainSlugs() {
  const fileNames = fs.readdirSync(brainDirectory)
  return fileNames.map(fileName => {
    return {
      slug: fileName.replace(/\.md$/, ''),
    }
  })
}

export async function getAllCompletesData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(brainDirectory)
  return fileNames.map(fileName => {
    const slug = slugName(fileName)

    const matterResult = resolveMatterResult(fileName)

    // Combine the data with the slug
    return {
      slug,
      ...matterResult.data,
    }
  })
}

export async function getBrainData(slug) {
  const matterResult = resolveMatterResult(`${slug}.md`)
  
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .use(prism)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    slug,
    contentHtml,
    ...matterResult.data,
  }
}

const resolveMatterResult = fileName => {
  // Read markdown file as string
  const fullPath = path.join(brainDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  return matter(fileContents)
}

// Remove ".md" from file name to get slug
const slugName = fileName => fileName.replace(/\.md$/, '')
