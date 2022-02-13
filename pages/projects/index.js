import PropTypes from 'prop-types'
import { AppHeader } from 'components/AppHeader'
import { ProjectList } from 'components/ProjectList'

import { getAllProjectsForHome } from 'lib/contentFullApi'

export default function Projects({ projectsList }) {
  return (
    <>
      <AppHeader title='Projects' />
      <ProjectList projects={projectsList} />
    </>
  )
}

Projects.propTypes = {
  projectsList: PropTypes.array,
}

export async function getStaticProps() {
  const projectsList = (await getAllProjectsForHome()) || []
  return {
    props: { projectsList },
  }
}
