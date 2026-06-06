import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Typography, Grid, ToggleButtonGroup, ToggleButton } from '@mui/material'
import { PostBody } from 'components/post-body'
import { getAllPostSlugs, getPostData } from 'lib/dataSource'
import Head from 'next/head'
import { AppHeader } from 'components/AppHeader/AppHeader'
import { Seo } from 'components/Seo'
import { dateFormatter } from 'utils/dateFormatter'

export default function Post({ post }) {
  const router = useRouter()
  const [locale, setLocale] = useState('en')

  useEffect(() => {
    if (!post?.hasTranslation) return
    const saved = localStorage.getItem('preferred-locale')
    if (saved === 'pt') setLocale('pt')
  }, [post?.hasTranslation])

  const handleLocale = (_, value) => {
    if (!value) return
    setLocale(value)
    localStorage.setItem('preferred-locale', value)
  }

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const title = locale === 'pt' && post?.titlePt ? post.titlePt : post?.title
  const content = locale === 'pt' && post?.contentHtmlPt ? post.contentHtmlPt : post?.contentHtml

  return (
    <>
      <AppHeader />
      <Grid
        container
        spacing={2}
        alignItems='flex-start'
        direction='row'
        justifyContent='center'>
        <Grid item xs={9} alignItems='center' justifyContent='flex-start'>
          {router.isFallback ? (
            <p>Loading…</p>
          ) : (
            <>
              <Head>
                <title>{post.title}</title>
                <Seo keywords={[post.seo]} />
              </Head>
              <Typography variant='h4' style={{ marginTop: '24px', marginBottom: '4px' }}>
                {title}
              </Typography>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <Typography variant='body2' color='text.secondary'>
                  {dateFormatter(post.date)}
                </Typography>
                {post.hasTranslation && (
                  <ToggleButtonGroup
                    value={locale}
                    exclusive
                    onChange={handleLocale}
                    size='small'>
                    <ToggleButton value='en' sx={{ px: 1.5, py: 0.25, fontSize: '0.75rem' }}>
                      EN
                    </ToggleButton>
                    <ToggleButton value='pt' sx={{ px: 1.5, py: 0.25, fontSize: '0.75rem' }}>
                      PT
                    </ToggleButton>
                  </ToggleButtonGroup>
                )}
              </div>
              <PostBody content={content} />
            </>
          )}
        </Grid>
      </Grid>
    </>
  )
}

Post.propTypes = {
  post: PropTypes.object,
}

export async function getStaticProps({ params }) {
  const post = await getPostData(params.slug)
  return {
    props: { post },
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostSlugs()
  return {
    paths: allPosts?.map(post => `/posts/${post.params.slug}`) || [],
    fallback: true,
  }
}
