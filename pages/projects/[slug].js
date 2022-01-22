import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Container, Typography } from '@mui/material'
import { getAllProjectWithSlug, getProjectData } from 'lib/contentFullApi'
import Head from 'next/head'
import { AppHeader } from 'components/AppHeader'
import { Seo } from 'components/Seo'

import { RichTextResponse } from 'components/contentfull/ContentfullParser'

export default function Project({ project }) {
  const router = useRouter()

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
            <Head>
              <title>{project.nome}</title>
              <Seo keywords={[project.seo]} />
            </Head>
            <Typography variant='h3' style={{ marginTop: '2%' }}>
              {project?.nome}
            </Typography>
            <hr />
            <RichTextResponse richTextResponse={project} />
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
