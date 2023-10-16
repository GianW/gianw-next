import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Grid, Typography } from '@mui/material'
import { getAllProjectWithSlug, getProjectData } from 'lib/contentFullApi'
import Head from 'next/head'
import { AppHeader } from 'components/AppHeader/AppHeader'
import { Seo } from 'components/Seo'

import { RichTextResponse } from 'components/contentfull/ContentfullParser'

export default function Project({ project }) {
  const router = useRouter()

  const defaultCover = '/static/default_cover.jpg'

  if (!router.isFallback && !project?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      <AppHeader />
      <Grid
        container
        spacing={2}
        alignItems='flex-start'
        direction='row'
        justifyContent='center'>
        <Grid item xs={9} alignItems='center'>
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
              <img
                src={project.capa ? project.capa?.url : defaultCover}
                width='40%'
              />
              <hr />
              <RichTextResponse richTextResponse={project} />
            </>
          )}
        </Grid>
      </Grid>
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
