import PropTypes from 'prop-types'
import { AppHeader } from 'components/AppHeader'
import { ProjectList } from 'components/ProjectList'
import { Fade } from 'components/Animation/Fade'
import { getAllProjectsForHome } from 'lib/contentFullApi'

export default function Projects({ projectsList }) {
  return (
    <>
      <AppHeader title='Projects' />
      <Fade delay={0}>
        <ProjectList projects={projectsList} />
      </Fade>
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
