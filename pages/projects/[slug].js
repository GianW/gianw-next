import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import {
  Container,
  //  Typography
} from '@mui/material'
// import { PostBody } from 'components/post-body'
import { getAllProjectWithSlug, getProjectData } from 'lib/contentFullApi'
// import Head from 'next/head'
import { AppHeader } from 'components/AppHeader'
// import { Seo } from 'components/Seo'

export default function Project({ project }) {
  const router = useRouter()
  console.log('aqui', project)

  if (!router.isFallback && !project?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      <AppHeader />
      <Container>
        {router.isFallback ? (
          <>
            <p>Loading…</p>
          </>
        ) : (
          <>
            {JSON.stringify(project)}
            {/* <Head>
              <title>{post.title}</title>
              <Seo keywords={[post.seo]} />
            </Head>
            <Typography variant='h3' style={{ marginTop: '2%' }}>
              {post?.title}
            </Typography>
            <Typography variant='body2' style={{ marginBottom: '2%' }}>
              {dateFormatter(post.date)}
            </Typography>
            <hr />
            <PostBody content={post?.contentHtml} />
            <hr className='border-accent-2 mt-28 mb-24' /> */}
          </>
        )}
      </Container>
    </>
  )
}

Project.propTypes = {
  project: PropTypes.object,
}

export async function getStaticProps({ params }) {
  const project = await getProjectData(params.slug)
  return {
    props: {
      project,
    },
  }
}

export async function getStaticPaths() {
  const allProjects = await getAllProjectWithSlug()
  return {
    paths: allProjects?.map(proj => `/projects/${proj.slug}`) || [],
    fallback: true,
  }
}
