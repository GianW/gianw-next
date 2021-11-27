import remark from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'
import matter from 'gray-matter'

export default async function markdownToHtml(markdown) {
  const result = await remark().use(html).use(prism).process(matter(markdown))
  // const result = await remark().use(html).process(markdown)
  return result.toString()
}
